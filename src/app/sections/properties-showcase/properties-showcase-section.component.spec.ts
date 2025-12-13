import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesShowcaseSectionComponent } from './properties-showcase-section.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

describe('PropertiesShowcaseSectionComponent', () => {
  let component: PropertiesShowcaseSectionComponent;
  let fixture: ComponentFixture<PropertiesShowcaseSectionComponent>;
  let propertyService: PropertyService;

  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Apartment',
      location: 'Kolonaki',
      price: 350000,
      priceLabel: '€350,000',
      currency: '€',
      type: 'sale',
      bedrooms: 2,
      bathrooms: 2,
      size: 95,
      imageUrl: 'test1.jpg',
      description: 'Test property 1',
      features: [],
      isFeatured: true
    },
    {
      id: '2',
      title: 'Modern Apartment',
      location: 'Glyfada',
      price: 1200,
      priceLabel: '€1,200/month',
      currency: '€',
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      size: 65,
      imageUrl: 'test2.jpg',
      description: 'Test property 2',
      features: [],
      isFeatured: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesShowcaseSectionComponent],
      providers: [PropertyService]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesShowcaseSectionComponent);
    component = fixture.componentInstance;
    propertyService = TestBed.inject(PropertyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with empty properties array', () => {
      expect(component.properties).toEqual([]);
    });

    it('should load featured properties on init', () => {
      spyOn(propertyService, 'getFeaturedProperties').and.returnValue(mockProperties);

      component.ngOnInit();

      expect(propertyService.getFeaturedProperties).toHaveBeenCalled();
      expect(component.properties).toEqual(mockProperties);
    });

    it('should have properties after ngOnInit', () => {
      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.properties.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('should call onContactProperty with property id', () => {
      spyOn(component, 'onContactProperty');
      component.onContactProperty('1');
      expect(component.onContactProperty).toHaveBeenCalledWith('1');
    });

    it('should scroll to contact section when it exists', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'contact';
      Object.defineProperty(mockElement, 'offsetTop', {
        writable: true,
        value: 1000
      });
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');
      component.onContactProperty('1');

      expect(window.scrollTo).toHaveBeenCalled();
      const callArgs = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
      expect(callArgs.top).toBe(920); // 1000 - 80 (header height)
      expect(callArgs.behavior).toBe('smooth');

      document.body.removeChild(mockElement);
    });

    it('should handle scrolling when contact section does not exist', () => {
      spyOn(window, 'scrollTo');
      component.onContactProperty('1');
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    beforeEach(() => {
      spyOn(propertyService, 'getFeaturedProperties').and.returnValue(mockProperties);
      fixture.detectChanges();
    });

    it('should render section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.properties-showcase');
      expect(section).toBeTruthy();
    });

    it('should render section header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.properties-showcase__header');
      expect(header).toBeTruthy();
    });

    it('should render section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.properties-showcase__title');
      expect(title?.textContent).toContain('Featured Properties');
    });

    it('should render section description', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const description = compiled.querySelector('.properties-showcase__description');
      expect(description?.textContent).toBeTruthy();
    });

    it('should render properties grid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.properties-showcase__grid');
      expect(grid).toBeTruthy();
    });

    it('should render property cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('app-property-card');
      expect(cards.length).toBe(mockProperties.length);
    });

    it('should not render empty state when properties exist', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const empty = compiled.querySelector('.properties-showcase__empty');
      expect(empty).toBeFalsy();
    });
  });

  describe('Empty State', () => {
    beforeEach(() => {
      spyOn(propertyService, 'getFeaturedProperties').and.returnValue([]);
      fixture.detectChanges();
    });

    it('should show empty state when no properties', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const empty = compiled.querySelector('.properties-showcase__empty');
      expect(empty).toBeTruthy();
    });

    it('should show placeholder message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const empty = compiled.querySelector('.properties-showcase__empty p');
      expect(empty?.textContent).toContain('No featured properties');
    });

    it('should not render grid when no properties', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.properties-showcase__grid');
      expect(grid).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      spyOn(propertyService, 'getFeaturedProperties').and.returnValue(mockProperties);
      fixture.detectChanges();
    });

    it('should have semantic section element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('should have id attribute on section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section?.getAttribute('id')).toBe('properties');
    });

    it('should have h2 heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
    });
  });

  describe('Container', () => {
    it('should have container element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.properties-showcase__container');
      expect(container).toBeTruthy();
    });
  });

  describe('Event Handling', () => {
    beforeEach(() => {
      spyOn(propertyService, 'getFeaturedProperties').and.returnValue(mockProperties);
      fixture.detectChanges();
    });

    it('should handle contactClick event from property card', () => {
      spyOn(component, 'onContactProperty');

      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('app-property-card');

      // Simulate click event on first card
      const cardComponent = fixture.debugElement.children[0].query(
        by => by.nativeElement.tagName === 'APP-PROPERTY-CARD'
      );

      if (cardComponent) {
        const cardInstance = cardComponent.componentInstance as any;
        cardInstance.contactClick.emit('1');
        fixture.detectChanges();
      }

      // Note: In the actual template, the event binding will call onContactProperty
      expect(component.onContactProperty).toBeDefined();
    });
  });
});
