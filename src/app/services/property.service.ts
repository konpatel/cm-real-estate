import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../models/property.model';
import { PROPERTIES } from '../data/properties.data';

/**
 * PropertyService
 *
 * Manages property data access. Currently returns hardcoded data,
 * but designed to easily swap to HTTP API calls in Phase 2.
 */
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = PROPERTIES;

  /**
   * Get all properties
   * @returns Array of all properties
   */
  getAllProperties(): Property[] {
    return this.properties;
  }

  /**
   * Get featured properties only
   * @returns Array of featured properties
   */
  getFeaturedProperties(): Property[] {
    return this.properties.filter(p => p.isFeatured);
  }

  /**
   * Get a single property by ID
   * @param id Property ID
   * @returns Property object or undefined if not found
   */
  getPropertyById(id: string): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  /**
   * Get properties by type (sale or rent)
   * @param type Property type
   * @returns Array of properties matching the type
   */
  getPropertiesByType(type: 'sale' | 'rent'): Property[] {
    return this.properties.filter(p => p.type === type);
  }

  // Observable versions for future API integration
  /**
   * Get all properties as Observable
   * @returns Observable of all properties
   */
  getAllProperties$(): Observable<Property[]> {
    return of(this.properties);
  }

  /**
   * Get featured properties as Observable
   * @returns Observable of featured properties
   */
  getFeaturedProperties$(): Observable<Property[]> {
    return of(this.properties.filter(p => p.isFeatured));
  }

  /**
   * Get property by ID as Observable
   * @param id Property ID
   * @returns Observable of property or undefined
   */
  getPropertyById$(id: string): Observable<Property | undefined> {
    return of(this.properties.find(p => p.id === id));
  }
}
