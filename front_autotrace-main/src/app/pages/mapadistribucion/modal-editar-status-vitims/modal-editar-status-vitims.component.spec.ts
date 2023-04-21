import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarStatusVitimsComponent } from './modal-editar-status-vitims.component';

describe('ModalEditarStatusVitimsComponent', () => {
  let component: ModalEditarStatusVitimsComponent;
  let fixture: ComponentFixture<ModalEditarStatusVitimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarStatusVitimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarStatusVitimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
