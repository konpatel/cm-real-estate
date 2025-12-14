import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @Output() contactClick = new EventEmitter<string>();

  /** Current active image index for carousel */
  currentImageIndex = 0;

  /**
   * Get array of images to display (uses imageUrls if available, otherwise falls back to imageUrl)
   */
  get images(): string[] {
    if (this.property.imageUrls && this.property.imageUrls.length > 0) {
      return this.property.imageUrls;
    }
    return [this.property.imageUrl];
  }

  /**
   * Check if property has multiple images
   */
  get hasMultipleImages(): boolean {
    return this.images.length > 1;
  }

  /**
   * Get currently displayed image URL
   */
  get currentImage(): string {
    return this.images[this.currentImageIndex];
  }

  /**
   * Navigate to next image in carousel
   */
  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Loop back to first image
    }
  }

  /**
   * Navigate to previous image in carousel
   */
  previousImage(event: Event): void {
    event.stopPropagation();
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1; // Loop to last image
    }
  }

  /**
   * Navigate to specific image by index
   */
  goToImage(index: number, event: Event): void {
    event.stopPropagation();
    this.currentImageIndex = index;
  }

  onContactClick(): void {
    this.contactClick.emit(this.property.id);
  }
}
