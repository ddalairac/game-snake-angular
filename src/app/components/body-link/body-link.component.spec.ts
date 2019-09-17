import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLinkComponent } from './body-link.component';

describe('BodyLinkComponent', () => {
  let component: BodyLinkComponent;
  let fixture: ComponentFixture<BodyLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
