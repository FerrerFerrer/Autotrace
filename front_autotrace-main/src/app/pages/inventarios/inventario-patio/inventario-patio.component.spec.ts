import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioPatioComponent } from './inventario-patio.component';

describe('InventarioPatioComponent', () => {
  let component: InventarioPatioComponent;
  let fixture: ComponentFixture<InventarioPatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioPatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioPatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
