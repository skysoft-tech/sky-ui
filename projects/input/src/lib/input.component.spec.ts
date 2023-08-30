import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SkyFieldErrorDescriptionModule } from '../errors/field-error-description.module';
import { SkyIconsModule } from '../icon/icons.module';
import { SkyInputComponent } from './input.component';

describe('SkyInputComponent', () => {
    let component: SkyInputComponent;
    let fixture: ComponentFixture<SkyInputComponent>;
    let mockNgControl: NgControl;

    beforeEach(async () => {
        mockNgControl = jasmine.createSpyObj('ngControl', [], ['disabled', 'control']);

        await TestBed.configureTestingModule({
            declarations: [SkyInputComponent],
            providers: [{ provide: NgControl, useValue: mockNgControl }],
            imports: [FormsModule, ReactiveFormsModule, SkyIconsModule, SkyFieldErrorDescriptionModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('clear button should be exist when input is not empty', () => {
        component.value = 'test';
        fixture.detectChanges();
        let cross = fixture.debugElement.nativeElement.querySelector('sky-icon');
        expect(cross).toBeDefined();
    });

    it('clear button should be disappeared when input is  empty', () => {
        component.value = '';
        fixture.detectChanges();
        let cross = fixture.debugElement.nativeElement.querySelector('sky-icon');
        expect(cross).toEqual(null);
    });

    it('input should be clear after click on cross', fakeAsync(() => {
        component.value = 'test';
        fixture.detectChanges();

        let cross = fixture.debugElement.query(By.css('sky-icon'));

        cross.triggerEventHandler('click.stop', {});
        fixture.detectChanges();

        tick();

        expect(component.value).toEqual('');
    }));

    it('should show errors if showErrors variable is true', () => {
        component.showErrors = true;
        fixture.detectChanges();
        let errors = fixture.debugElement.nativeElement.querySelector('sky-error-description');

        expect(errors.textContent).toBeDefined();
    });

    it('shouldn`t show errors if showErrors variable is false', () => {
        component.showErrors = false;
        fixture.detectChanges();
        let errors = fixture.debugElement.nativeElement.querySelector('sky-error-description');

        expect(errors.textContent).toEqual('');
    });
});
