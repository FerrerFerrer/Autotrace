import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteServiciosComponent } from './reporte-servicios.component';

describe('ReporteServiciosComponent', () => {
  let component: ReporteServiciosComponent;
  let fixture: ComponentFixture<ReporteServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
