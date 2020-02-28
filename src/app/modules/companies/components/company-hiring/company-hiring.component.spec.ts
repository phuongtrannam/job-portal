import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHiringComponent } from './company-hiring.component';

describe('CompanyHiringComponent', () => {
  let component: CompanyHiringComponent;
  let fixture: ComponentFixture<CompanyHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
