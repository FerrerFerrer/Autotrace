import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarFechaIngresoComponent } from './modal-editar-fecha-ingreso.component';

describe('ModalEditarFechaIngresoComponent', () => {
  let component: ModalEditarFechaIngresoComponent;
  let fixture: ComponentFixture<ModalEditarFechaIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarFechaIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarFechaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
