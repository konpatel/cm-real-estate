import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;

  contactInfo = {
    phone: environment.contact.phone,
    phoneLink: environment.contact.phoneLink,
    email: environment.contact.email,
    address: environment.contact.address
  };

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]+$/)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Frontend-only: Show message to user
      alert(`Thank you for your interest! Since this is a demo, please contact us directly:\n\nPhone: ${this.contactInfo.phone}\nEmail: ${this.contactInfo.email}`);
      this.contactForm.reset();
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }

    if (field?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }
}
