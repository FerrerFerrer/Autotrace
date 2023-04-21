import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEstadoProcesoComponent } from './modal-editar-estado-proceso.component';

describe('ModalEditarEstadoProcesoComponent', () => {
  let component: ModalEditarEstadoProcesoComponent;
  let fixture: ComponentFixture<ModalEditarEstadoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarEstadoProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarEstadoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
