# Design Tokens

## Colors

### Glass Surfaces
| Token | Value | Usage |
|-------|-------|-------|
| `glass-light` | `rgba(255,255,255,0.10)` | Subtle cards, metric cards |
| `glass` | `rgba(255,255,255,0.15)` | Default cards |
| `glass-strong` | `rgba(255,255,255,0.20)` | Dropdowns, prominent surfaces |

### Metric Colors
| Token | Value | Usage |
|-------|-------|-------|
| `metric-humidity` | `#93c5fd` | Humidity icon |
| `metric-wind` | `#5eead4` | Wind icon |
| `metric-rain` | `#a5b4fc` | Precipitation icon |
| `metric-tempHigh` | `#fbbf24` | Max temperature |
| `metric-tempLow` | `#60a5fa` | Min temperature |

### Text Opacity Scale
| Usage | Class | Contrast |
|-------|-------|----------|
| Primary | `text-white` | WCAG AAA |
| Secondary | `text-white/80` | WCAG AA |
| Tertiary | `text-white/60` | WCAG AA on dark |
| Muted | `text-white/50` | Section headers |
| Subtle | `text-white/40` | Descriptions |
| Faint | `text-white/35` | Sub-descriptions |
| Ghost | `text-white/25` | Hints |

## Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-display` | 4.5rem | 200 | Temperature hero |
| `text-title-lg` | 1.375rem | 700 | Screen titles, city name |
| `text-title` | 1.125rem | 600 | Section titles |
| `text-body` | 0.875rem | 400 | Body text, labels |
| `text-caption` | 0.75rem | 400 | Descriptions, section headers |
| `text-micro` | 0.625rem | 500 | Nav labels, badges |

## Spacing & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-card` | 1rem | Standard cards, buttons |
| `rounded-card-lg` | 1.25rem | Hero cards, nav |
| `rounded-pill` | 9999px | Toggle, indicators |

## Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `z-overlay` | 30 | Overlays |
| `z-dropdown` | 40 | Search autocomplete |
| `z-nav` | 50 | Bottom navigation |
| `z-toast` | 60 | Toast notifications |

## Animation

Defined in `src/shared/lib/motion.ts`:

| Name | Config | Usage |
|------|--------|-------|
| `springSnappy` | stiffness: 400, damping: 28 | Nav indicator, indicators |
| `springGentle` | stiffness: 300, damping: 25 | List items |
| `springBouncy` | stiffness: 500, damping: 30 | Toggles |
| `screenTransition` | 250ms ease-out | Screen changes |
| `cardTransition` | 350ms ease-out | Card entrances |
