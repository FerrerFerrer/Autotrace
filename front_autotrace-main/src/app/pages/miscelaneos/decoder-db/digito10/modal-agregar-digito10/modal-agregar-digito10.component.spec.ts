import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito10Component } from './modal-agregar-digito10.component';

describe('ModalAgregarDigito10Component', () => {
  let component: ModalAgregarDigito10Component;
  let fixture: ComponentFixture<ModalAgregarDigito10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
