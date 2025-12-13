import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutSectionComponent,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Stats Initialization', () => {
    it('should initialize stats array', () => {
      expect(component.stats).toBeDefined();
      expect(component.stats.length).toBe(3);
    });

    it('should have years experience stat', () => {
      const yearsStat = component.stats[0];
      expect(yearsStat.value).toBe('5+');
      expect(yearsStat.label).toBe('Years Experience');
    });

    it('should have properties renovated stat', () => {
      const propertiesStat = component.stats[1];
      expect(propertiesStat.value).toBe('100+');
      expect(propertiesStat.label).toBe('Properties Renovated');
    });

    it('should have happy clients stat', () => {
      const clientsStat = component.stats[2];
      expect(clientsStat.value).toBe('200+');
      expect(clientsStat.label).toBe('Happy Clients');
    });
  });

  describe('scrollToContact Method', () => {
    it('should scroll to contact section', () => {
      const mockElement = document.createElement('section');
      mockElement.id = 'contact';
      Object.defineProperty(mockElement, 'offsetTop', {
        value: 1000,
        writable: true
      });
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');

      component.scrollToContact();

      expect(window.scrollTo).toHaveBeenCalled();
      const scrollCall = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
      expect(scrollCall.top).toBe(920); // 1000 - 80 (header height)
      expect(scrollCall.behavior).toBe('smooth');

      document.body.removeChild(mockElement);
    });

    it('should not throw error if contact section not found', () => {
      expect(() => component.scrollToContact()).not.toThrow();
    });

    it('should calculate correct offset with header height', () => {
      const mockElement = document.createElement('section');
      mockElement.id = 'contact';
      Object.defineProperty(mockElement, 'offsetTop', {
        value: 500,
        writable: true
      });
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');

      component.scrollToContact();

      const expectedOffset = 500 - 80;
      expect(window.scrollTo).toHaveBeenCalled();
      const scrollCall = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
      expect(scrollCall.top).toBe(expectedOffset);
      expect(scrollCall.behavior).toBe('smooth');

      document.body.removeChild(mockElement);
    });
  });

  describe('Rendering', () => {
    it('should render section element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('should render section with correct id', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section?.getAttribute('id')).toBe('about');
    });

    it('should render section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.about__title');
      expect(title?.textContent).toContain('About Christiano Immobiliare');
    });

    it('should render section subtitle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subtitle = compiled.querySelector('.about__subtitle');
      expect(subtitle?.textContent).toContain('trusted partner');
    });

    it('should render all four story paragraphs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const paragraphs = compiled.querySelectorAll('.about__paragraph');
      expect(paragraphs.length).toBe(4);
    });

    it('should render intro paragraph with correct class', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const introParagraph = compiled.querySelector('.about__paragraph--intro');
      expect(introParagraph).toBeTruthy();
      expect(introParagraph?.textContent).toContain('Christiano Immobiliare');
    });

    it('should render strong text in paragraphs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const strongElements = compiled.querySelectorAll('.about__paragraph strong');
      expect(strongElements.length).toBeGreaterThan(0);
    });

    it('should render CTA button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.about__cta');
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Get in Touch');
    });

    it('should render CTA button with icon', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('.about__cta mat-icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent).toContain('phone_in_talk');
    });

    it('should render stats section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statsSection = compiled.querySelector('.about__stats');
      expect(statsSection).toBeTruthy();
    });

    it('should render all three stat cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statCards = compiled.querySelectorAll('.stat-card');
      expect(statCards.length).toBe(3);
    });

    it('should render stat values', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statValues = compiled.querySelectorAll('.stat-card__value');
      expect(statValues.length).toBe(3);
      expect(statValues[0].textContent?.trim()).toBe('5+');
      expect(statValues[1].textContent?.trim()).toBe('100+');
      expect(statValues[2].textContent?.trim()).toBe('200+');
    });

    it('should render stat labels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statLabels = compiled.querySelectorAll('.stat-card__label');
      expect(statLabels.length).toBe(3);
      expect(statLabels[0].textContent?.trim()).toBe('Years Experience');
      expect(statLabels[1].textContent?.trim()).toBe('Properties Renovated');
      expect(statLabels[2].textContent?.trim()).toBe('Happy Clients');
    });
  });

  describe('User Interactions', () => {
    it('should call scrollToContact when CTA button clicked', () => {
      spyOn(component, 'scrollToContact');

      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.about__cta') as HTMLButtonElement;
      button.click();

      expect(component.scrollToContact).toHaveBeenCalled();
    });

    it('should trigger smooth scroll on CTA click', () => {
      const mockElement = document.createElement('section');
      mockElement.id = 'contact';
      Object.defineProperty(mockElement, 'offsetTop', {
        value: 1500,
        writable: true
      });
      document.body.appendChild(mockElement);

      spyOn(window, 'scrollTo');

      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.about__cta') as HTMLButtonElement;
      button.click();

      expect(window.scrollTo).toHaveBeenCalled();
      const scrollCall = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
      expect(scrollCall.top).toBe(1420);
      expect(scrollCall.behavior).toBe('smooth');

      document.body.removeChild(mockElement);
    });
  });

  describe('Content', () => {
    it('should mention specialization in Athens renovations', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.about');
      expect(section?.textContent).toContain('Athens');
    });

    it('should mention renovation expertise', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.about');
      expect(section?.textContent).toContain('renovated');
    });

    it('should mention quality and integrity', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.about');
      expect(section?.textContent).toContain('quality');
      expect(section?.textContent).toContain('integrity');
    });

    it('should mention properties renovated', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.about');
      expect(section?.textContent).toContain('100+');
      expect(section?.textContent).toContain('Properties Renovated');
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
      expect(section?.getAttribute('id')).toBe('about');
    });

    it('should have h2 heading for title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.classList.contains('about__title')).toBe(true);
    });

    it('should have aria-label on CTA button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.about__cta');
      expect(button?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('mat-icon[aria-hidden="true"]');
      expect(icon).toBeTruthy();
    });
  });

  describe('Layout Structure', () => {
    it('should have container element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.about__container');
      expect(container).toBeTruthy();
    });

    it('should have header section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.about__header');
      expect(header).toBeTruthy();
    });

    it('should have content section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.querySelector('.about__content');
      expect(content).toBeTruthy();
    });

    it('should have story section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const story = compiled.querySelector('.about__story');
      expect(story).toBeTruthy();
    });

    it('should have stats section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const stats = compiled.querySelector('.about__stats');
      expect(stats).toBeTruthy();
    });
  });
});
