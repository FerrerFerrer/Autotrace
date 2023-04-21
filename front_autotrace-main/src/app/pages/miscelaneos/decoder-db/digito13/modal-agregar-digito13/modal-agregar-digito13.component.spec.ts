import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDigito13Component } from './modal-agregar-digito13.component';

describe('ModalAgregarDigito13Component', () => {
  let component: ModalAgregarDigito13Component;
  let fixture: ComponentFixture<ModalAgregarDigito13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDigito13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDigito13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
