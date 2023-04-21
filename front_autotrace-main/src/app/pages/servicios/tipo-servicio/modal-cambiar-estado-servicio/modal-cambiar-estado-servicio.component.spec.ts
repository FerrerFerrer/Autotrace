import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarEstadoServicioComponent } from './modal-cambiar-estado-servicio.component';

describe('ModalCambiarEstadoServicioComponent', () => {
  let component: ModalCambiarEstadoServicioComponent;
  let fixture: ComponentFixture<ModalCambiarEstadoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCambiarEstadoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarEstadoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
