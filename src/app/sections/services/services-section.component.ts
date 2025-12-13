import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  services: Service[] = [
    {
      icon: 'sell',
      title: 'Property Sales',
      description: 'Find your dream home from our curated selection of premium renovated properties in Athens. Expert guidance throughout the buying process.'
    },
    {
      icon: 'vpn_key',
      title: 'Property Rentals',
      description: 'Discover quality rental properties renovated to the highest standards. Flexible terms and transparent processes.'
    },
    {
      icon: 'construction',
      title: 'Renovation Expertise',
      description: 'All our properties are expertly renovated with attention to detail, modern amenities, and timeless design.'
    }
  ];
}
