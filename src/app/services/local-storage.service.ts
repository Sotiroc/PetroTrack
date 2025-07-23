import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * Set item in localStorage
   */
  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get item from localStorage
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      return null;
    }
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Clear all localStorage
   */
  clear(): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if localStorage is available (browser environment)
   */
  isAvailable(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
