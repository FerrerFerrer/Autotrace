import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDanioComponent } from './detalles-danio.component';

describe('DetallesDanioComponent', () => {
  let component: DetallesDanioComponent;
  let fixture: ComponentFixture<DetallesDanioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesDanioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesDanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
