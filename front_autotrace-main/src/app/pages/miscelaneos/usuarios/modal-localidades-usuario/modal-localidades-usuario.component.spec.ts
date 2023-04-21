import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocalidadesUsuarioComponent } from './modal-localidades-usuario.component';

describe('ModalLocalidadesUsuarioComponent', () => {
  let component: ModalLocalidadesUsuarioComponent;
  let fixture: ComponentFixture<ModalLocalidadesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLocalidadesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocalidadesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
