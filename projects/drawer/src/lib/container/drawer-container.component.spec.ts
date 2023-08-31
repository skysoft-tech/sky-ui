import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyDrawerContainerComponent } from './drawer-container.component';

describe('DrawerContainerComponent', () => {
    let component: SkyDrawerContainerComponent;
    let fixture: ComponentFixture<SkyDrawerContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyDrawerContainerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyDrawerContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
