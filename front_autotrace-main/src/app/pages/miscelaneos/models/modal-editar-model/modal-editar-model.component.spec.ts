import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarModelComponent } from './modal-editar-model.component';

describe('ModalEditarModelComponent', () => {
  let component: ModalEditarModelComponent;
  let fixture: ComponentFixture<ModalEditarModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
