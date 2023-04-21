import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesDanioComponent } from './modal-detalles-danio.component';

describe('ModalDetallesDanioComponent', () => {
  let component: ModalDetallesDanioComponent;
  let fixture: ComponentFixture<ModalDetallesDanioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetallesDanioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesDanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
