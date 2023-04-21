import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTipoServicioComponent } from './modal-editar-tipo-servicio.component';

describe('ModalEditarTipoServicioComponent', () => {
  let component: ModalEditarTipoServicioComponent;
  let fixture: ComponentFixture<ModalEditarTipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTipoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
