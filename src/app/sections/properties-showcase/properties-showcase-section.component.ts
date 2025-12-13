import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-properties-showcase-section',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './properties-showcase-section.component.html',
  styleUrl: './properties-showcase-section.component.scss'
})
export class PropertiesShowcaseSectionComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.properties = this.propertyService.getFeaturedProperties();
  }

  onContactProperty(propertyId: string): void {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const offsetTop = contactSection.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}
