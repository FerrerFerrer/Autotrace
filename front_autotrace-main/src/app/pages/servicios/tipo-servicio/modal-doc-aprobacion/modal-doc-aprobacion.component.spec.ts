import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocAprobacionComponent } from './modal-doc-aprobacion.component';

describe('ModalDocAprobacionComponent', () => {
  let component: ModalDocAprobacionComponent;
  let fixture: ComponentFixture<ModalDocAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocAprobacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
