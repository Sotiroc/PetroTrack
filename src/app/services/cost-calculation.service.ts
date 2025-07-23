import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CostCalculation, CostCalculationFormData, ManualCostData, CostSettings } from '../models/cost-calculation.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CostCalculationService {
  private readonly COST_SETTINGS_KEY = 'petroTrack_costSettings';
  private readonly DEFAULT_COST_PER_KM = 2.0;

  private costSettingsSubject = new BehaviorSubject<CostSettings>(this.getDefaultCostSettings());
  public costSettings$ = this.costSettingsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.loadCostSettings();
  }

  /**
   * Calculate cost per km from fill-up data
   */
  calculateCostPerKm(formData: CostCalculationFormData): CostCalculation {
    const distanceTraveled = formData.distanceAfter - formData.distanceBefore;
    
    if (distanceTraveled <= 0) {
      throw new Error('Distance after fill up must be greater than distance before fill up');
    }

    const calculatedCostPerKm = formData.fillUpCost / distanceTraveled;

    return {
      fillUpCost: formData.fillUpCost,
      distanceBefore: formData.distanceBefore,
      distanceAfter: formData.distanceAfter,
      distanceTraveled,
      calculatedCostPerKm
    };
  }

  /**
   * Apply calculated cost as current cost per km
   */
  applyCalculatedCost(calculation: CostCalculation): void {
    const newSettings: CostSettings = {
      currentCostPerKm: calculation.calculatedCostPerKm,
      lastUpdated: new Date(),
      calculationMethod: 'automatic'
    };

    this.updateCostSettings(newSettings);
  }

  /**
   * Set manual cost per km
   */
  setManualCost(manualData: ManualCostData): void {
    if (manualData.costPerKm <= 0) {
      throw new Error('Cost per km must be greater than 0');
    }

    const newSettings: CostSettings = {
      currentCostPerKm: manualData.costPerKm,
      lastUpdated: new Date(),
      calculationMethod: 'manual'
    };

    this.updateCostSettings(newSettings);
  }

  /**
   * Get current cost per km
   */
  getCurrentCostPerKm(): number {
    return this.costSettingsSubject.value.currentCostPerKm;
  }

  /**
   * Get current cost settings
   */
  getCurrentCostSettings(): CostSettings {
    return this.costSettingsSubject.value;
  }

  /**
   * Reset cost settings to default
   */
  resetCostSettings(): void {
    const defaultSettings = this.getDefaultCostSettings();
    this.updateCostSettings(defaultSettings);
  }

  private updateCostSettings(settings: CostSettings): void {
    this.costSettingsSubject.next(settings);
    this.saveCostSettings(settings);
  }

  private loadCostSettings(): void {
    const savedSettings = this.localStorageService.getItem<CostSettings>(this.COST_SETTINGS_KEY);
    
    if (savedSettings) {
      // Ensure dates are properly deserialized
      const settings: CostSettings = {
        ...savedSettings,
        lastUpdated: new Date(savedSettings.lastUpdated)
      };
      this.costSettingsSubject.next(settings);
    }
  }

  private saveCostSettings(settings: CostSettings): void {
    this.localStorageService.setItem(this.COST_SETTINGS_KEY, settings);
  }

  private getDefaultCostSettings(): CostSettings {
    return {
      currentCostPerKm: this.DEFAULT_COST_PER_KM,
      lastUpdated: new Date(),
      calculationMethod: 'manual'
    };
  }
}
