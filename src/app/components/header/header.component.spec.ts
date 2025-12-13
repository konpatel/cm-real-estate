import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have navigation items', () => {
      expect(component.navItems).toBeDefined();
      expect(component.navItems.length).toBe(5);
    });

    it('should have correct navigation labels', () => {
      const labels = component.navItems.map(item => item.label);
      expect(labels).toEqual(['Home', 'Properties', 'Services', 'About', 'Contact']);
    });

    it('should have correct section IDs', () => {
      const sectionIds = component.navItems.map(item => item.sectionId);
      expect(sectionIds).toEqual(['hero', 'properties', 'services', 'about', 'contact']);
    });

    it('should initialize with hero as active section', () => {
      expect(component.activeSection).toBe('hero');
    });

    it('should initialize with mobile menu closed', () => {
      expect(component.isMobileMenuOpen).toBe(false);
    });

    it('should initialize with not scrolled state', () => {
      expect(component.isScrolled).toBe(false);
    });

    it('should have contact phone from environment', () => {
      expect(component.contactPhone).toBeDefined();
      expect(component.contactPhoneLink).toBeDefined();
    });
  });

  describe('Scroll Detection', () => {
    it('should detect scroll and set isScrolled to true', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      component.onWindowScroll();
      expect(component.isScrolled).toBe(true);
    });

    it('should not set isScrolled for small scroll amounts', () => {
      Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
      component.onWindowScroll();
      expect(component.isScrolled).toBe(false);
    });

    it('should set isScrolled at threshold', () => {
      Object.defineProperty(window, 'scrollY', { value: 21, writable: true });
      component.onWindowScroll();
      expect(component.isScrolled).toBe(true);
    });
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu open', () => {
      component.isMobileMenuOpen = false;
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBe(true);
    });

    it('should toggle mobile menu closed', () => {
      component.isMobileMenuOpen = true;
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBe(false);
    });

    it('should prevent body scroll when menu is open', () => {
      component.isMobileMenuOpen = false;
      component.toggleMobileMenu();
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when menu is closed', () => {
      component.isMobileMenuOpen = true;
      component.toggleMobileMenu();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Navigation', () => {
    it('should identify active section correctly', () => {
      component.activeSection = 'properties';
      expect(component.isActive('properties')).toBe(true);
      expect(component.isActive('hero')).toBe(false);
    });

    it('should call scrollToSection with correct sectionId', () => {
      spyOn(component, 'scrollToSection');
      const sectionId = 'properties';
      component.scrollToSection(sectionId);
      expect(component.scrollToSection).toHaveBeenCalledWith(sectionId);
    });

    it('should close mobile menu when navigating', () => {
      component.isMobileMenuOpen = true;

      // Create a mock element
      const mockElement = document.createElement('div');
      mockElement.id = 'properties';
      spyOn(document, 'getElementById').and.returnValue(mockElement);

      component.scrollToSection('properties');
      expect(component.isMobileMenuOpen).toBe(false);
    });

    it('should update active section when scrolling to section', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'services';
      spyOn(document, 'getElementById').and.returnValue(mockElement);

      component.scrollToSection('services');
      expect(component.activeSection).toBe('services');
    });
  });

  describe('Rendering', () => {
    it('should render logo text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoText = compiled.querySelector('.logo-text');
      expect(logoText?.textContent).toContain('Christiano Immobiliare');
    });

    it('should render all navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navLinks = compiled.querySelectorAll('.nav-link');
      expect(navLinks.length).toBe(5);
    });

    it('should render phone CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector('.phone-link');
      expect(phoneLink).toBeTruthy();
    });

    it('should render mobile toggle button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mobileToggle = compiled.querySelector('.header__mobile-toggle');
      expect(mobileToggle).toBeTruthy();
    });

    it('should apply scrolled class when scrolled', () => {
      component.isScrolled = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.header');
      expect(header?.classList.contains('scrolled')).toBe(true);
    });

    it('should apply open class to mobile menu when open', () => {
      component.isMobileMenuOpen = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const mobileMenu = compiled.querySelector('.mobile-menu');
      expect(mobileMenu?.classList.contains('open')).toBe(true);
    });

    it('should apply active class to current navigation item', () => {
      component.activeSection = 'properties';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const navLinks = compiled.querySelectorAll('.nav-link');
      const activeLink = Array.from(navLinks).find(link =>
        link.classList.contains('active')
      );
      expect(activeLink?.textContent?.trim()).toBe('Properties');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on logo link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoLink = compiled.querySelector('.logo-link');
      expect(logoLink?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-expanded on mobile toggle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mobileToggle = compiled.querySelector('.header__mobile-toggle');
      expect(mobileToggle?.getAttribute('aria-expanded')).toBe('false');

      component.isMobileMenuOpen = true;
      fixture.detectChanges();
      expect(mobileToggle?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-current on active navigation item', () => {
      component.activeSection = 'services';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const navLinks = compiled.querySelectorAll('.nav-link');
      const activeLink = Array.from(navLinks).find(link =>
        link.getAttribute('aria-current') === 'page'
      );
      expect(activeLink?.textContent?.trim()).toBe('Services');
    });
  });
});
