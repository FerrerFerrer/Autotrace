import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTipoComponent } from './modal-editar-tipo.component';

describe('ModalEditarTipoComponent', () => {
  let component: ModalEditarTipoComponent;
  let fixture: ComponentFixture<ModalEditarTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
