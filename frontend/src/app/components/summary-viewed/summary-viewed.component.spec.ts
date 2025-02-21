import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryViewedComponent } from './summary-viewed.component';

describe('SummaryViewedComponent', () => {
  let component: SummaryViewedComponent;
  let fixture: ComponentFixture<SummaryViewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryViewedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
