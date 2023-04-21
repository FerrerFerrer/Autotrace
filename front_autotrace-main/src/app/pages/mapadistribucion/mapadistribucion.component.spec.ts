import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapadistribucionComponent } from './mapadistribucion.component';

describe('MapadistribucionComponent', () => {
  let component: MapadistribucionComponent;
  let fixture: ComponentFixture<MapadistribucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapadistribucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapadistribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
