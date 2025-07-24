import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('petroTrack');

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Handle GitHub Pages routing from 404.html redirect (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // Remove the base path and navigate to the correct route
        const cleanPath = redirectPath.replace('/PetroTrack', '') || '/dashboard';
        this.router.navigateByUrl(cleanPath);
      }

      // Reset viewport on route changes to prevent zoom issues
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Force viewport reset by scrolling to top and resetting any focus
        window.scrollTo(0, 0);
        
        // Remove focus from any active element
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        
        // Force viewport scale reset on mobile
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
        }
      });
    }
  }
}
