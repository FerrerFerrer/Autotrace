import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTipoReparacionComponent } from './modal-agregar-tipo-reparacion.component';

describe('ModalAgregarTipoReparacionComponent', () => {
  let component: ModalAgregarTipoReparacionComponent;
  let fixture: ComponentFixture<ModalAgregarTipoReparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarTipoReparacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarTipoReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
