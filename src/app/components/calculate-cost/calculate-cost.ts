import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CostCalculationService } from '../../services/cost-calculation.service';
import { CostCalculation, CostSettings, CostCalculationFormData, ManualCostData } from '../../models/cost-calculation.model';

@Component({
  selector: 'app-calculate-cost',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculate-cost.html',
  styleUrl: './calculate-cost.css'
})
export class CalculateCostComponent implements OnInit, OnDestroy {
  costSettings$: Observable<CostSettings>;
  activeTab: 'calculate' | 'manual' = 'calculate';
  
  calculateForm: FormGroup;
  manualForm: FormGroup;
  
  calculationResult: CostCalculation | null = null;
  showResult = false;
  
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private costCalculationService: CostCalculationService
  ) {
    this.costSettings$ = this.costCalculationService.costSettings$;
    this.calculateForm = this.createCalculateForm();
    this.manualForm = this.createManualForm();
  }

  ngOnInit(): void {
    // Pre-fill manual form with current cost
    this.subscription.add(
      this.costSettings$.subscribe(settings => {
        this.manualForm.patchValue({
          costPerKm: settings.currentCostPerKm
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createCalculateForm(): FormGroup {
    return this.fb.group({
      fillUpCost: ['', [Validators.required, Validators.min(0.01)]],
      distanceBefore: ['', [Validators.required, Validators.min(0)]],
      distanceAfter: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  private createManualForm(): FormGroup {
    return this.fb.group({
      costPerKm: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  setActiveTab(tab: 'calculate' | 'manual'): void {
    this.activeTab = tab;
    this.showResult = false;
    this.calculationResult = null;
  }

  onCalculateSubmit(): void {
    if (this.calculateForm.valid) {
      try {
        const formData: CostCalculationFormData = this.calculateForm.value;
        this.calculationResult = this.costCalculationService.calculateCostPerKm(formData);
        this.showResult = true;
      } catch (error: any) {
        alert(error.message);
      }
    }
  }

  onManualSubmit(): void {
    if (this.manualForm.valid) {
      try {
        const formData: ManualCostData = this.manualForm.value;
        this.costCalculationService.setManualCost(formData);
        alert('Cost per km has been updated successfully!');
      } catch (error: any) {
        alert(error.message);
      }
    }
  }

  applyCalculatedCost(): void {
    if (this.calculationResult) {
      this.costCalculationService.applyCalculatedCost(this.calculationResult);
      alert('Cost per km has been updated successfully!');
      
      // Reset form and hide result
      this.calculateForm.reset();
      this.showResult = false;
      this.calculationResult = null;
    }
  }
}
