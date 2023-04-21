import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirVinComponent } from './imprimir-vin.component';

describe('ImprimirVinComponent', () => {
  let component: ImprimirVinComponent;
  let fixture: ComponentFixture<ImprimirVinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirVinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
