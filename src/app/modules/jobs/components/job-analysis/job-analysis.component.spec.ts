import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAnalysisComponent } from './job-analysis.component';

describe('JobAnalysisComponent', () => {
  let component: JobAnalysisComponent;
  let fixture: ComponentFixture<JobAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
