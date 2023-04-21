import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarInventarioComponent } from './modal-agregar-inventario.component';

describe('ModalAgregarInventarioComponent', () => {
  let component: ModalAgregarInventarioComponent;
  let fixture: ComponentFixture<ModalAgregarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
