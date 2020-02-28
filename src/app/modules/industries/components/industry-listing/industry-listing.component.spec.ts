import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryListingComponent } from './industry-listing.component';

describe('IndustryListingComponent', () => {
  let component: IndustryListingComponent;
  let fixture: ComponentFixture<IndustryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
