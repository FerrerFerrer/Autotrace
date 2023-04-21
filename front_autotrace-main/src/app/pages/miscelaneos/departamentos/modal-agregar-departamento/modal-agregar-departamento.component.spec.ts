import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDepartamentoComponent } from './modal-agregar-departamento.component';

describe('ModalAgregarDepartamentoComponent', () => {
  let component: ModalAgregarDepartamentoComponent;
  let fixture: ComponentFixture<ModalAgregarDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
