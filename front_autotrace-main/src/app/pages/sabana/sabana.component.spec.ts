import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabanaComponent } from './sabana.component';

describe('SabanaComponent', () => {
  let component: SabanaComponent;
  let fixture: ComponentFixture<SabanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SabanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
