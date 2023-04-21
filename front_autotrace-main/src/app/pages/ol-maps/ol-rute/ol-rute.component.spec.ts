import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlRuteComponent } from './ol-rute.component';

describe('OlRuteComponent', () => {
  let component: OlRuteComponent;
  let fixture: ComponentFixture<OlRuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlRuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlRuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
