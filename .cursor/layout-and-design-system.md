# URL Shortener Layout Design System

## Overview
Simple, clean layout guidelines for a URL shortener application focusing on minimal complexity, user experience, and consistent spacing.

## Container Standards
- **Primary Container**: Use `max-w-2xl mx-auto` (max-width: 672px) for main content areas
- **Full Width**: Use `max-w-4xl mx-auto` (max-width: 896px) for data tables and lists
- **Padding**: Apply consistent `px-4` (16px) horizontal padding on all containers
- **Vertical Spacing**: Use `py-6` (24px) for main content sections

## Grid & Spacing System
- **Base Unit**: 4px (Tailwind's default spacing scale)
- **Common Spacing**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Section Gaps**: Use `space-y-6` (24px) between major sections
- **Form Elements**: Use `space-y-4` (16px) between form fields
- **Button Groups**: Use `space-x-3` (12px) between related buttons

## Layout Patterns

### Main Application Layout
```tsx
<div className="min-h-screen bg-gray-50">
  <header className="bg-white shadow-sm">
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Header content */}
    </div>
  </header>
  
  <main className="py-6">
    <div className="max-w-2xl mx-auto px-4">
      {/* Main content */}
    </div>
  </main>
</div>
```

### URL Shortener Form
```tsx
<div className="bg-white rounded-lg shadow p-6 space-y-4">
  {/* Form content with consistent spacing */}
</div>
```

### Results/History Lists
```tsx
<div className="max-w-4xl mx-auto px-4">
  <div className="bg-white rounded-lg shadow overflow-hidden">
    {/* List items with consistent padding */}
  </div>
</div>
```

## Component Sizing
- **Input Fields**: Minimum height `h-10` (40px) with `px-3` padding
- **Buttons**: Primary `h-10 px-4`, Secondary `h-8 px-3`
- **Cards**: Standard padding `p-6`, Compact `p-4`
- **Icons**: Use `w-5 h-5` (20px) for inline icons, `w-6 h-6` (24px) for standalone

## Responsive Behavior
- **Mobile**: Stack elements vertically, maintain `px-4` padding
- **Tablet**: Use same containers, may show side-by-side elements
- **Desktop**: Centered content with generous whitespace around containers

## Visual Consistency
- **Border Radius**: Use `rounded-lg` (8px) for cards and inputs
- **Shadows**: `shadow-sm` for subtle elevation, `shadow` for cards
- **Colors**: Stick to gray scale with single accent color for primary actions
- **Typography**: Use default Tailwind font stack with consistent text sizes

## Key Principles for URL Shortener
1. **Simplicity First**: Avoid complex layouts, focus on the core functionality
2. **Scannable Content**: Use plenty of whitespace and clear hierarchy
3. **Mobile-Friendly**: Ensure touch targets are at least 44px (use `h-11` minimum)
4. **Fast Loading**: Minimize layout complexity for quick rendering
5. **Accessibility**: Maintain proper contrast and semantic HTML structure

## Common Layouts

### Landing Page
- Single column, centered content
- Hero section with URL input form
- Optional features list or stats below

### Dashboard/History
- Header with user info and actions
- Search/filter controls
- List of shortened URLs with actions
- Pagination if needed

### Analytics Page (if applicable)
- Card-based layout for metrics
- Simple charts or graphs
- Consistent spacing between data sections

## Implementation Notes for Cursor AI
- Use these class patterns consistently across components
- Prefer composition over complex nested layouts
- Keep component structure predictable and scannable
- Use semantic HTML elements with Tailwind classes
- Maintain consistent naming conventions for CSS classes