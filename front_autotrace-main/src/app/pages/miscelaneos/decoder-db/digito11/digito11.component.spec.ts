import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito11Component } from './digito11.component';

describe('Digito11Component', () => {
  let component: Digito11Component;
  let fixture: ComponentFixture<Digito11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
