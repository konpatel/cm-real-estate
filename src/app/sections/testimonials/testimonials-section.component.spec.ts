import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialsSectionComponent } from './testimonials-section.component';
import { MatIconModule } from '@angular/material/icon';

describe('TestimonialsSectionComponent', () => {
  let component: TestimonialsSectionComponent;
  let fixture: ComponentFixture<TestimonialsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestimonialsSectionComponent,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testimonials Data', () => {
    it('should initialize testimonials array', () => {
      expect(component.testimonials).toBeDefined();
      expect(component.testimonials.length).toBe(3);
    });

    it('should have first testimonial with correct data', () => {
      const testimonial = component.testimonials[0];
      expect(testimonial.id).toBe('1');
      expect(testimonial.name).toBe('Maria Papadopoulos');
      expect(testimonial.role).toBe('Homeowner');
      expect(testimonial.rating).toBe(5);
      expect(testimonial.comment).toContain('dream apartment');
    });

    it('should have second testimonial with correct data', () => {
      const testimonial = component.testimonials[1];
      expect(testimonial.id).toBe('2');
      expect(testimonial.name).toBe('John Anderson');
      expect(testimonial.role).toBe('Property Investor');
      expect(testimonial.rating).toBe(5);
    });

    it('should have third testimonial with correct data', () => {
      const testimonial = component.testimonials[2];
      expect(testimonial.id).toBe('3');
      expect(testimonial.name).toBe('Sofia Dimitriou');
      expect(testimonial.role).toBe('First-time Buyer');
      expect(testimonial.rating).toBe(5);
    });

    it('should have all testimonials with 5-star rating', () => {
      component.testimonials.forEach(testimonial => {
        expect(testimonial.rating).toBe(5);
      });
    });
  });

  describe('getStarArray Method', () => {
    it('should return array with correct length for rating 5', () => {
      const stars = component.getStarArray(5);
      expect(stars.length).toBe(5);
    });

    it('should return array with correct length for rating 4', () => {
      const stars = component.getStarArray(4);
      expect(stars.length).toBe(4);
    });

    it('should return array with correct length for rating 3', () => {
      const stars = component.getStarArray(3);
      expect(stars.length).toBe(3);
    });

    it('should return empty array for rating 0', () => {
      const stars = component.getStarArray(0);
      expect(stars.length).toBe(0);
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
      expect(section?.getAttribute('id')).toBe('testimonials');
    });

    it('should render section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.testimonials__title');
      expect(title?.textContent).toContain('What Our Clients Say');
    });

    it('should render section subtitle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subtitle = compiled.querySelector('.testimonials__subtitle');
      expect(subtitle?.textContent).toContain('testimonials');
    });

    it('should render all three testimonial cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.testimonial-card');
      expect(cards.length).toBe(3);
    });

    it('should render testimonial names', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const names = compiled.querySelectorAll('.testimonial-card__name');
      expect(names.length).toBe(3);
      expect(names[0].textContent?.trim()).toBe('Maria Papadopoulos');
      expect(names[1].textContent?.trim()).toBe('John Anderson');
      expect(names[2].textContent?.trim()).toBe('Sofia Dimitriou');
    });

    it('should render testimonial roles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const roles = compiled.querySelectorAll('.testimonial-card__role');
      expect(roles.length).toBe(3);
      expect(roles[0].textContent?.trim()).toBe('Homeowner');
      expect(roles[1].textContent?.trim()).toBe('Property Investor');
      expect(roles[2].textContent?.trim()).toBe('First-time Buyer');
    });

    it('should render testimonial comments', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const comments = compiled.querySelectorAll('.testimonial-card__comment');
      expect(comments.length).toBe(3);
      expect(comments[0].textContent).toContain('dream apartment');
      expect(comments[1].textContent).toContain('Professional service');
      expect(comments[2].textContent).toContain('first-time buyer');
    });

    it('should render rating stars for each testimonial', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.testimonial-card');

      cards.forEach(card => {
        const stars = card.querySelectorAll('.testimonial-card__star');
        expect(stars.length).toBe(5);
      });
    });

    it('should render star icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const stars = compiled.querySelectorAll('.testimonial-card__star');
      expect(stars.length).toBe(15); // 3 testimonials * 5 stars each

      stars.forEach(star => {
        expect(star.textContent?.trim()).toBe('star');
      });
    });

    it('should render avatar icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const avatars = compiled.querySelectorAll('.testimonial-card__avatar mat-icon');
      expect(avatars.length).toBe(3);

      avatars.forEach(avatar => {
        expect(avatar.textContent?.trim()).toBe('person');
      });
    });
  });

  describe('Grid Layout', () => {
    it('should render testimonials grid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.testimonials__grid');
      expect(grid).toBeTruthy();
    });

    it('should have correct number of cards in grid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.testimonials__grid');
      const cards = grid?.querySelectorAll('.testimonial-card');
      expect(cards?.length).toBe(3);
    });
  });

  describe('Card Structure', () => {
    it('should have rating section in each card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const ratings = compiled.querySelectorAll('.testimonial-card__rating');
      expect(ratings.length).toBe(3);
    });

    it('should have author section in each card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const authors = compiled.querySelectorAll('.testimonial-card__author');
      expect(authors.length).toBe(3);
    });

    it('should have avatar in each author section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const avatars = compiled.querySelectorAll('.testimonial-card__avatar');
      expect(avatars.length).toBe(3);
    });

    it('should have info section in each author section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infos = compiled.querySelectorAll('.testimonial-card__info');
      expect(infos.length).toBe(3);
    });
  });

  describe('Content', () => {
    it('should mention Kolonaki neighborhood', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.testimonials');
      expect(section?.textContent).toContain('Kolonaki');
    });

    it('should mention Pagrati neighborhood', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.testimonials');
      expect(section?.textContent).toContain('Pagrati');
    });

    it('should mention renovation quality', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.testimonials');
      expect(section?.textContent).toContain('renovation');
    });

    it('should have positive sentiment', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.testimonials');
      const text = section?.textContent?.toLowerCase() || '';

      const positiveWords = ['dream', 'professional', 'exceptional', 'beautiful'];
      const hasPositiveWords = positiveWords.some(word => text.includes(word));
      expect(hasPositiveWords).toBe(true);
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
      expect(section?.getAttribute('id')).toBe('testimonials');
    });

    it('should have h2 heading for title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.classList.contains('testimonials__title')).toBe(true);
    });

    it('should have h3 headings for names', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h3s = compiled.querySelectorAll('h3');
      expect(h3s.length).toBe(3);
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('mat-icon[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Layout Structure', () => {
    it('should have container element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('.testimonials__container');
      expect(container).toBeTruthy();
    });

    it('should have header section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.testimonials__header');
      expect(header).toBeTruthy();
    });

    it('should have grid section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const grid = compiled.querySelector('.testimonials__grid');
      expect(grid).toBeTruthy();
    });
  });
});
