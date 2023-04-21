import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDigito13Component } from './modal-editar-digito13.component';

describe('ModalEditarDigito13Component', () => {
  let component: ModalEditarDigito13Component;
  let fixture: ComponentFixture<ModalEditarDigito13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDigito13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDigito13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
