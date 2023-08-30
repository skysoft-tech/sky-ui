import { Observable } from 'rxjs';

export interface SelectionItem {
    isSelected: boolean;
    nativeElement: Element;
    click: Observable<PointerEvent>;

    select(): void;
    deselect(): void;
}
