import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparingCompanyComponent } from './comparing-company.component';

describe('ComparingCompanyComponent', () => {
  let component: ComparingCompanyComponent;
  let fixture: ComponentFixture<ComparingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
