import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarModelComponent } from './modal-agregar-model.component';

describe('ModalAgregarModelComponent', () => {
  let component: ModalAgregarModelComponent;
  let fixture: ComponentFixture<ModalAgregarModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
