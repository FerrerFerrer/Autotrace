import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchivosSubidosComponent } from './modal-archivos-subidos.component';

describe('ModalArchivosSubidosComponent', () => {
  let component: ModalArchivosSubidosComponent;
  let fixture: ComponentFixture<ModalArchivosSubidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalArchivosSubidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArchivosSubidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
