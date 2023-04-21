import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEmpleadoComponent } from './modal-editar-empleado.component';

describe('ModalEditarEmpleadoComponent', () => {
  let component: ModalEditarEmpleadoComponent;
  let fixture: ComponentFixture<ModalEditarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
