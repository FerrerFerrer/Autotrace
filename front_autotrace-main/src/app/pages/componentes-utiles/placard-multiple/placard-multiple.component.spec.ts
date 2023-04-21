import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacardMultipleComponent } from './placard-multiple.component';

describe('PlacardMultipleComponent', () => {
  let component: PlacardMultipleComponent;
  let fixture: ComponentFixture<PlacardMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacardMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacardMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
