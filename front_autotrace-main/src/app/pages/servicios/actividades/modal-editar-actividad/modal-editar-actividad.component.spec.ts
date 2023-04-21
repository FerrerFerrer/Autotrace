import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarActividadComponent } from './modal-editar-actividad.component';

describe('ModalEditarActividadComponent', () => {
  let component: ModalEditarActividadComponent;
  let fixture: ComponentFixture<ModalEditarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
