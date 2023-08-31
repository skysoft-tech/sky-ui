import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import {
    FilterValue,
    IPagination,
    ISearch,
    ISkyDataProvider,
    ISort,
    Pagination,
    PaginationConfig,
    Sort,
    SortConfig,
} from '@sky-ui/core';

export class SkyDataSource<TEntitie> extends DataSource<TEntitie> implements IPagination, ISearch, ISort {
    constructor(private provider: ISkyDataProvider<TEntitie>) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<readonly TEntitie[]> {
        return this.provider.getDataStream();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        // Do nothing
    }

    getPaginationConfig(): Observable<PaginationConfig> {
        return this.provider.getPaginationConfig();
    }

    setPagination(pagination: Pagination): Observable<void> {
        return this.provider.setPagination(pagination);
    }

    getSortConfig(): Observable<SortConfig> {
        return this.provider.getSortConfig();
    }

    setSort(sort: Sort): Observable<void> {
        return this.provider.setSort(sort);
    }

    setSearch(search: string): Observable<void> {
        return this.provider.setSearch(search);
    }

    setFilters(filterProperties: Map<keyof TEntitie, FilterValue>): Observable<void> {
        return this.provider.setFilters(filterProperties);
    }
}
