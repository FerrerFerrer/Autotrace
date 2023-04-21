import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarClienteComponent } from './modal-editar-cliente.component';

describe('ModalEditarClienteComponent', () => {
  let component: ModalEditarClienteComponent;
  let fixture: ComponentFixture<ModalEditarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
