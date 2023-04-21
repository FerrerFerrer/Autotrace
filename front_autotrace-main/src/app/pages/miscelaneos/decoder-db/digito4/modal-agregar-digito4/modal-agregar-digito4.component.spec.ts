import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito4Component } from './modal-agregar-digito4.component';

describe('ModalAgregarDigito4Component', () => {
  let component: ModalAgregarDigito4Component;
  let fixture: ComponentFixture<ModalAgregarDigito4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
