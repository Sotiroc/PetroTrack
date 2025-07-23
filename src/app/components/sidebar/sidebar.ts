import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { CostCalculationService } from '../../services/cost-calculation.service';
import { CostSettings } from '../../models/cost-calculation.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, CurrencyPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  costSettings$: Observable<CostSettings>;
  isMobileMenuOpen = false;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private costCalculationService: CostCalculationService
  ) {
    this.costSettings$ = this.costCalculationService.costSettings$;
  }

  ngOnInit(): void {
    // Close mobile menu when route changes
    this.subscription.add(
      this.router.events.subscribe(() => {
        this.isMobileMenuOpen = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
