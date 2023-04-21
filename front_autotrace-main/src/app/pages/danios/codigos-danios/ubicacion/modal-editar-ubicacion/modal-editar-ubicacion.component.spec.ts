import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarUbicacionComponent } from './modal-editar-ubicacion.component';

describe('ModalEditarUbicacionComponent', () => {
  let component: ModalEditarUbicacionComponent;
  let fixture: ComponentFixture<ModalEditarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
