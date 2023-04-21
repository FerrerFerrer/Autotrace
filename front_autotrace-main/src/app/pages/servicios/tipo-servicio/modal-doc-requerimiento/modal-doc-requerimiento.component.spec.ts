import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocRequerimientoComponent } from './modal-doc-requerimiento.component';

describe('ModalDocRequerimientoComponent', () => {
  let component: ModalDocRequerimientoComponent;
  let fixture: ComponentFixture<ModalDocRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
