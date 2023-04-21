import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpleadosActividadComponent } from './modal-empleados-actividad.component';

describe('ModalEmpleadosActividadComponent', () => {
  let component: ModalEmpleadosActividadComponent;
  let fixture: ComponentFixture<ModalEmpleadosActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmpleadosActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpleadosActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
