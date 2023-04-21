import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito11Component } from './modal-editar-digito11.component';

describe('ModalEditarDigito11Component', () => {
  let component: ModalEditarDigito11Component;
  let fixture: ComponentFixture<ModalEditarDigito11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
