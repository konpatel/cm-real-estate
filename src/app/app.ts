import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './sections/hero/hero-section.component';
import { PropertiesShowcaseSectionComponent } from './sections/properties-showcase/properties-showcase-section.component';
import { ServicesSectionComponent } from './sections/services/services-section.component';
import { ContactSectionComponent } from './sections/contact/contact-section.component';
import { AboutSectionComponent } from './sections/about/about-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeroSectionComponent, PropertiesShowcaseSectionComponent, ServicesSectionComponent, AboutSectionComponent, ContactSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Christiano Immobiliare';
}
