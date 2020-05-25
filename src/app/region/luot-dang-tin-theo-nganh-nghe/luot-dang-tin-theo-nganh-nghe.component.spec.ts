import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuotDangTinTheoNganhNgheComponent } from './luot-dang-tin-theo-nganh-nghe.component';

describe('LuotDangTinTheoNganhNgheComponent', () => {
  let component: LuotDangTinTheoNganhNgheComponent;
  let fixture: ComponentFixture<LuotDangTinTheoNganhNgheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuotDangTinTheoNganhNgheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuotDangTinTheoNganhNgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
