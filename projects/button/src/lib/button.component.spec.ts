import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SkyButtonComponent } from './button.component';
import { SkyLoaderModule } from '@sky-ui/loader';

describe('ButtonComponent', () => {
    let component: SkyButtonComponent;
    let fixture: ComponentFixture<SkyButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyButtonComponent],
            imports: [SkyLoaderModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('when loading false sky-loading component should not be exist', () => {
        component.loading = false;
        expect(fixture.debugElement.query(By.css('sky-loading'))).toBeNull();
    });

    it('when loading true sky-loading component should be exist', () => {
        component.loading = true;
        expect(fixture.debugElement.query(By.css('sky-loading'))).toBeDefined();
    });
});
