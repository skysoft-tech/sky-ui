import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const ThemeStyleTagId = 'app-theme-reference';

// export interface Sty

@Injectable({
    providedIn: 'root',
})
export class StylesLoaderService {
    private resolver!: (value: Event) => void;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    loadStyle(bundleName: string): Promise<Event> {
        return new Promise(resolve => {
            this.resolver = resolve;
            const styleTag = this.getOrCreateStyleElement();
            styleTag.href = `${bundleName}`;
        });
    }

    private getOrCreateStyleElement(): HTMLLinkElement {
        let style = this.document.getElementById(ThemeStyleTagId) as HTMLLinkElement;
        if (style) {
            return style;
        }

        style = this.document.createElement('link');
        style.id = ThemeStyleTagId;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.addEventListener('load', (event: Event) => this.resolver(event), false);

        const head = this.document.getElementsByTagName('head')[0];
        head.appendChild(style);

        return style;
    }
}
