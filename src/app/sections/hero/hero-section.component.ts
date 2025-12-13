import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';

/**
 * HeroSectionComponent
 *
 * Landing page hero with headline, value proposition, and CTAs.
 * Full viewport height with background image and overlay.
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  /** Main headline */
  headline = 'Discover Premium Renovated Properties in Athens';

  /** Supporting text */
  subheadline = 'Expertly renovated homes for sale and rent. Your trusted partner in Athens real estate for 5 years.';

  /** Contact phone link */
  contactPhoneLink = environment.contact.phoneLink;

  /**
   * Scroll to a section with smooth animation
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

  /**
   * Navigate to contact (phone)
   */
  callToAction(): void {
    window.location.href = this.contactPhoneLink;
  }
}
