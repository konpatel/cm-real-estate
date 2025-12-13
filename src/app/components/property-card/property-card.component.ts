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

  onContactClick(): void {
    this.contactClick.emit(this.property.id);
  }
}
