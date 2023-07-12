import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SkyCheckboxComponent } from './checkbox.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';

describe('SkyCheckboxComponent', () => {
    let component: SkyCheckboxComponent;
    let fixture: ComponentFixture<SkyCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyCheckboxComponent],
            imports: [FormsModule, ReactiveFormsModule, SkyIconsModule, SkyFieldErrorDescriptionModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set indeterminate to false when change triggered', fakeAsync(() => {
        component.indeterminate = true;
        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css(`#${component.inputId}`));

        input.triggerEventHandler('click', {});
        fixture.detectChanges();
        tick();

        expect(component.indeterminate).toBeFalsy();
    }));
});
