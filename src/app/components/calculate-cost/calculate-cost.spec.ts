import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCost } from './calculate-cost';

describe('CalculateCost', () => {
  let component: CalculateCost;
  let fixture: ComponentFixture<CalculateCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateCost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
