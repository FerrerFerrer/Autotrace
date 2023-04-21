import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarHerramientaComponent } from './modal-editar-herramienta.component';

describe('ModalEditarHerramientaComponent', () => {
  let component: ModalEditarHerramientaComponent;
  let fixture: ComponentFixture<ModalEditarHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarHerramientaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
