import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTipoComponent } from './modal-agregar-tipo.component';

describe('ModalAgregarTipoComponent', () => {
  let component: ModalAgregarTipoComponent;
  let fixture: ComponentFixture<ModalAgregarTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
