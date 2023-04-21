import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocalidadesProveedorComponent } from './modal-localidades-proveedor.component';

describe('ModalLocalidadesProveedorComponent', () => {
  let component: ModalLocalidadesProveedorComponent;
  let fixture: ComponentFixture<ModalLocalidadesProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLocalidadesProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocalidadesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
