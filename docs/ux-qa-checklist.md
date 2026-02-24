# UX Quality Assurance Checklist

## Spacing Consistency
- [x] Card padding: `p-4` (standard), `p-6` (hero only)
- [x] Section gaps: `gap-4` between cards
- [x] List item padding: `py-3` consistent
- [x] Inner spacing: `gap-2.5` to `gap-3` for content

## Typography Consistency
- [x] Screen titles: `text-title-lg`
- [x] Section headers: `text-caption uppercase tracking-wider`
- [x] Body text: `text-body`
- [x] Descriptions: `text-caption`
- [x] Hero temperature: `text-display`

## State Coverage

### Weather Screen
- [x] Loading: Full skeleton with shimmer
- [x] Error: ErrorState with retry button (network/generic variants)
- [x] Empty: N/A (always has default city)
- [x] Success: Full weather display
- [x] Refreshing: Refresh icon spins, data stays visible

### Cities Screen
- [x] Loading search: Spinner in search bar
- [x] No results: SearchX icon + message
- [x] Search error: Error message in dropdown
- [x] Empty city list: EmptyState with icon + description
- [x] Duplicate city: Toast notification
- [x] City added: Toast confirmation
- [x] City removed: Toast confirmation

### Settings Screen
- [x] All settings instant-save
- [x] Unit change: Toast feedback
- [x] Toggle states clearly visible

## RTL Correctness
- [x] Text alignment follows RTL flow
- [x] Numbers displayed LTR where appropriate
- [x] Icon placement correct
- [x] Swipe direction correct

## Overflow Issues
- [x] City names truncated with `truncate`
- [x] Weather descriptions truncated
- [x] Horizontal scroll on hourly forecast
- [x] `overflow-x-hidden` on body

## Accessibility
- [x] Skip link to main content
- [x] All buttons have `aria-label`
- [x] Toggle switches have `role="switch"` + `aria-checked`
- [x] Lists have `role="list"` + `role="listitem"`
- [x] Navigation has `role="navigation"` + `aria-label`
- [x] Active tab has `aria-current="page"`
- [x] Focus-visible styles on all interactive elements
- [x] `prefers-reduced-motion` respected
- [x] Loading states have `role="status"`
- [x] Error states have `role="alert"`
- [x] Icon-only buttons have descriptive aria-labels
- [x] Search input has associated label (`sr-only`)
- [x] Keyboard-accessible delete button on city rows
- [x] City indicators are clickable buttons with aria-label

## Responsive (Verified Breakpoints)
- [x] 320px: Content fits, no overflow
- [x] 375px: Standard mobile layout
- [x] 390px: Comfortable spacing
- [x] 768px+: `max-w-lg` centered container
