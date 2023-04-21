import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito8Component } from './modal-agregar-digito8.component';

describe('ModalAgregarDigito8Component', () => {
  let component: ModalAgregarDigito8Component;
  let fixture: ComponentFixture<ModalAgregarDigito8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
