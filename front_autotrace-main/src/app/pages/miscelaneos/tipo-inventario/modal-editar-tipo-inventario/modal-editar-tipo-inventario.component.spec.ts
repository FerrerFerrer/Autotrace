import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTipoInventarioComponent } from './modal-editar-tipo-inventario.component';

describe('ModalEditarTipoInventarioComponent', () => {
  let component: ModalEditarTipoInventarioComponent;
  let fixture: ComponentFixture<ModalEditarTipoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTipoInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTipoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
