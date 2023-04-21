import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTarifasComponent } from './historial-tarifas.component';

describe('HistorialTarifasComponent', () => {
  let component: HistorialTarifasComponent;
  let fixture: ComponentFixture<HistorialTarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialTarifasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
