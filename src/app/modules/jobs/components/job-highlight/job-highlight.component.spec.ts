import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHighlightComponent } from './job-highlight.component';

describe('JobHighlightComponent', () => {
  let component: JobHighlightComponent;
  let fixture: ComponentFixture<JobHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
