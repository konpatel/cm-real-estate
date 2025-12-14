/**
 * Property Model
 *
 * Represents a real estate property listing.
 * Used for both sale and rental properties.
 */
export interface Property {
  /** Unique identifier for the property */
  id: string;

  /** Property title/headline */
  title: string;

  /** Location (neighborhood, city) */
  location: string;

  /** Numeric price value */
  price: number;

  /** Formatted price string with currency symbol */
  priceLabel: string;

  /** Currency code */
  currency: string;

  /** Property type: for sale or for rent */
  type: 'sale' | 'rent';

  /** Number of bedrooms */
  bedrooms: number;

  /** Number of bathrooms */
  bathrooms: number;

  /** Property size in square meters */
  size: number;

  /** URL to property image */
  imageUrl: string;

  /** Array of image URLs for property carousel (optional) */
  imageUrls?: string[];

  /** Detailed property description */
  description: string;

  /** List of property features/amenities */
  features: string[];

  /** Whether this property should be featured on homepage */
  isFeatured?: boolean;
}
