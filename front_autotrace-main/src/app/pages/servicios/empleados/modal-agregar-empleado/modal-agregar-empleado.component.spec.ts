import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarEmpleadoComponent } from './modal-agregar-empleado.component';

describe('ModalAgregarEmpleadoComponent', () => {
  let component: ModalAgregarEmpleadoComponent;
  let fixture: ComponentFixture<ModalAgregarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
