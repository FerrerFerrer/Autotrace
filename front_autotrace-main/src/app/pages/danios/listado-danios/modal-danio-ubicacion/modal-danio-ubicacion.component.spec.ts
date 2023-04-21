import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDanioUbicacionComponent } from './modal-danio-ubicacion.component';

describe('ModalDanioUbicacionComponent', () => {
  let component: ModalDanioUbicacionComponent;
  let fixture: ComponentFixture<ModalDanioUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDanioUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanioUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
