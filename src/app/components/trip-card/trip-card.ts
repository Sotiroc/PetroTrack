import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Trip } from '../../models/trip.model';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() editTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<number>();

  constructor(private tripService: TripService) {}

  get monthlyCost(): number {
    return this.tripService.calculateMonthlyCost(this.trip);
  }

  onEdit(): void {
    this.editTrip.emit(this.trip);
  }

  onDelete(): void {
    this.deleteTrip.emit(this.trip.id);
  }
}
