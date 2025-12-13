import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';

interface NavItem {
  label: string;
  sectionId: string;
}

/**
 * HeaderComponent
 *
 * Professional sticky header with logo, navigation, and phone CTA.
 * Includes responsive mobile menu with hamburger icon.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /** Whether page is scrolled (for shadow effect) */
  isScrolled = false;

  /** Whether mobile menu is open */
  isMobileMenuOpen = false;

  /** Current active section */
  activeSection = 'hero';

  /** Navigation menu items */
  navItems: NavItem[] = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Properties', sectionId: 'properties' },
    { label: 'Services', sectionId: 'services' },
    { label: 'About', sectionId: 'about' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  /** Contact information from environment */
  contactPhone = environment.contact.phone;
  contactPhoneLink = environment.contact.phoneLink;

  ngOnInit(): void {
    // Initialize active section detection
    this.detectActiveSection();
  }

  /**
   * Listen to window scroll events
   * Updates isScrolled state for header shadow
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
    this.detectActiveSection();
  }

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

      // Update active section immediately
      this.activeSection = sectionId;

      // Close mobile menu if open
      if (this.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }
  }

  /**
   * Toggle mobile menu open/closed
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Detect which section is currently in view
   * Updates activeSection based on scroll position
   */
  private detectActiveSection(): void {
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (const item of this.navItems) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = item.sectionId;
          break;
        }
      }
    }
  }

  /**
   * Check if a navigation item is active
   * @param sectionId Section ID to check
   * @returns True if section is active
   */
  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
