import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesReporteComponent } from './modal-detalles-reporte.component';

describe('ModalDetallesReporteComponent', () => {
  let component: ModalDetallesReporteComponent;
  let fixture: ComponentFixture<ModalDetallesReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetallesReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
