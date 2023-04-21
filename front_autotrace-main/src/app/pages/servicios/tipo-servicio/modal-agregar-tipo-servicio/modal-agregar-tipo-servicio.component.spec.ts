import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTipoServicioComponent } from './modal-agregar-tipo-servicio.component';

describe('ModalAgregarTipoServicioComponent', () => {
  let component: ModalAgregarTipoServicioComponent;
  let fixture: ComponentFixture<ModalAgregarTipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarTipoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
