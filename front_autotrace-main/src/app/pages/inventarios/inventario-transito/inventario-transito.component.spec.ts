import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioTransitoComponent } from './inventario-transito.component';

describe('InventarioTransitoComponent', () => {
  let component: InventarioTransitoComponent;
  let fixture: ComponentFixture<InventarioTransitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioTransitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioTransitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
