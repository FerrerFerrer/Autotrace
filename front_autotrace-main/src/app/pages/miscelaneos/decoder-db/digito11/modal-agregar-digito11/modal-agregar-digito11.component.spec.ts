import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito11Component } from './modal-agregar-digito11.component';

describe('ModalAgregarDigito11Component', () => {
  let component: ModalAgregarDigito11Component;
  let fixture: ComponentFixture<ModalAgregarDigito11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
