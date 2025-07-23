import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
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
    }
  }
}
