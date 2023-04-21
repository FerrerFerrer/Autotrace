import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnviarListaCorreoComponent } from './modal-enviar-lista-correo.component';

describe('ModalEnviarListaCorreoComponent', () => {
  let component: ModalEnviarListaCorreoComponent;
  let fixture: ComponentFixture<ModalEnviarListaCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEnviarListaCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnviarListaCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
