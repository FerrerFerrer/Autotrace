import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescargaDetallesDaniosComponent } from './modal-descarga-detalles-danios.component';

describe('ModalDescargaDetallesDaniosComponent', () => {
  let component: ModalDescargaDetallesDaniosComponent;
  let fixture: ComponentFixture<ModalDescargaDetallesDaniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDescargaDetallesDaniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDescargaDetallesDaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
