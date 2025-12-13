import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have current year', () => {
      const currentYear = new Date().getFullYear();
      expect(component.currentYear).toBe(currentYear);
    });

    it('should have tagline', () => {
      expect(component.tagline).toBeDefined();
      expect(component.tagline).toContain('Athens');
    });

    it('should have contact information', () => {
      expect(component.contactInfo).toBeDefined();
      expect(component.contactInfo.phone).toBeDefined();
      expect(component.contactInfo.email).toBeDefined();
      expect(component.contactInfo.address).toBeDefined();
    });

    it('should have quick links', () => {
      expect(component.quickLinks).toBeDefined();
      expect(component.quickLinks.length).toBe(5);
    });

    it('should have correct quick link labels', () => {
      const labels = component.quickLinks.map(link => link.label);
      expect(labels).toEqual(['Home', 'Properties', 'Services', 'About Us', 'Contact']);
    });

    it('should have correct section IDs in quick links', () => {
      const sectionIds = component.quickLinks.map(link => link.sectionId);
      expect(sectionIds).toEqual(['hero', 'properties', 'services', 'about', 'contact']);
    });

    it('should have social links', () => {
      expect(component.socialLinks).toBeDefined();
      expect(component.socialLinks.length).toBe(3);
    });
  });

  describe('Navigation', () => {
    it('should call scrollToSection with correct sectionId', () => {
      spyOn(component, 'scrollToSection');
      component.scrollToSection('properties');
      expect(component.scrollToSection).toHaveBeenCalledWith('properties');
    });

    it('should scroll to element when it exists', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'services';
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');
      component.scrollToSection('services');

      expect(window.scrollTo).toHaveBeenCalled();
      document.body.removeChild(mockElement);
    });

    it('should handle scrolling when element does not exist', () => {
      spyOn(window, 'scrollTo');
      component.scrollToSection('non-existent');
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    it('should render company logo', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoText = compiled.querySelector('.logo-text');
      expect(logoText?.textContent).toContain('Christiano Immobiliare');
    });

    it('should render tagline', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tagline = compiled.querySelector('.company-tagline');
      expect(tagline?.textContent).toContain(component.tagline);
    });

    it('should render copyright with current year', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const copyright = compiled.querySelector('.company-copyright');
      expect(copyright?.textContent).toContain(component.currentYear.toString());
      expect(copyright?.textContent).toContain('Christiano Immobiliare');
    });

    it('should render all quick links', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('.link-item');
      expect(links.length).toBe(5);
    });

    it('should render quick links section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titles = compiled.querySelectorAll('.section-title');
      const quickLinksTitle = Array.from(titles).find(title =>
        title.textContent?.includes('Quick Links')
      );
      expect(quickLinksTitle).toBeTruthy();
    });

    it('should render contact section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titles = compiled.querySelectorAll('.section-title');
      const contactTitle = Array.from(titles).find(title =>
        title.textContent?.includes('Contact Us')
      );
      expect(contactTitle).toBeTruthy();
    });

    it('should render contact information', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const contactItems = compiled.querySelectorAll('.contact-item');
      expect(contactItems.length).toBeGreaterThanOrEqual(3);
    });

    it('should render address', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('.footer');
      expect(footer?.textContent).toContain(component.contactInfo.address);
    });

    it('should render phone number', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('.footer');
      expect(footer?.textContent).toContain(component.contactInfo.phone);
    });

    it('should render email', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('.footer');
      expect(footer?.textContent).toContain(component.contactInfo.email);
    });

    it('should render icons for contact items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.contact-item mat-icon');
      expect(icons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Links', () => {
    it('should have tel: link for phone', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector(`a[href="${component.contactInfo.phoneLink}"]`);
      expect(phoneLink).toBeTruthy();
    });

    it('should have mailto: link for email', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailLink = compiled.querySelector(`a[href="mailto:${component.contactInfo.email}"]`);
      expect(emailLink).toBeTruthy();
    });

    it('should have clickable quick links', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('.link');
      links.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on phone link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector(`a[href="${component.contactInfo.phoneLink}"]`);
      expect(phoneLink?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-label on email link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailLink = compiled.querySelector(`a[href="mailto:${component.contactInfo.email}"]`);
      expect(emailLink?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.contact-item mat-icon');
      icons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have semantic footer element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Responsive Layout', () => {
    it('should have grid container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.footer__container');
      expect(container).toBeTruthy();
    });

    it('should have three sections', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sections = compiled.querySelectorAll('.footer__section');
      expect(sections.length).toBe(3);
    });

    it('should have company section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const companySection = compiled.querySelector('.footer__company');
      expect(companySection).toBeTruthy();
    });

    it('should have links section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const linksSection = compiled.querySelector('.footer__links');
      expect(linksSection).toBeTruthy();
    });

    it('should have contact section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const contactSection = compiled.querySelector('.footer__contact');
      expect(contactSection).toBeTruthy();
    });
  });
});
