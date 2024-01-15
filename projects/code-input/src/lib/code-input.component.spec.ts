import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';
import { AutofillExtentionService } from '@sky-ui/core';

import { SkyCodeInputComponent } from './code-input.component';

describe('SkyCodeInputComponent', () => {
    let component: SkyCodeInputComponent;
    let fixture: ComponentFixture<SkyCodeInputComponent>;
    const a = jasmine.createSpyObj<AutofillExtentionService>('AutofillExtentionService', ['observeExtentionValue']);
    const v = new Subject<string>();

    beforeEach(async () => {
        a.observeExtentionValue.and.returnValue(v.asObservable());
        await TestBed.configureTestingModule({
            declarations: [SkyCodeInputComponent],
            imports: [SkyFieldErrorDescriptionModule],
        })
            .overrideProvider(AutofillExtentionService, { useValue: a })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyCodeInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('next cell should get focus after input on previous cell', () => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(secondCell.nativeElement, 'focus');

        firstCell.triggerEventHandler(
            'input',
            new InputEvent('input', { bubbles: true, cancelable: false, data: '1', inputType: 'insertText' })
        );

        fixture.detectChanges();

        expect(focusSpy).toHaveBeenCalled();
    });

    it('next cell shouldn`t get focus after invalid input in previous cell', () => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(secondCell.nativeElement, 'focus');

        firstCell.triggerEventHandler(
            'input',
            new InputEvent('input', { bubbles: true, cancelable: false, data: 'a', inputType: 'insertText' })
        );

        fixture.detectChanges();

        expect(focusSpy).not.toHaveBeenCalled();
    });

    it('push on right arrow should set focus on next cell', () => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(secondCell.nativeElement, 'focus');

        firstCell.triggerEventHandler('keyup.arrowRight', {
            key: 'ArrowRight',
            bubbles: true,
            cancelable: false,
        });

        fixture.detectChanges();

        expect(focusSpy).toHaveBeenCalled();
    });

    it('push on left arrow should set focus on previous cell', () => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(firstCell.nativeElement, 'focus');

        secondCell.triggerEventHandler('keyup.arrowLeft', {
            key: 'ArrowLeft',
            bubbles: true,
            cancelable: false,
        });

        fixture.detectChanges();

        expect(focusSpy).toHaveBeenCalled();
    });

    it('press on backspace should deconste the value in the current cell and set focus on previous cell', fakeAsync(() => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(firstCell.nativeElement, 'focus');

        secondCell.nativeElement.value = '7';
        secondCell.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        tick();
        const event = new KeyboardEvent('keyup', { key: 'Backspace', bubbles: true, cancelable: false });
        secondCell.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
        expect(secondCell.nativeElement.value).toEqual('');
    }));

    it('press on deconste should set focus on next cell and deconste value in current cell', fakeAsync(() => {
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        const secondCell = inputs[1];
        const focusSpy = spyOn(secondCell.nativeElement, 'focus');
        firstCell.nativeElement.focus();
        firstCell.nativeElement.value = '7';
        firstCell.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        tick();
        const event = new KeyboardEvent('keyup', { key: 'Deconste', bubbles: true, cancelable: false });
        firstCell.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(focusSpy).toHaveBeenCalled();
        expect(firstCell.nativeElement.value).toEqual('');
    }));

    it('paste should add all numbers to cell', fakeAsync(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text', '124578');
        const pasteEvent = new ClipboardEvent('paste', { clipboardData });

        fixture.detectChanges();
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        firstCell.nativeElement.focus();
        firstCell.nativeElement.dispatchEvent(pasteEvent);
        fixture.detectChanges();

        tick();
        expect(component.value).toEqual('124578');
    }));

    it('after pasting each input contains exactly one character', fakeAsync(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text', '124578');
        const pasteEvent = new ClipboardEvent('paste', { clipboardData });

        fixture.detectChanges();
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        firstCell.nativeElement.focus();
        firstCell.nativeElement.dispatchEvent(pasteEvent);
        fixture.detectChanges();

        tick();
        expect(inputs[0].nativeElement.value).toEqual('1');
        expect(inputs[1].nativeElement.value).toEqual('2');
        expect(inputs[2].nativeElement.value).toEqual('4');
        expect(inputs[3].nativeElement.value).toEqual('5');
        expect(inputs[4].nativeElement.value).toEqual('7');
        expect(inputs[5].nativeElement.value).toEqual('8');
    }));

    it('after pasting less than six characters another cells should be empty', fakeAsync(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text', '12');
        const pasteEvent = new ClipboardEvent('paste', { clipboardData });

        fixture.detectChanges();
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        firstCell.nativeElement.focus();
        firstCell.nativeElement.dispatchEvent(pasteEvent);
        fixture.detectChanges();

        tick();
        expect(inputs[0].nativeElement.value).toEqual('1');
        expect(inputs[1].nativeElement.value).toEqual('2');
        expect(inputs[2].nativeElement.value).toEqual('');
        expect(inputs[3].nativeElement.value).toEqual('');
        expect(inputs[4].nativeElement.value).toEqual('');
        expect(inputs[5].nativeElement.value).toEqual('');
    }));

    it('after pasting more than six characters it takes first six numbers', fakeAsync(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text', '1278904455');
        const pasteEvent = new ClipboardEvent('paste', { clipboardData });

        fixture.detectChanges();
        const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('.sky-fieldset > input'));
        const firstCell = inputs[0];
        firstCell.nativeElement.focus();
        firstCell.nativeElement.dispatchEvent(pasteEvent);
        fixture.detectChanges();

        tick();
        expect(inputs[0].nativeElement.value).toEqual('1');
        expect(inputs[1].nativeElement.value).toEqual('2');
        expect(inputs[2].nativeElement.value).toEqual('7');
        expect(inputs[3].nativeElement.value).toEqual('8');
        expect(inputs[4].nativeElement.value).toEqual('9');
        expect(inputs[5].nativeElement.value).toEqual('0');
    }));

    it('autofill should works', () => {
        v.next('978933');
        expect(component.value).toEqual('978933');
    });
});
