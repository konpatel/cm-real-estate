import { TestBed } from '@angular/core/testing';
import { PropertyService } from './property.service';
import { Property } from '../models/property.model';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProperties', () => {
    it('should return an array of properties', () => {
      const properties = service.getAllProperties();
      expect(Array.isArray(properties)).toBe(true);
      expect(properties.length).toBeGreaterThan(0);
    });

    it('should return 5 properties', () => {
      const properties = service.getAllProperties();
      expect(properties.length).toBe(5);
    });

    it('should return properties with all required fields', () => {
      const properties = service.getAllProperties();
      properties.forEach(property => {
        expect(property.id).toBeDefined();
        expect(property.title).toBeDefined();
        expect(property.location).toBeDefined();
        expect(property.price).toBeGreaterThan(0);
        expect(property.priceLabel).toBeDefined();
        expect(property.currency).toBe('EUR');
        expect(['sale', 'rent']).toContain(property.type);
        expect(property.bedrooms).toBeGreaterThanOrEqual(0);
        expect(property.bathrooms).toBeGreaterThanOrEqual(0);
        expect(property.size).toBeGreaterThan(0);
        expect(property.imageUrl).toBeDefined();
        expect(property.description).toBeDefined();
        expect(Array.isArray(property.features)).toBe(true);
      });
    });
  });

  describe('getFeaturedProperties', () => {
    it('should return only featured properties', () => {
      const featuredProperties = service.getFeaturedProperties();
      featuredProperties.forEach(property => {
        expect(property.isFeatured).toBe(true);
      });
    });

    it('should return 5 featured properties', () => {
      const featuredProperties = service.getFeaturedProperties();
      expect(featuredProperties.length).toBe(5);
    });
  });

  describe('getPropertyById', () => {
    it('should return a property when valid ID is provided', () => {
      const property = service.getPropertyById('prop-001');
      expect(property).toBeDefined();
      expect(property?.id).toBe('prop-001');
      expect(property?.title).toBe('Luxury Apartment in Kolonaki');
    });

    it('should return undefined when invalid ID is provided', () => {
      const property = service.getPropertyById('invalid-id');
      expect(property).toBeUndefined();
    });
  });

  describe('getPropertiesByType', () => {
    it('should return only sale properties when type is "sale"', () => {
      const saleProperties = service.getPropertiesByType('sale');
      saleProperties.forEach(property => {
        expect(property.type).toBe('sale');
      });
      expect(saleProperties.length).toBeGreaterThan(0);
    });

    it('should return only rent properties when type is "rent"', () => {
      const rentProperties = service.getPropertiesByType('rent');
      rentProperties.forEach(property => {
        expect(property.type).toBe('rent');
      });
      expect(rentProperties.length).toBeGreaterThan(0);
    });

    it('should have at least one property of each type', () => {
      const saleProperties = service.getPropertiesByType('sale');
      const rentProperties = service.getPropertiesByType('rent');
      expect(saleProperties.length).toBeGreaterThanOrEqual(1);
      expect(rentProperties.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Observable methods', () => {
    it('should return all properties as Observable', (done) => {
      service.getAllProperties$().subscribe(properties => {
        expect(Array.isArray(properties)).toBe(true);
        expect(properties.length).toBe(5);
        done();
      });
    });

    it('should return featured properties as Observable', (done) => {
      service.getFeaturedProperties$().subscribe(properties => {
        expect(properties.length).toBe(5);
        properties.forEach(property => {
          expect(property.isFeatured).toBe(true);
        });
        done();
      });
    });

    it('should return property by ID as Observable', (done) => {
      service.getPropertyById$('prop-001').subscribe(property => {
        expect(property).toBeDefined();
        expect(property?.id).toBe('prop-001');
        done();
      });
    });

    it('should return undefined for invalid ID as Observable', (done) => {
      service.getPropertyById$('invalid-id').subscribe(property => {
        expect(property).toBeUndefined();
        done();
      });
    });
  });

  describe('Data validation', () => {
    it('should have properties with Athens locations', () => {
      const properties = service.getAllProperties();
      properties.forEach(property => {
        expect(property.location).toContain('Athens');
      });
    });

    it('should have properly formatted price labels', () => {
      const properties = service.getAllProperties();
      properties.forEach(property => {
        expect(property.priceLabel).toContain('€');
      });
    });

    it('should have placeholder image URLs', () => {
      const properties = service.getAllProperties();
      properties.forEach(property => {
        expect(property.imageUrl).toContain('placeholder');
      });
    });

    it('should have features array with at least one feature', () => {
      const properties = service.getAllProperties();
      properties.forEach(property => {
        expect(property.features.length).toBeGreaterThan(0);
      });
    });
  });
});
