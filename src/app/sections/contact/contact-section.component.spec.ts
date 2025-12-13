import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactSectionComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize contact form', () => {
      expect(component.contactForm).toBeDefined();
    });

    it('should have name control', () => {
      expect(component.contactForm.get('name')).toBeDefined();
    });

    it('should have email control', () => {
      expect(component.contactForm.get('email')).toBeDefined();
    });

    it('should have phone control', () => {
      expect(component.contactForm.get('phone')).toBeDefined();
    });

    it('should have message control', () => {
      expect(component.contactForm.get('message')).toBeDefined();
    });

    it('should start with invalid form', () => {
      expect(component.contactForm.valid).toBe(false);
    });
  });

  describe('Contact Info', () => {
    it('should have contact info', () => {
      expect(component.contactInfo).toBeDefined();
    });

    it('should have phone number', () => {
      expect(component.contactInfo.phone).toBeTruthy();
    });

    it('should have phone link', () => {
      expect(component.contactInfo.phoneLink).toBeTruthy();
      expect(component.contactInfo.phoneLink).toContain('tel:');
    });

    it('should have email', () => {
      expect(component.contactInfo.email).toBeTruthy();
    });

    it('should have address', () => {
      expect(component.contactInfo.address).toBeTruthy();
    });
  });

  describe('Name Field Validation', () => {
    it('should be invalid when empty', () => {
      const name = component.contactForm.get('name');
      expect(name?.valid).toBe(false);
      expect(name?.hasError('required')).toBe(true);
    });

    it('should be invalid with 1 character', () => {
      const name = component.contactForm.get('name');
      name?.setValue('A');
      expect(name?.valid).toBe(false);
      expect(name?.hasError('minlength')).toBe(true);
    });

    it('should be valid with 2+ characters', () => {
      const name = component.contactForm.get('name');
      name?.setValue('John Doe');
      expect(name?.valid).toBe(true);
    });
  });

  describe('Email Field Validation', () => {
    it('should be invalid when empty', () => {
      const email = component.contactForm.get('email');
      expect(email?.valid).toBe(false);
      expect(email?.hasError('required')).toBe(true);
    });

    it('should be invalid with invalid email format', () => {
      const email = component.contactForm.get('email');
      email?.setValue('invalid-email');
      expect(email?.valid).toBe(false);
      expect(email?.hasError('email')).toBe(true);
    });

    it('should be valid with valid email', () => {
      const email = component.contactForm.get('email');
      email?.setValue('test@example.com');
      expect(email?.valid).toBe(true);
    });
  });

  describe('Phone Field Validation', () => {
    it('should be invalid when empty', () => {
      const phone = component.contactForm.get('phone');
      expect(phone?.valid).toBe(false);
      expect(phone?.hasError('required')).toBe(true);
    });

    it('should be valid with phone number', () => {
      const phone = component.contactForm.get('phone');
      phone?.setValue('+30 691 234 5678');
      expect(phone?.valid).toBe(true);
    });

    it('should be valid with various phone formats', () => {
      const phone = component.contactForm.get('phone');
      const validFormats = [
        '+30 691 234 5678',
        '691 234 5678',
        '(691) 234-5678',
        '+30-691-234-5678'
      ];

      validFormats.forEach(format => {
        phone?.setValue(format);
        expect(phone?.valid).toBe(true);
      });
    });

    it('should be invalid with letters', () => {
      const phone = component.contactForm.get('phone');
      phone?.setValue('abc123');
      expect(phone?.valid).toBe(false);
      expect(phone?.hasError('pattern')).toBe(true);
    });
  });

  describe('Message Field Validation', () => {
    it('should be invalid when empty', () => {
      const message = component.contactForm.get('message');
      expect(message?.valid).toBe(false);
      expect(message?.hasError('required')).toBe(true);
    });

    it('should be invalid with less than 10 characters', () => {
      const message = component.contactForm.get('message');
      message?.setValue('Short');
      expect(message?.valid).toBe(false);
      expect(message?.hasError('minlength')).toBe(true);
    });

    it('should be valid with 10+ characters', () => {
      const message = component.contactForm.get('message');
      message?.setValue('This is a valid message with enough content.');
      expect(message?.valid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should not submit when form is invalid', () => {
      spyOn(window, 'alert');
      component.onSubmit();
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should submit when form is valid', () => {
      spyOn(window, 'alert');

      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+30 691 234 5678',
        message: 'I am interested in your properties.'
      });

      component.onSubmit();

      expect(window.alert).toHaveBeenCalled();
    });

    it('should reset form after successful submission', () => {
      spyOn(window, 'alert');

      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+30 691 234 5678',
        message: 'I am interested in your properties.'
      });

      component.onSubmit();

      expect(component.contactForm.get('name')?.value).toBeNull();
      expect(component.contactForm.get('email')?.value).toBeNull();
      expect(component.contactForm.get('phone')?.value).toBeNull();
      expect(component.contactForm.get('message')?.value).toBeNull();
    });

    it('should show contact info in alert', () => {
      spyOn(window, 'alert');

      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+30 691 234 5678',
        message: 'I am interested in your properties.'
      });

      component.onSubmit();

      const alertCall = (window.alert as jasmine.Spy).calls.mostRecent().args[0];
      expect(alertCall).toContain(component.contactInfo.phone);
      expect(alertCall).toContain(component.contactInfo.email);
    });
  });

  describe('Error Messages', () => {
    it('should return required error message', () => {
      const message = component.getErrorMessage('name');
      expect(message).toContain('required');
    });

    it('should return email error message', () => {
      const email = component.contactForm.get('email');
      email?.setValue('invalid');
      email?.markAsTouched();

      const message = component.getErrorMessage('email');
      expect(message).toContain('valid email');
    });

    it('should return minlength error message', () => {
      const name = component.contactForm.get('name');
      name?.setValue('A');
      name?.markAsTouched();

      const message = component.getErrorMessage('name');
      expect(message).toContain('Minimum');
    });

    it('should return pattern error message for phone', () => {
      const phone = component.contactForm.get('phone');
      phone?.setValue('abc');
      phone?.markAsTouched();

      const message = component.getErrorMessage('phone');
      expect(message).toContain('valid phone number');
    });
  });

  describe('Rendering', () => {
    it('should render section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('.contact');
      expect(section).toBeTruthy();
    });

    it('should render section title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.contact__title');
      expect(title?.textContent).toContain('Get in Touch');
    });

    it('should render form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('.contact-form');
      expect(form).toBeTruthy();
    });

    it('should render all form fields', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const fields = compiled.querySelectorAll('.contact-form__field');
      expect(fields.length).toBe(4);
    });

    it('should render submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.contact-form__submit');
      expect(button?.textContent).toContain('Send Message');
    });

    it('should disable submit button when form invalid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.contact-form__submit') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should enable submit button when form valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+30 691 234 5678',
        message: 'I am interested in your properties.'
      });
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.contact-form__submit') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should render contact info section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoContainer = compiled.querySelector('.contact__info-container');
      expect(infoContainer).toBeTruthy();
    });

    it('should render contact info items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.contact-info__item');
      expect(items.length).toBe(3); // phone, email, address
    });

    it('should render phone link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector(`a[href="${component.contactInfo.phoneLink}"]`);
      expect(phoneLink).toBeTruthy();
    });

    it('should render email link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailLink = compiled.querySelector(`a[href="mailto:${component.contactInfo.email}"]`);
      expect(emailLink).toBeTruthy();
    });

    it('should render address', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const contact = compiled.querySelector('.contact');
      expect(contact?.textContent).toContain(component.contactInfo.address);
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
      expect(section?.getAttribute('id')).toBe('contact');
    });

    it('should have h2 heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
    });

    it('should have aria-labels on inputs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const inputs = compiled.querySelectorAll('input[aria-label], textarea[aria-label]');
      expect(inputs.length).toBeGreaterThan(0);
    });

    it('should have aria-hidden on decorative icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('mat-icon[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});
