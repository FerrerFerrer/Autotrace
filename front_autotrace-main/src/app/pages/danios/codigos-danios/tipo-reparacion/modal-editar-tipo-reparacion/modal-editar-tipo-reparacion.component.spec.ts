import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTipoReparacionComponent } from './modal-editar-tipo-reparacion.component';

describe('ModalEditarTipoReparacionComponent', () => {
  let component: ModalEditarTipoReparacionComponent;
  let fixture: ComponentFixture<ModalEditarTipoReparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTipoReparacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTipoReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
