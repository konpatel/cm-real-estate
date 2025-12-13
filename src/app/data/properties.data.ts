import { Property } from '../models/property.model';

/**
 * Hardcoded Property Data
 *
 * MVP data for property showcase.
 * Replace with API calls in Phase 2.
 */
export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    title: 'Luxury Apartment in Kolonaki',
    location: 'Kolonaki, Athens',
    price: 450000,
    priceLabel: '€450,000',
    currency: 'EUR',
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    imageUrl: 'https://via.placeholder.com/800x600?text=Kolonaki+Apartment',
    description: 'Fully renovated luxury apartment in the heart of Kolonaki. Modern amenities, high ceilings, and premium finishes throughout.',
    features: ['Renovated 2024', 'Central Heating', 'Air Conditioning', 'Balcony', 'Parking'],
    isFeatured: true
  },
  {
    id: 'prop-002',
    title: 'Modern Penthouse in Glyfada',
    location: 'Glyfada, Athens',
    price: 2800,
    priceLabel: '€2,800/month',
    currency: 'EUR',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: 'https://via.placeholder.com/800x600?text=Glyfada+Penthouse',
    description: 'Stunning penthouse with sea views. Completely renovated with designer kitchen and spa-like bathrooms.',
    features: ['Renovated 2023', 'Sea View', 'Roof Terrace', 'Storage', 'Security System'],
    isFeatured: true
  },
  {
    id: 'prop-003',
    title: 'Charming Maisonette in Plaka',
    location: 'Plaka, Athens',
    price: 380000,
    priceLabel: '€380,000',
    currency: 'EUR',
    type: 'sale',
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    imageUrl: 'https://via.placeholder.com/800x600?text=Plaka+Maisonette',
    description: 'Historic charm meets modern comfort. Beautifully renovated maisonette in the picturesque Plaka neighborhood.',
    features: ['Renovated 2024', 'Traditional Architecture', 'Fireplace', 'Private Entrance'],
    isFeatured: true
  },
  {
    id: 'prop-004',
    title: 'Contemporary Loft in Psyrri',
    location: 'Psyrri, Athens',
    price: 1500,
    priceLabel: '€1,500/month',
    currency: 'EUR',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    size: 65,
    imageUrl: 'https://via.placeholder.com/800x600?text=Psyrri+Loft',
    description: 'Industrial-chic loft in vibrant Psyrri. Open-plan living with exposed brick and modern fixtures.',
    features: ['Renovated 2023', 'Open Plan', 'High Ceilings', 'Walk-in Closet'],
    isFeatured: true
  },
  {
    id: 'prop-005',
    title: 'Family Villa in Kifisia',
    location: 'Kifisia, Athens',
    price: 750000,
    priceLabel: '€750,000',
    currency: 'EUR',
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    size: 200,
    imageUrl: 'https://via.placeholder.com/800x600?text=Kifisia+Villa',
    description: 'Spacious family villa with private garden. Fully renovated to exceptional standards with sustainable features.',
    features: ['Renovated 2024', 'Private Garden', 'Solar Panels', 'Garage', 'BBQ Area'],
    isFeatured: true
  }
];
