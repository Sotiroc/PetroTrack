import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip, TripFormData } from '../../models/trip.model';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-modal.html',
  styleUrl: './trip-modal.css'
})
export class TripModalComponent implements OnInit, OnChanges {
  @Input() show = false;
  @Input() trip: Trip | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() tripSaved = new EventEmitter<void>();

  tripForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {
    this.tripForm = this.createForm();
  }

  ngOnInit(): void {
    this.updateFormBasedOnTrip();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update form whenever the trip input changes
    if (changes['trip'] || changes['show']) {
      this.updateFormBasedOnTrip();
    }
  }

  private updateFormBasedOnTrip(): void {
    if (this.trip) {
      this.isEditing = true;
      this.populateForm();
    } else {
      this.isEditing = false;
      this.tripForm.reset();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      distance: ['', [Validators.required, Validators.min(0.1)]],
      frequency: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private populateForm(): void {
    if (this.trip) {
      this.tripForm.patchValue({
        name: this.trip.name,
        distance: this.trip.distance,
        frequency: this.trip.frequency
      });
    }
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const formData: TripFormData = this.tripForm.value;
      
      if (this.isEditing && this.trip) {
        this.tripService.updateTrip(this.trip.id, formData);
      } else {
        this.tripService.addTrip(formData);
      }
      
      this.tripSaved.emit();
      this.resetForm();
    }
  }

  onClose(): void {
    this.close.emit();
    this.resetForm();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  private resetForm(): void {
    this.tripForm.reset();
    this.isEditing = false;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Edit Trip' : 'Add New Trip';
  }
}
