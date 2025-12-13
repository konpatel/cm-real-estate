import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesSectionComponent } from './services-section.component';
import { MatIconModule } from '@angular/material/icon';

describe('ServicesSectionComponent', () => {
  let component: ServicesSectionComponent;
  let fixture: ComponentFixture<ServicesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesSectionComponent, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have services array', () => {
      expect(component.services).toBeDefined();
      expect(component.services.length).toBe(3);
    });

    it('should have Property Sales service', () => {
      const sales = component.services.find(s => s.title === 'Property Sales');
      expect(sales).toBeDefined();
      expect(sales?.icon).toBe('sell');
      expect(sales?.description).toBeTruthy();
    });

    it('should have Property Rentals service', () => {
      const rentals = component.services.find(s => s.title === 'Property Rentals');
      expect(rentals).toBeDefined();
      expect(rentals?.icon).toBe('vpn_key');
      expect(rentals?.description).toBeTruthy();
    });

    it('should have Renovation Expertise service', () => {
      const renovation = component.services.find(s => s.title === 'Renovation Expertise');
      expect(renovation).toBeDefined();
      expect(renovation?.icon).toBe('construction');
      expect(renovation?.description).toBeTruthy();
    });

    it('should have icon for each service', () => {
      component.services.forEach(service => {
        expect(service.icon).toBeTruthy();
      });
    });

    it('should have title for each service', () => {
      component.services.forEach(service => {
        expect(service.title).toBeTruthy();
      });
    });

    it('should have description for each service', () => {
      component.services.forEach(service => {
        expect(service.description).toBeTruthy();
      });
    });
  });

  describe('Rendering', () => {
    it('should render section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.services');
      expect(section).toBeTruthy();
    });

    it('should render section header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.services__header');
      expect(header).toBeTruthy();
    });

    it('should render section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.services__title');
      expect(title?.textContent).toContain('Our Services');
    });

    it('should render section subtitle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subtitle = compiled.querySelector('.services__subtitle');
      expect(subtitle?.textContent).toBeTruthy();
    });

    it('should render services grid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.services__grid');
      expect(grid).toBeTruthy();
    });

    it('should render three service cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.service-card');
      expect(cards.length).toBe(3);
    });

    it('should render service titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titles = compiled.querySelectorAll('.service-card__title');
      expect(titles.length).toBe(3);

      const titleTexts = Array.from(titles).map(t => t.textContent?.trim());
      expect(titleTexts).toContain('Property Sales');
      expect(titleTexts).toContain('Property Rentals');
      expect(titleTexts).toContain('Renovation Expertise');
    });

    it('should render service descriptions', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const descriptions = compiled.querySelectorAll('.service-card__description');
      expect(descriptions.length).toBe(3);

      descriptions.forEach(desc => {
        expect(desc.textContent?.length).toBeGreaterThan(0);
      });
    });

    it('should render service icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.service-card__icon');
      expect(icons.length).toBe(3);
    });

    it('should render correct icons for each service', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.service-card__icon');

      const iconTexts = Array.from(icons).map(i => i.textContent?.trim());
      expect(iconTexts).toContain('sell');
      expect(iconTexts).toContain('vpn_key');
      expect(iconTexts).toContain('construction');
    });

    it('should render icon containers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const iconContainers = compiled.querySelectorAll('.service-card__icon-container');
      expect(iconContainers.length).toBe(3);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic section element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('should have id attribute on section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section?.getAttribute('id')).toBe('services');
    });

    it('should have h2 heading for section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toContain('Our Services');
    });

    it('should have h3 headings for service titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h3s = compiled.querySelectorAll('h3');
      expect(h3s.length).toBe(3);
    });

    it('should have semantic article elements for service cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const articles = compiled.querySelectorAll('article');
      expect(articles.length).toBe(3);
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.service-card__icon');
      icons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Container', () => {
    it('should have container element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.services__container');
      expect(container).toBeTruthy();
    });
  });

  describe('Service Card Structure', () => {
    it('should have icon container in each card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.service-card');

      cards.forEach(card => {
        const iconContainer = card.querySelector('.service-card__icon-container');
        expect(iconContainer).toBeTruthy();
      });
    });

    it('should have title in each card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.service-card');

      cards.forEach(card => {
        const title = card.querySelector('.service-card__title');
        expect(title).toBeTruthy();
      });
    });

    it('should have description in each card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.service-card');

      cards.forEach(card => {
        const description = card.querySelector('.service-card__description');
        expect(description).toBeTruthy();
      });
    });
  });

  describe('Content Validation', () => {
    it('should have non-empty service titles', () => {
      component.services.forEach(service => {
        expect(service.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty service descriptions', () => {
      component.services.forEach(service => {
        expect(service.description.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have meaningful description length', () => {
      component.services.forEach(service => {
        expect(service.description.length).toBeGreaterThan(50);
      });
    });
  });
});
