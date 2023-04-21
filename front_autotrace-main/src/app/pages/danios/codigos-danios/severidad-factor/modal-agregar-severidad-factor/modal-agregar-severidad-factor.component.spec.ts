import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarSeveridadFactorComponent } from './modal-agregar-severidad-factor.component';

describe('ModalAgregarSeveridadFactorComponent', () => {
  let component: ModalAgregarSeveridadFactorComponent;
  let fixture: ComponentFixture<ModalAgregarSeveridadFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarSeveridadFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarSeveridadFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
