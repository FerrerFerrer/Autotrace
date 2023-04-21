import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarActividadComponent } from './modal-agregar-actividad.component';

describe('ModalAgregarActividadComponent', () => {
  let component: ModalAgregarActividadComponent;
  let fixture: ComponentFixture<ModalAgregarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
