import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito57Component } from './modal-agregar-digito57.component';

describe('ModalAgregarDigito57Component', () => {
  let component: ModalAgregarDigito57Component;
  let fixture: ComponentFixture<ModalAgregarDigito57Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito57Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito57Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
