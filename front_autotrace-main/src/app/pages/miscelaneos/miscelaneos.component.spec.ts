import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscelaneosComponent } from './miscelaneos.component';

describe('MiscelaneosComponent', () => {
  let component: MiscelaneosComponent;
  let fixture: ComponentFixture<MiscelaneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscelaneosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscelaneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
