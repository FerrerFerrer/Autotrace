import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarSeveridadFactorComponent } from './modal-editar-severidad-factor.component';

describe('ModalEditarSeveridadFactorComponent', () => {
  let component: ModalEditarSeveridadFactorComponent;
  let fixture: ComponentFixture<ModalEditarSeveridadFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarSeveridadFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarSeveridadFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
