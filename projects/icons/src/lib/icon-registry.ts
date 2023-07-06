import { Injectable, OnDestroy, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, of, share, tap } from 'rxjs';
import { SkyIcons } from './all-icons';

export interface IResolvedIcon {
    svg?: string | null;
    url?: string | null;
}

export type IconResolver = (name: string) => IResolvedIcon | string | null;

const DefaultResolver: IconResolver = (name: string) => {
    if (SkyIcons.has(name)) {
        return { svg: SkyIcons.get(name) };
    }

    console.log('Icon not found');
    return null;
};

@Injectable({ providedIn: 'root' })
export class SkyIconRegistry implements OnDestroy {
    private svgIconConfigs = new Map<string, IResolvedIcon>();

    /** Cache for icons loaded by direct URLs. */
    private cachedIconsByUrl = new Map<string, string>();

    /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
    private inProgressUrlFetches = new Map<string, Observable<string>>();

    private resolvers: IconResolver[] = [DefaultResolver];

    constructor(@Optional() private httpClient: HttpClient) {}

    /**
     * Registers an icon resolver function with the registry.The function will be invoked with the
     * name of an icon when the registry tries to resolve the URL from which to fetch
     * the icon. The resolver is expected to return a `SvgIconConfig` with `url` that points to the icon or
     * `svg` that contains svg string itself or `null` if the icon is not supported. Resolvers
     * will be invoked in the order in which they have been registered.
     * @param resolver Resolver function to be registered.
     */
    addSvgIconResolver(resolver: IconResolver): this {
        this.resolvers.push(resolver);
        return this;
    }

    /**
     * Returns an Observable that produces the icon serialized to string from the resolved URL.
     * The response from the URL may be cached so this will not always cause an HTTP request.
     *
     * @param name Icon name
     */
    getIcon(name: string): Observable<string> {
        const config = this.getIconConfigFromResolvers(name);
        if (!config) {
            console.warn(`Icon with name '${name}' not found`);
            return of('');
        }

        if (config.svg) {
            return of(config.svg);
        } else if (config.url) {
            return this.getIconFromUrl(config.url);
        } else {
            throw new Error('Icon is not resolved');
        }
    }

    ngOnDestroy() {
        this.resolvers = [];
        this.svgIconConfigs.clear();
        this.cachedIconsByUrl.clear();
    }

    /**
     * Returns an Observable that produces the icon serialized to string from the provided URL.
     * Fetch icon from the server or return already fetched object from the cache
     *
     * @param url icon url
     */
    getIconFromUrl(url: string): Observable<string> {
        if (!url) {
            throw new Error(`SVG url is empty '${url}'`);
        }

        const cachedIcon = this.cachedIconsByUrl.get(url);

        if (cachedIcon) {
            return of(cachedIcon);
        }

        return this.fetchIcon(url).pipe(tap(svg => this.cachedIconsByUrl.set(url!, svg)));
    }

    private getIconConfigFromResolvers(name: string): IResolvedIcon | undefined {
        for (let i = 0; i < this.resolvers.length; i++) {
            const result = this.resolvers[i](name);
            if (result === null) {
                continue;
            }

            if (typeof result === 'string' || result instanceof String) {
                return { url: result as string };
            }

            return result;
        }

        return undefined;
    }

    /**
     * Returns an Observable which produces the string contents of the given icon. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    private fetchIcon(url: string): Observable<string> {
        if (!this.httpClient) {
            throw new Error('HTTP client is not provided');
        }

        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        const inProgressFetch = this.inProgressUrlFetches.get(url);

        if (inProgressFetch) {
            return inProgressFetch;
        }

        const req = this.httpClient.get(url, { responseType: 'text' }).pipe(
            finalize(() => this.inProgressUrlFetches.delete(url)),
            share()
        );

        this.inProgressUrlFetches.set(url, req);
        return req;
    }
}
