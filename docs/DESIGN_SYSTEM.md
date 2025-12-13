# Christiano Immobiliare Design System

**Version**: 1.0
**Last Updated**: 2025-12-06
**Status**: Active (Placeholder Colors - Awaiting Logo)

---

## Overview

This design system defines the visual language for Christiano Immobiliare's web presence, establishing a premium, sophisticated aesthetic that reflects the brand's focus on quality renovated properties in Athens.

**Brand Keywords**: Royal, Serious, Premium, Sophisticated, Trustworthy

---

## Color Palette

### Current Status
⚠️ **IMPORTANT**: The current color values are high-quality placeholders designed to achieve the "royal and serious" aesthetic. These should be replaced with exact colors extracted from `/public/logo.svg` when the logo file is available.

### Primary Colors (Brown)
Rich, warm brown tones that convey stability, reliability, and sophistication.

| Shade | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| 50 | `#f5f1ec` | `--color-primary-50` | Backgrounds, very light accents |
| 100 | `#e6dccf` | `--color-primary-100` | Light backgrounds |
| 200 | `#d9cdb8` | `--color-primary-200` | Borders, dividers |
| 300 | `#b39a76` | `--color-primary-300` | Light text, disabled states |
| 400 | `#9f8560` | `--color-primary-400` | Medium emphasis |
| 500 | `#8b6f47` | `--color-primary-500` | **PRIMARY** - Main brand color |
| 600 | `#6e5838` | `--color-primary-600` | Hover states |
| 700 | `#5a4629` | `--color-primary-700` | Active states, borders |
| 800 | `#3d2e1f` | `--color-primary-800` | Dark backgrounds |
| 900 | `#2b1f15` | `--color-primary-900` | **DARKEST** - Header/Footer |

### Accent Colors (Gold)
Elegant gold tones that add luxury and highlight important elements.

| Shade | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| 50 | `#fef9e7` | `--color-accent-50` | Backgrounds, very light accents |
| 100 | `#fcf3c4` | `--color-accent-100` | Light backgrounds |
| 200 | `#f9e89d` | `--color-accent-200` | Borders, dividers |
| 300 | `#e5c967` | `--color-accent-300` | Light accents |
| 400 | `#dcbc4a` | `--color-accent-400` | Medium emphasis |
| 500 | `#d4af37` | `--color-accent-500` | **ACCENT** - CTAs, highlights |
| 600 | `#b8941f` | `--color-accent-600` | Hover states |
| 700 | `#937717` | `--color-accent-700` | Active states |
| 800 | `#6e5a0f` | `--color-accent-800` | Dark accents |
| 900 | `#4a3d0a` | `--color-accent-900` | Darkest accents |

### Neutral Colors
Grayscale for text, backgrounds, and UI elements.

| Shade | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| 50 | `#fafafa` | `--color-neutral-50` | White backgrounds |
| 100 | `#f5f5f5` | `--color-neutral-100` | Light gray |
| 200 | `#e5e5e5` | `--color-neutral-200` | Borders |
| 300 | `#d4d4d4` | `--color-neutral-300` | Disabled |
| 400 | `#a3a3a3` | `--color-neutral-400` | Placeholders |
| 500 | `#737373` | `--color-neutral-500` | Secondary text |
| 600 | `#525252` | `--color-neutral-600` | Body text (light bg) |
| 700 | `#404040` | `--color-neutral-700` | Headings |
| 800 | `#262626` | `--color-neutral-800` | Dark text |
| 900 | `#171717` | `--color-neutral-900` | **DARKEST** - Primary text |

---

## Typography

### Font Families

**Headings** (Playfair Display)
- Serif font that conveys elegance and sophistication
- Variable: `--font-primary: 'Playfair Display', Georgia, serif`
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

