import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarProveedorComponent } from './modal-agregar-proveedor.component';

describe('ModalAgregarProveedorComponent', () => {
  let component: ModalAgregarProveedorComponent;
  let fixture: ComponentFixture<ModalAgregarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
