import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarGeocercaComponent } from './modal-agregar-geocerca.component';

describe('ModalAgregarGeocercaComponent', () => {
  let component: ModalAgregarGeocercaComponent;
  let fixture: ComponentFixture<ModalAgregarGeocercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarGeocercaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarGeocercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
