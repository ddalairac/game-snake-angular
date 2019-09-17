import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSlotComponent } from './stage-slot.component';

describe('StageSlotComponent', () => {
  let component: StageSlotComponent;
  let fixture: ComponentFixture<StageSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