**Body Text** (Inter)
- Clean, modern sans-serif for excellent readability
- Variable: `--font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Type Scale (Fluid Typography)

| Element | CSS Variable | Fluid Range | Usage |
|---------|--------------|-------------|-------|
| Base | `--font-size-base` | 1rem → 1.125rem | Body text |
| XL | `--font-size-xl` | 1.25rem → 1.75rem | Large text |
| 2XL | `--font-size-2xl` | 1.5rem → 2.25rem | Section headings |
| 3XL | `--font-size-3xl` | 1.875rem → 3rem | Page headings |
| 4XL | `--font-size-4xl` | 2.25rem → 3.75rem | Hero headings |

---

## Spacing

Using an 8px base unit for consistent spacing.

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| 4 | 1rem (16px) | `--space-4` | Small gaps |
| 6 | 1.5rem (24px) | `--space-6` | Medium gaps |
| 8 | 2rem (32px) | `--space-8` | Large gaps |
| 12 | 3rem (48px) | `--space-12` | Section padding |
| 16 | 4rem (64px) | `--space-16` | Large sections |
| 24 | 6rem (96px) | `--space-24` | Extra large sections |

---

## Elevation (Shadows)

Premium depth system for cards and elevated elements.

| Level | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Small | `--shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle depth |
| Medium | `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | Cards |
| Large | `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Modals, dropdowns |
| Extra Large | `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | Overlays |
| Gold Glow | `--shadow-gold` | `0 0 20px rgba(212, 175, 55, 0.3)` | Special highlights |

---

## Border Radius

| Size | CSS Variable | Value | Usage |
|------|--------------|-------|-------|
| Medium | `--radius-md` | 0.375rem (6px) | Buttons, inputs |
| Large | `--radius-lg` | 0.5rem (8px) | Cards |
| Extra Large | `--radius-xl` | 0.75rem (12px) | Large cards, modals |

---

## Transitions

| Type | CSS Variable | Value | Usage |
|------|--------------|-------|-------|
| Base | `--transition-base` | 250ms cubic-bezier(0.4, 0, 0.2, 1) | Hover, focus states |
| Elegant | `--transition-elegant` | 500ms cubic-bezier(0.4, 0, 0.1, 1) | Modal animations |

---

## Usage Guidelines

### Colors

**Primary (Brown)**
- Use for: Header backgrounds, footer, main navigation, primary text
- **Do**: Use darker shades (700-900) for backgrounds
- **Don't**: Use primary colors for error states or warnings

**Accent (Gold)**
- Use for: CTAs, links (hover), highlights, special elements
- **Do**: Use sparingly to draw attention
- **Don't**: Overuse; gold should feel special

**Neutrals**
- Use for: Body text, borders, disabled states
- **Do**: Maintain sufficient contrast (4.5:1 minimum)
- **Don't**: Use pure black (#000)

### Typography

**Headings**
- Always use Playfair Display
- Use appropriate weight (600-700 for emphasis)
- Maintain hierarchy (h1 > h2 > h3)

**Body Text**
- Use Inter for all body copy
- Default weight: 400
- Use 500-600 for emphasis
- Line height: 1.6 minimum

### Spacing

- Use 8px base unit for all spacing
- Maintain consistent vertical rhythm
- Use spacing tokens, not arbitrary values

---

## Component Patterns

### Buttons

**Primary CTA**
```scss
background: var(--color-accent-500);
color: var(--color-primary-900);
&:hover {
  background: var(--color-accent-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}
```

**Secondary Button**
```scss
background: transparent;
border: 2px solid var(--color-primary-500);
color: var(--color-primary-500);
&:hover {
  background: var(--color-primary-500);
  color: white;
}
```

### Cards

```scss
background: white;
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
transition: var(--transition-base);
&:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

### Links

```scss
color: var(--color-neutral-700);
text-decoration: none;
&:hover {
  color: var(--color-accent-500);
}
```

---

## Accessibility

### Color Contrast

- **Body text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Clear focus states

### Focus States

```scss
&:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}
```

---

## Implementation

### CSS Variables
All design tokens are defined as CSS custom properties in `src/styles.scss`

### Tailwind CSS
Tailwind config (`tailwind.config.js`) extends theme with design tokens

### Angular Material
Custom Material theme uses brown/gold palettes in `src/styles.scss`

---

## Future Updates

When logo.svg is available:
1. Extract exact brown and gold hex codes
2. Update all `--color-primary-*` variables
3. Update all `--color-accent-*` variables
4. Update Material palette definitions
5. Test all components for visual consistency
6. Update this documentation with final colors

---

## Resources

- **Google Fonts**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | [Inter](https://fonts.google.com/specimen/Inter)
- **Material Design**: [Color System](https://material.io/design/color)
- **Tailwind CSS**: [Customization](https://tailwindcss.com/docs/customization)
