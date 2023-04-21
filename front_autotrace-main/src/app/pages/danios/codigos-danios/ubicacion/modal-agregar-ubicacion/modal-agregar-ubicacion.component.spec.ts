import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarUbicacionComponent } from './modal-agregar-ubicacion.component';

describe('ModalAgregarUbicacionComponent', () => {
  let component: ModalAgregarUbicacionComponent;
  let fixture: ComponentFixture<ModalAgregarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
