import { Subject } from 'rxjs';
import { SelectionItem } from './selection-item';

export abstract class SelectionService {
    public abstract selectionChanged: Subject<SelectionItem[]>;
    public abstract watch(selectionItems: SelectionItem[]): void;
    public abstract stopWatching(): void;
}
