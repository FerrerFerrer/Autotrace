import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarGeocercaComponent } from './modal-editar-geocerca.component';

describe('ModalEditarGeocercaComponent', () => {
  let component: ModalEditarGeocercaComponent;
  let fixture: ComponentFixture<ModalEditarGeocercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarGeocercaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarGeocercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
