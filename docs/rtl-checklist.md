# RTL Checklist

## Global Setup
- [x] `<html lang="he" dir="rtl">` set in layout.tsx
- [x] Font: Rubik (supports Hebrew natively)

## Layout Direction
- [x] Flexbox `justify-between` works bidirectionally
- [x] Grid layouts are direction-agnostic
- [x] `text-start` / `text-end` used instead of `text-left` / `text-right`
- [x] `insetInlineStart` used for positioned elements (temperature bar)
- [x] `ps-` / `pe-` preferred over `pl-` / `pr-` where directional

## Numbers & Units
- [x] Temperature values use `dir="ltr"` to keep digits in correct order
- [x] Percentage and unit strings display correctly
- [x] Time strings formatted with `he-IL` locale

## Icons
- [x] Lucide icons are direction-neutral (no directional arrows)
- [x] Icon placement alongside text respects reading order

## Navigation
- [x] Bottom nav labels read right-to-left
- [x] Swipe gestures inverted for RTL context
- [x] Screen transitions don't assume LTR direction

## Interactive Elements
- [x] Search input has explicit dir="rtl" (inherited from html)
- [x] Autocomplete dropdown aligns correctly
- [x] Toggle switch animation works in RTL (absolute positioning)
- [x] Swipe-to-delete direction works correctly

## Known Considerations
- Gradient directions (`bg-gradient-to-br`) are visual, not directional
- Weather data numbers always LTR (natural for numerals)
- Section headers with Latin text (°C, °F) display correctly inline
