import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';

interface QuickLink {
  label: string;
  sectionId: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

/**
 * FooterComponent
 *
 * Professional footer with company info, quick links, and contact details.
 * Three-column layout on desktop, stacked on mobile.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /** Current year for copyright */
  currentYear = new Date().getFullYear();

  /** Company tagline */
  tagline = 'Premium Renovated Properties in Athens';

  /** Contact information from environment */
  contactInfo = {
    phone: environment.contact.phone,
    phoneLink: environment.contact.phoneLink,
    email: environment.contact.email,
    address: environment.contact.address
  };

  /** Quick navigation links */
  quickLinks: QuickLink[] = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Properties', sectionId: 'properties' },
    { label: 'Services', sectionId: 'services' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  /** Social media links (placeholders for future) */
  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' }
  ];

  /**
   * Smooth scroll to a section
   * @param sectionId Section ID to scroll to
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Header height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
