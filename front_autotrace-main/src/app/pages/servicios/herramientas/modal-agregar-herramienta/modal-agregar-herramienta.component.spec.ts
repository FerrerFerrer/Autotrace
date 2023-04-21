import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarHerramientaComponent } from './modal-agregar-herramienta.component';

describe('ModalAgregarHerramientaComponent', () => {
  let component: ModalAgregarHerramientaComponent;
  let fixture: ComponentFixture<ModalAgregarHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarHerramientaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
