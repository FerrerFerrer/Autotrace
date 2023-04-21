import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTipoInventarioComponent } from './modal-agregar-tipo-inventario.component';

describe('ModalAgregarTipoInventarioComponent', () => {
  let component: ModalAgregarTipoInventarioComponent;
  let fixture: ComponentFixture<ModalAgregarTipoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarTipoInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarTipoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
