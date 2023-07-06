import { Observable } from 'rxjs';

export interface SkyBreadcrumbData {
    label: string;
    url: string;
}

export type SkyBreadcrumbInput = SkyBreadcrumbData[] | Observable<SkyBreadcrumbData[]>;
