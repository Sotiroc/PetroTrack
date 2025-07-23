import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { CostCalculationService } from '../../services/cost-calculation.service';
import { Trip, TripSummary } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripModalComponent } from '../trip-modal/trip-modal';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TripCardComponent, TripModalComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  trips$: Observable<Trip[]>;
  tripSummary: TripSummary = {
    totalTrips: 0,
    totalMonthlyDistance: 0,
    totalMonthlyCost: 0,
    averageCostPerTrip: 0
  };
  
  showTripModal = false;
  editingTrip: Trip | null = null;
  
  private subscription = new Subscription();

  constructor(
    private tripService: TripService,
    private costCalculationService: CostCalculationService
  ) {
    this.trips$ = this.tripService.trips$;
  }

  ngOnInit(): void {
    // Subscribe to trips changes to update summary
    this.subscription.add(
      this.trips$.subscribe(() => {
        this.tripSummary = this.tripService.getTripSummary();
      })
    );

    // Subscribe to cost changes to update trip costs
    this.subscription.add(
      this.costCalculationService.costSettings$.subscribe(settings => {
        this.tripService.updateAllTripsCostPerKm(settings.currentCostPerKm);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openAddTripModal(): void {
    this.editingTrip = null;
    this.showTripModal = true;
  }

  openEditTripModal(trip: Trip): void {
    this.editingTrip = trip;
    this.showTripModal = true;
  }

  closeTripModal(): void {
    this.showTripModal = false;
    this.editingTrip = null;
  }

  onTripDeleted(tripId: number): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(tripId);
    }
  }

  onTripSaved(): void {
    this.closeTripModal();
  }
}
