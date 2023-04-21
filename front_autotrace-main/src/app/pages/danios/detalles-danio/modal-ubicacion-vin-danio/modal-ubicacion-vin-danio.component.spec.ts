import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUbicacionVinDanioComponent } from './modal-ubicacion-vin-danio.component';

describe('ModalUbicacionVinDanioComponent', () => {
  let component: ModalUbicacionVinDanioComponent;
  let fixture: ComponentFixture<ModalUbicacionVinDanioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUbicacionVinDanioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUbicacionVinDanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
