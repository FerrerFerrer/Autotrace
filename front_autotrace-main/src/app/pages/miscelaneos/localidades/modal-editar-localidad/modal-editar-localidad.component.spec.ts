import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarLocalidadComponent } from './modal-editar-localidad.component';

describe('ModalEditarLocalidadComponent', () => {
  let component: ModalEditarLocalidadComponent;
  let fixture: ComponentFixture<ModalEditarLocalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarLocalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
