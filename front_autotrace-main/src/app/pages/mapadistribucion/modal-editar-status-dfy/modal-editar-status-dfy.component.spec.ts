import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarStatusDfyComponent } from './modal-editar-status-dfy.component';

describe('ModalEditarStatusDfyComponent', () => {
  let component: ModalEditarStatusDfyComponent;
  let fixture: ComponentFixture<ModalEditarStatusDfyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarStatusDfyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarStatusDfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
