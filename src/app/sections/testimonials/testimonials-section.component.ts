import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss'
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Papadopoulos',
      role: 'Homeowner',
      comment: 'Christiano Immobiliare helped us find our dream apartment in Kolonaki. Their attention to detail and knowledge of renovated properties made all the difference. Highly recommended!',
      rating: 5
    },
    {
      id: '2',
      name: 'John Anderson',
      role: 'Property Investor',
      comment: 'Professional service from start to finish. They showed us only quality properties that matched our criteria. The renovation standards are exceptional.',
      rating: 5
    },
    {
      id: '3',
      name: 'Sofia Dimitriou',
      role: 'First-time Buyer',
      comment: 'As a first-time buyer, I appreciated their patience and expertise. They guided me through every step and helped me find a beautiful renovated home in Pagrati.',
      rating: 5
    }
  ];

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
