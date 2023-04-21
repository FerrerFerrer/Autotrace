import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarInventarioComponent } from './modal-editar-inventario.component';

describe('ModalEditarInventarioComponent', () => {
  let component: ModalEditarInventarioComponent;
  let fixture: ComponentFixture<ModalEditarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
