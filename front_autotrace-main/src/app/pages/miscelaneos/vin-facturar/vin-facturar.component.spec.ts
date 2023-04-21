import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinFacturarComponent } from './vin-facturar.component';

describe('VinFacturarComponent', () => {
  let component: VinFacturarComponent;
  let fixture: ComponentFixture<VinFacturarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinFacturarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinFacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
