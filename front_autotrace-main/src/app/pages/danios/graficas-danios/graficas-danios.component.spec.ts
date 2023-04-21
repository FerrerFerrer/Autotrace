import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasDaniosComponent } from './graficas-danios.component';

describe('GraficasDaniosComponent', () => {
  let component: GraficasDaniosComponent;
  let fixture: ComponentFixture<GraficasDaniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasDaniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasDaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
