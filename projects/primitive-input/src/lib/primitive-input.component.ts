import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    AfterContentInit,
    ContentChild,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { SkyFieldDirective } from './primitive-field.directive';

@Component({
    selector: 'sky-primitive-input',
    templateUrl: './primitive-input.component.html',
    styleUrls: ['./primitive-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sky-primitive-input',
    },
})
export class SkyPrimitiveInputComponent implements AfterContentInit {
    @Input()
    showCleaner: boolean = false;

    @Output()
    cleanerClick: EventEmitter<void> = new EventEmitter<void>();

    valueChange: Subject<string | null> = new Subject<string | null>();

    @ContentChild(SkyFieldDirective)
    input?: SkyFieldDirective;

    set value(value: string | null) {
        if (this.input) {
            this.input.nativeElement.value = value ?? '';
        }
    }
    get value(): string | null {
        return this.input?.nativeElement.value ?? null;
    }

    ngAfterContentInit(): void {
        if (!this.input) {
            return;
        }

        fromEvent<InputEvent>(this.input.nativeElement, 'input').subscribe(e => {
            this.valueChange.next(e.data);
        });
    }

    clear(): void {
        this.cleanerClick.emit();
    }

    focus(): void {
        this.input?.nativeElement.focus();
    }

    blur(): void {
        this.input?.nativeElement.blur();
    }

    setValue(value: string | null, emitEvent: boolean = true): void {
        if (this.input && this.input.nativeElement.value !== value) {
            this.input.nativeElement.value = value ?? '';

            if (emitEvent) {
                this.valueChange.next(value);
            }
        }
    }
}
