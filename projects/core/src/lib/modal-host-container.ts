export interface ModalHostContainer<T> {
    open(options?: T): void;
    close(): void;
}
