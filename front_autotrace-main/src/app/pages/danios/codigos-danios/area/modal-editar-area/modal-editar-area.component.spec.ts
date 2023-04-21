import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAreaComponent } from './modal-editar-area.component';

describe('ModalEditarAreaComponent', () => {
  let component: ModalEditarAreaComponent;
  let fixture: ComponentFixture<ModalEditarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
