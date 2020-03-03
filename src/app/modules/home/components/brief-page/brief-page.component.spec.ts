import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefPageComponent } from './brief-page.component';

describe('BriefPageComponent', () => {
  let component: BriefPageComponent;
  let fixture: ComponentFixture<BriefPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
