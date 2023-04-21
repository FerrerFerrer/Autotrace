import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito8Component } from './modal-editar-digito8.component';

describe('ModalEditarDigito8Component', () => {
  let component: ModalEditarDigito8Component;
  let fixture: ComponentFixture<ModalEditarDigito8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
