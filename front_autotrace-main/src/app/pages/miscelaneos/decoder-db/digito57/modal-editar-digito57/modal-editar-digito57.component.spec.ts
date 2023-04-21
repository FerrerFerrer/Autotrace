import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito57Component } from './modal-editar-digito57.component';

describe('ModalEditarDigito57Component', () => {
  let component: ModalEditarDigito57Component;
  let fixture: ComponentFixture<ModalEditarDigito57Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito57Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito57Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
