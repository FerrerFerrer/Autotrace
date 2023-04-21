import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidacionComponent } from './modal-validacion.component';

describe('ModalValidacionComponent', () => {
  let component: ModalValidacionComponent;
  let fixture: ComponentFixture<ModalValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValidacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
