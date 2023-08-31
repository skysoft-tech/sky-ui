import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SelectionItem } from './selection-item';
import { SelectionService } from './selection.service';

type LastClickedItem = { item: SelectionItem; index: number };
@Injectable()
export class DefaultSelectionService implements SelectionService {
    private stopWatch: Subject<void> = new Subject<void>();
    private watchedItems: SelectionItem[] | null = null;
    private selectedItems: SelectionItem[] = [];
    private lastClickedItem: LastClickedItem | null = null;

    selectionChanged: Subject<SelectionItem[]> = new Subject<SelectionItem[]>();

    watch(selectionItems: SelectionItem[]): void {
        this.stopWatching();
        selectionItems.forEach((item, i) => {
            item.click.pipe(takeUntil(this.stopWatch)).subscribe(event => {
                if (event.shiftKey) {
                    this.handleShiftClick(item, i);
                } else if (event.ctrlKey) {
                    this.handleCtrlClick(item, i);
                } else {
                    this.handleClick(item, i);
                }

                this.selectionChanged.next(this.selectedItems);
            });
        });

        this.watchedItems = selectionItems;
    }

    public stopWatching(): void {
        this.stopWatch.next();
        this.watchedItems = null;
    }

    private handleShiftClick(clickedItem: SelectionItem, index: number): void {
        this.deselectAllItems();
        if (this.lastClickedItem === null) {
            clickedItem.select();
            this.lastClickedItem = { index, item: clickedItem };
            return;
        }

        const start = Math.min(index, this.lastClickedItem.index);
        const end = Math.max(index, this.lastClickedItem.index);

        for (let i = start; i <= end; i++) {
            const selectedItem = this.watchedItems![i];
            selectedItem.select();
            this.selectedItems.push(selectedItem);
        }
    }

    private handleCtrlClick(clickedItem: SelectionItem, index: number): void {
        if (this.isDeselectClick(clickedItem)) {
            this.handleDeselectClick(clickedItem);
        } else {
            clickedItem.select();
            this.selectedItems.push(clickedItem);
            this.lastClickedItem = { index, item: clickedItem };
        }
    }

    private handleClick(clickedItem: SelectionItem, index: number): void {
        if (this.isDeselectClick(clickedItem)) {
            this.handleDeselectClick(clickedItem);
        } else {
            this.deselectAllItems();
            clickedItem.select();
            this.selectedItems = [clickedItem];
            this.lastClickedItem = { index, item: clickedItem };
        }
    }

    private isDeselectClick(clickedItem: SelectionItem): boolean {
        return this.selectedItems.includes(clickedItem);
    }

    private handleDeselectClick(clickedItem: SelectionItem): void {
        let lastClicked: LastClickedItem | null = null;

        clickedItem.deselect();
        this.selectedItems = this.selectedItems.filter(i => i !== clickedItem);
        const newLastClicked = this.selectedItems[0] ?? null;

        if (newLastClicked) {
            const newIndex = this.watchedItems!.indexOf(newLastClicked) ?? 0;
            lastClicked = { index: newIndex, item: clickedItem };
        }

        this.lastClickedItem = lastClicked;
    }

    private deselectAllItems(): void {
        this.selectedItems.forEach(i => i.deselect());
        this.selectedItems = [];
    }
}
