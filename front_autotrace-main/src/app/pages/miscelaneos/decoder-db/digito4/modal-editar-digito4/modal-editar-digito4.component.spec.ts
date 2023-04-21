import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito4Component } from './modal-editar-digito4.component';

describe('ModalEditarDigito4Component', () => {
  let component: ModalEditarDigito4Component;
  let fixture: ComponentFixture<ModalEditarDigito4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
