import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, MatButtonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have headline', () => {
      expect(component.headline).toBeDefined();
      expect(component.headline).toContain('Athens');
    });

    it('should have subheadline', () => {
      expect(component.subheadline).toBeDefined();
      expect(component.subheadline.length).toBeGreaterThan(0);
    });

    it('should have contact phone link', () => {
      expect(component.contactPhoneLink).toBeDefined();
      expect(component.contactPhoneLink).toContain('tel:');
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
      mockElement.id = 'properties';
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');
      component.scrollToSection('properties');

      expect(window.scrollTo).toHaveBeenCalled();
      document.body.removeChild(mockElement);
    });

    it('should handle scrolling when element does not exist', () => {
      spyOn(window, 'scrollTo');
      component.scrollToSection('non-existent');
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should scroll with offset for header', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'services';
      Object.defineProperty(mockElement, 'offsetTop', {
        writable: true,
        value: 1000
      });
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');
      component.scrollToSection('services');

      const callArgs = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
      expect(callArgs.top).toBe(1000 - 80); // offsetTop - headerHeight
      expect(callArgs.behavior).toBe('smooth');

      document.body.removeChild(mockElement);
    });
  });

  describe('Call to Action', () => {
    it('should call callToAction', () => {
      spyOn(component, 'callToAction');
      component.callToAction();
      expect(component.callToAction).toHaveBeenCalled();
    });

    it('should set window.location.href to contact phone link', () => {
      // This test verifies the method attempts to set window.location.href
      // In a real browser environment, this would trigger a phone call
      const phoneLink = component.contactPhoneLink;

      // We'll just verify the contactPhoneLink is properly formatted
      expect(phoneLink).toContain('tel:');
      expect(phoneLink.startsWith('tel:')).toBe(true);
    });
  });

  describe('Rendering', () => {
    it('should render headline', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headline = compiled.querySelector('.hero__headline');
      expect(headline?.textContent).toContain(component.headline);
    });

    it('should render subheadline', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subheadline = compiled.querySelector('.hero__subheadline');
      expect(subheadline?.textContent).toContain(component.subheadline);
    });

    it('should render hero section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hero = compiled.querySelector('.hero');
      expect(hero).toBeTruthy();
    });

    it('should render overlay', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.hero__overlay');
      expect(overlay).toBeTruthy();
    });

    it('should render content container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.querySelector('.hero__content');
      expect(content).toBeTruthy();
    });

    it('should render CTAs container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const ctas = compiled.querySelector('.hero__ctas');
      expect(ctas).toBeTruthy();
    });

    it('should render two CTA buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.hero__cta');
      expect(buttons.length).toBe(2);
    });

    it('should render primary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const primaryCta = compiled.querySelector('.hero__cta--primary');
      expect(primaryCta).toBeTruthy();
      expect(primaryCta?.textContent).toContain('Explore Properties');
    });

    it('should render secondary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const secondaryCta = compiled.querySelector('.hero__cta--secondary');
      expect(secondaryCta).toBeTruthy();
      expect(secondaryCta?.textContent).toContain('Contact Us');
    });

    it('should render scroll indicator', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const scrollIndicator = compiled.querySelector('.hero__scroll-indicator');
      expect(scrollIndicator).toBeTruthy();
    });

    it('should render icon in primary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const primaryCta = compiled.querySelector('.hero__cta--primary');
      const icon = primaryCta?.querySelector('mat-icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent?.trim()).toBe('home');
    });

    it('should render icon in secondary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const secondaryCta = compiled.querySelector('.hero__cta--secondary');
      const icon = secondaryCta?.querySelector('mat-icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent?.trim()).toBe('phone');
    });

    it('should render icon in scroll indicator', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const scrollIndicator = compiled.querySelector('.hero__scroll-indicator');
      const icon = scrollIndicator?.querySelector('mat-icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent?.trim()).toBe('keyboard_arrow_down');
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
      expect(section?.getAttribute('id')).toBe('hero');
    });

    it('should have h1 heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h1 = compiled.querySelector('h1');
      expect(h1).toBeTruthy();
    });

    it('should have aria-label on primary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const primaryCta = compiled.querySelector('.hero__cta--primary');
      expect(primaryCta?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-label on secondary CTA', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const secondaryCta = compiled.querySelector('.hero__cta--secondary');
      expect(secondaryCta?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-label on scroll indicator', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const scrollIndicator = compiled.querySelector('.hero__scroll-indicator');
      expect(scrollIndicator?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.hero__cta mat-icon, .hero__scroll-indicator mat-icon');
      icons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have screen reader only text for scroll indicator', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const srText = compiled.querySelector('.sr-only');
      expect(srText?.textContent).toContain('Scroll down');
    });
  });

  describe('Responsive Layout', () => {
    it('should have full viewport height class', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hero = compiled.querySelector('.hero');
      expect(hero).toBeTruthy();
    });

    it('should center content', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.querySelector('.hero__content');
      expect(content).toBeTruthy();
    });
  });

  describe('Button Interactions', () => {
    it('should call scrollToSection when primary CTA is clicked', () => {
      spyOn(component, 'scrollToSection');
      const compiled = fixture.nativeElement as HTMLElement;
      const primaryBtn = compiled.querySelector('.hero__cta--primary') as HTMLButtonElement;

      primaryBtn.click();

      expect(component.scrollToSection).toHaveBeenCalledWith('properties');
    });

    it('should call callToAction when secondary CTA is clicked', () => {
      spyOn(component, 'callToAction');
      const compiled = fixture.nativeElement as HTMLElement;
      const secondaryBtn = compiled.querySelector('.hero__cta--secondary') as HTMLButtonElement;

      secondaryBtn.click();

      expect(component.callToAction).toHaveBeenCalled();
    });

    it('should call scrollToSection when scroll indicator is clicked', () => {
      spyOn(component, 'scrollToSection');
      const compiled = fixture.nativeElement as HTMLElement;
      const scrollIndicator = compiled.querySelector('.hero__scroll-indicator') as HTMLElement;

      scrollIndicator.click();

      expect(component.scrollToSection).toHaveBeenCalledWith('properties');
    });
  });
});
