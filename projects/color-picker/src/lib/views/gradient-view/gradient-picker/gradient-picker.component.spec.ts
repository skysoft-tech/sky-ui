import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyGradientPickerComponent } from './gradient-picker.component';

describe('GradientPickerComponent', () => {
  let component: SkyGradientPickerComponent;
  let fixture: ComponentFixture<SkyGradientPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyGradientPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkyGradientPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
