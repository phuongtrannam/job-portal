import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparingJobComponent } from './comparing-job.component';

describe('ComparingJobComponent', () => {
  let component: ComparingJobComponent;
  let fixture: ComponentFixture<ComparingJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparingJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparingJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
