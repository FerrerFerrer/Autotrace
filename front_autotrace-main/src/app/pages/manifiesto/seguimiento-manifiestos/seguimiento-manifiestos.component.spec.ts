import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoManifiestosComponent } from './seguimiento-manifiestos.component';

describe('SeguimientoManifiestosComponent', () => {
  let component: SeguimientoManifiestosComponent;
  let fixture: ComponentFixture<SeguimientoManifiestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoManifiestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoManifiestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
