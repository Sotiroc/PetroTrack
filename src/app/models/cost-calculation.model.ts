export interface CostCalculation {
  fillUpCost: number;
  distanceBefore: number;
  distanceAfter: number;
  calculatedCostPerKm: number;
  distanceTraveled: number;
}

export interface CostCalculationFormData {
  fillUpCost: number;
  distanceBefore: number;
  distanceAfter: number;
}

export interface ManualCostData {
  costPerKm: number;
}

export interface CostSettings {
  currentCostPerKm: number;
  lastUpdated: Date;
  calculationMethod: 'automatic' | 'manual';
}
