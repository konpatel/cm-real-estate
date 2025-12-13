import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent } from './property-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Property } from '../../models/property.model';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  const mockProperty: Property = {
    id: '1',
    title: 'Luxury Apartment in Kolonaki',
    location: 'Kolonaki, Athens',
    price: 350000,
    priceLabel: '€350,000',
    currency: '€',
    type: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: 'Beautiful renovated apartment',
    features: ['Renovated 2024', 'Central Heating', 'Balcony'],
    isFeatured: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCardComponent, MatButtonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    component.property = mockProperty;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have property input', () => {
      expect(component.property).toBeDefined();
      expect(component.property).toEqual(mockProperty);
    });

    it('should have contactClick event emitter', () => {
      expect(component.contactClick).toBeDefined();
    });
  });

  describe('Event Handling', () => {
    it('should emit contactClick event with property id', () => {
      spyOn(component.contactClick, 'emit');
      component.onContactClick();
      expect(component.contactClick.emit).toHaveBeenCalledWith('1');
    });

    it('should call onContactClick when button is clicked', () => {
      spyOn(component, 'onContactClick');
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.property-card__cta') as HTMLButtonElement;

      button.click();

      expect(component.onContactClick).toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    it('should render property card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const card = compiled.querySelector('.property-card');
      expect(card).toBeTruthy();
    });

    it('should render property image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const image = compiled.querySelector('.property-card__image') as HTMLImageElement;
      expect(image).toBeTruthy();
      expect(image.src).toContain(mockProperty.imageUrl);
    });

    it('should render property image with alt text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const image = compiled.querySelector('.property-card__image') as HTMLImageElement;
      expect(image.alt).toContain(mockProperty.title);
      expect(image.alt).toContain(mockProperty.location);
    });

    it('should render property title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.property-card__title');
      expect(title?.textContent).toContain(mockProperty.title);
    });

    it('should render property location', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const location = compiled.querySelector('.property-card__location');
      expect(location?.textContent).toContain(mockProperty.location);
    });

    it('should render property price', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const price = compiled.querySelector('.property-card__price');
      expect(price?.textContent).toContain(mockProperty.priceLabel);
    });

    it('should render bedrooms count', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const card = compiled.querySelector('.property-card');
      expect(card?.textContent).toContain(mockProperty.bedrooms.toString());
    });

    it('should render bathrooms count', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const card = compiled.querySelector('.property-card');
      expect(card?.textContent).toContain(mockProperty.bathrooms.toString());
    });

    it('should render size', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const card = compiled.querySelector('.property-card');
      expect(card?.textContent).toContain(mockProperty.size.toString());
    });

    it('should render type badge', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.property-card__type-badge');
      expect(badge).toBeTruthy();
    });

    it('should show "For Sale" badge for sale type', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.property-card__type-badge');
      expect(badge?.textContent?.trim()).toBe('For Sale');
    });

    it('should show "For Rent" badge for rent type', () => {
      component.property = { ...mockProperty, type: 'rent' };
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.property-card__type-badge');
      expect(badge?.textContent?.trim()).toBe('For Rent');
    });

    it('should render contact button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.property-card__cta');
      expect(button?.textContent).toContain('Contact About This Property');
    });

    it('should render location icon', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.property-card__location mat-icon');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should render feature icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const features = compiled.querySelectorAll('.property-card__feature');
      expect(features.length).toBe(3); // bedrooms, bathrooms, size
    });
  });

  describe('Accessibility', () => {
    it('should have semantic article element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const article = compiled.querySelector('article');
      expect(article).toBeTruthy();
    });

    it('should have h3 heading for title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h3 = compiled.querySelector('h3');
      expect(h3).toBeTruthy();
    });

    it('should have aria-label on contact button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.property-card__cta');
      expect(button?.getAttribute('aria-label')).toBeTruthy();
      expect(button?.getAttribute('aria-label')).toContain(mockProperty.title);
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('mat-icon');
      icons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have screen reader text for features', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const srTexts = compiled.querySelectorAll('.sr-only');
      expect(srTexts.length).toBeGreaterThan(0);
    });
  });

  describe('CSS Classes', () => {
    it('should have sale badge class for sale type', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.property-card__type-badge');
      expect(badge?.classList.contains('property-card__type-badge--sale')).toBe(true);
    });

    it('should have rent badge class for rent type', () => {
      component.property = { ...mockProperty, type: 'rent' };
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.property-card__type-badge');
      expect(badge?.classList.contains('property-card__type-badge--rent')).toBe(true);
    });

    it('should have image container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const imageContainer = compiled.querySelector('.property-card__image-container');
      expect(imageContainer).toBeTruthy();
    });

    it('should have content container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.querySelector('.property-card__content');
      expect(content).toBeTruthy();
    });

    it('should have header section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.property-card__header');
      expect(header).toBeTruthy();
    });

    it('should have features section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const features = compiled.querySelector('.property-card__features');
      expect(features).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('should have three feature items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const features = compiled.querySelectorAll('.property-card__feature');
      expect(features.length).toBe(3);
    });

    it('should display features in order: bedrooms, bathrooms, size', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const features = compiled.querySelectorAll('.property-card__feature');

      expect(features[0].textContent).toContain(mockProperty.bedrooms.toString());
      expect(features[1].textContent).toContain(mockProperty.bathrooms.toString());
      expect(features[2].textContent).toContain(mockProperty.size.toString());
    });
  });
});
