import { Observable } from 'rxjs';

export type FilterValue = string | number | boolean | Date;
export type SortDirection = 'asc' | 'desc' | '';

export interface Pagination {
    pageSize: number;
    currentPage: number;
}

export interface PaginationConfig extends Pagination {
    totalCount: number;
}

export interface IPagination {
    getPaginationConfig(): Observable<PaginationConfig>;
    setPagination(pagination: Pagination): Observable<void>;
}

export interface SortConfig {
    active: string;
    direction: SortDirection;
}

export type Sort = SortConfig;

export interface ISort {
    getSortConfig(): Observable<SortConfig>;
    setSort(sort: Sort): Observable<void>;
}

export interface ISearch {
    setSearch(inputValue: string | null): Observable<void>;
}

export declare interface ISkyDataProvider<T> {
    getDataStream(): Observable<readonly T[]>;
    setPagination(pagination: Pagination): Observable<void>;
    setSort(sort: Sort): Observable<void>;
    setFilters(filterProperties: Map<keyof T, FilterValue>): Observable<void>;
    setSearch(search: string): Observable<void>;
    getPaginationConfig(): Observable<PaginationConfig>;
    getSortConfig(): Observable<SortConfig>;
}
