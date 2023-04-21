import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarLocalidadComponent } from './modal-agregar-localidad.component';

describe('ModalAgregarLocalidadComponent', () => {
  let component: ModalAgregarLocalidadComponent;
  let fixture: ComponentFixture<ModalAgregarLocalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarLocalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
