import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito10Component } from './modal-editar-digito10.component';

describe('ModalEditarDigito10Component', () => {
  let component: ModalEditarDigito10Component;
  let fixture: ComponentFixture<ModalEditarDigito10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
