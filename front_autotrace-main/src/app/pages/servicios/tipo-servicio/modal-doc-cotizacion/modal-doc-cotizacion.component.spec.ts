import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocCotizacionComponent } from './modal-doc-cotizacion.component';

describe('ModalDocCotizacionComponent', () => {
  let component: ModalDocCotizacionComponent;
  let fixture: ComponentFixture<ModalDocCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
