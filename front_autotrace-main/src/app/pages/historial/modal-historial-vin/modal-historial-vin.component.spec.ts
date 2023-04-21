import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialVinComponent } from './modal-historial-vin.component';

describe('ModalHistorialVinComponent', () => {
  let component: ModalHistorialVinComponent;
  let fixture: ComponentFixture<ModalHistorialVinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialVinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistorialVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
