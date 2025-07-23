import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripModal } from './trip-modal';

describe('TripModal', () => {
  let component: TripModal;
  let fixture: ComponentFixture<TripModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
