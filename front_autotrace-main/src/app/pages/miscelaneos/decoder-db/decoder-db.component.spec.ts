import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoderDbComponent } from './decoder-db.component';

describe('DecoderDbComponent', () => {
  let component: DecoderDbComponent;
  let fixture: ComponentFixture<DecoderDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoderDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoderDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
