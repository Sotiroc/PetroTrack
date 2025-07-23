import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trip, TripFormData, TripSummary } from '../models/trip.model';
import { LocalStorageService } from './local-storage.service';
import { CostCalculationService } from './cost-calculation.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly TRIPS_KEY = 'petroTrack_trips';

  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  public trips$ = this.tripsSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private costCalculationService: CostCalculationService
  ) {
    this.loadTrips();
  }

  /**
   * Get all trips
   */
  getAllTrips(): Trip[] {
    return this.tripsSubject.value;
  }

  /**
   * Get trip by ID
   */
  getTripById(id: number): Trip | undefined {
    return this.tripsSubject.value.find(trip => trip.id === id);
  }

  /**
   * Add new trip
   */
  addTrip(tripData: TripFormData): Trip {
    const currentCostPerKm = this.costCalculationService.getCurrentCostPerKm();
    const now = new Date();
    
    const newTrip: Trip = {
      id: this.generateId(),
      name: tripData.name.trim(),
      distance: tripData.distance,
      frequency: tripData.frequency,
      costPerKm: currentCostPerKm,
      createdAt: now,
      updatedAt: now
    };

    const currentTrips = this.tripsSubject.value;
    const updatedTrips = [...currentTrips, newTrip];
    
    this.updateTrips(updatedTrips);
    return newTrip;
  }

  /**
   * Update existing trip
   */
  updateTrip(id: number, tripData: TripFormData): Trip | null {
    const currentTrips = this.tripsSubject.value;
    const tripIndex = currentTrips.findIndex(trip => trip.id === id);
    
    if (tripIndex === -1) {
      return null;
    }

    const existingTrip = currentTrips[tripIndex];
    const updatedTrip: Trip = {
      ...existingTrip,
      name: tripData.name.trim(),
      distance: tripData.distance,
      frequency: tripData.frequency,
      updatedAt: new Date()
    };

    const updatedTrips = [...currentTrips];
    updatedTrips[tripIndex] = updatedTrip;
    
    this.updateTrips(updatedTrips);
    return updatedTrip;
  }

  /**
   * Delete trip
   */
  deleteTrip(id: number): boolean {
    const currentTrips = this.tripsSubject.value;
    const filteredTrips = currentTrips.filter(trip => trip.id !== id);
    
    if (filteredTrips.length === currentTrips.length) {
      return false; // Trip not found
    }

    this.updateTrips(filteredTrips);
    return true;
  }

  /**
   * Update cost per km for all trips
   */
  updateAllTripsCostPerKm(newCostPerKm: number): void {
    const currentTrips = this.tripsSubject.value;
    const updatedTrips = currentTrips.map(trip => ({
      ...trip,
      costPerKm: newCostPerKm,
      updatedAt: new Date()
    }));

    this.updateTrips(updatedTrips);
  }

  /**
   * Get trip statistics summary
   */
  getTripSummary(): TripSummary {
    const trips = this.tripsSubject.value;
    
    if (trips.length === 0) {
      return {
        totalTrips: 0,
        totalMonthlyDistance: 0,
        totalMonthlyCost: 0,
        averageCostPerTrip: 0
      };
    }

    const totalTrips = trips.length;
    const totalMonthlyDistance = trips.reduce((sum, trip) => sum + (trip.distance * trip.frequency), 0);
    const totalMonthlyCost = trips.reduce((sum, trip) => sum + (trip.distance * trip.frequency * trip.costPerKm), 0);
    const averageCostPerTrip = totalMonthlyCost / trips.reduce((sum, trip) => sum + trip.frequency, 0);

    return {
      totalTrips,
      totalMonthlyDistance,
      totalMonthlyCost,
      averageCostPerTrip: isNaN(averageCostPerTrip) ? 0 : averageCostPerTrip
    };
  }

  /**
   * Calculate monthly cost for a specific trip
   */
  calculateMonthlyCost(trip: Trip): number {
    return trip.distance * trip.frequency * trip.costPerKm;
  }

  /**
   * Clear all trips
   */
  clearAllTrips(): void {
    this.updateTrips([]);
  }

  private updateTrips(trips: Trip[]): void {
    this.tripsSubject.next(trips);
    this.saveTrips(trips);
  }

  private loadTrips(): void {
    const savedTrips = this.localStorageService.getItem<Trip[]>(this.TRIPS_KEY);
    
    if (savedTrips && Array.isArray(savedTrips)) {
      // Ensure dates are properly deserialized
      const trips = savedTrips.map(trip => ({
        ...trip,
        createdAt: new Date(trip.createdAt),
        updatedAt: new Date(trip.updatedAt)
      }));
      this.tripsSubject.next(trips);
    } else {
      // Initialize with sample data if no trips exist
      this.initializeSampleData();
    }
  }

  private saveTrips(trips: Trip[]): void {
    this.localStorageService.setItem(this.TRIPS_KEY, trips);
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  private initializeSampleData(): void {
    const currentCostPerKm = this.costCalculationService.getCurrentCostPerKm();
    const now = new Date();
    
    const sampleTrips: Trip[] = [
      {
        id: 1,
        name: "Work Commute",
        distance: 25,
        frequency: 22,
        costPerKm: currentCostPerKm,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: "Weekend Shopping",
        distance: 15,
        frequency: 8,
        costPerKm: currentCostPerKm,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        name: "Visit Family",
        distance: 45,
        frequency: 4,
        costPerKm: currentCostPerKm,
        createdAt: now,
        updatedAt: now
      }
    ];

    this.updateTrips(sampleTrips);
  }
}
