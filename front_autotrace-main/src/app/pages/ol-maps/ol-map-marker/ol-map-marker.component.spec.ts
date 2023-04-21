import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlMapMarkerComponent } from './ol-map-marker.component';

describe('OlMapMarkerComponent', () => {
  let component: OlMapMarkerComponent;
  let fixture: ComponentFixture<OlMapMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlMapMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlMapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
