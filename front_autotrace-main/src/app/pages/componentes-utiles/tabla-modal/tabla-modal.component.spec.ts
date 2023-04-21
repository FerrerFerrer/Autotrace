import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModalComponent } from './tabla-modal.component';

describe('TablaModalComponent', () => {
  let component: TablaModalComponent;
  let fixture: ComponentFixture<TablaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
