export interface Trip {
  id: number;
  name: string;
  distance: number; // kilometers
  frequency: number; // trips per month
  costPerKm: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripFormData {
  name: string;
  distance: number;
  frequency: number;
}

export interface TripSummary {
  totalTrips: number;
  totalMonthlyDistance: number;
  totalMonthlyCost: number;
  averageCostPerTrip: number;
}
