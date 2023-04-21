import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarClienteComponent } from './modal-agregar-cliente.component';

describe('ModalAgregarClienteComponent', () => {
  let component: ModalAgregarClienteComponent;
  let fixture: ComponentFixture<ModalAgregarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
