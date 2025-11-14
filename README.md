# Calendar Component

A flexible and customizable React calendar component built with TypeScript and date-fns.

## Features

- 📅 Full calendar view with month/year navigation
- 🎨 Highly customizable styling (inline styles, CSS classes, or CSS modules)
- ♿ Accessible with ARIA attributes and keyboard navigation
- 🔧 TypeScript support with full type definitions
- 📦 Zero dependencies (except React and date-fns)

## Installation

```bash
npm install
```

## Basic Usage

```tsx
import { Calendar } from './components';

function App() {
  return <Calendar date={new Date()} />;
}
```

## Props

### CalendarProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `date` | `Date \| string` | Yes | - | Initial date to display and select |
| `styles` | `CalendarStyles` | No | - | Inline styles for calendar elements |
| `classNames` | `CalendarClassNames` | No | - | Custom CSS class names |
| `customStyles` | `CustomStyles` | No | - | CSS module class names |
| `useDefaultStyles` | `boolean` | No | `true` | Whether to use default styles |

### CalendarStyles

Object with optional CSS properties for each calendar element:

```typescript
{
  container?: CSSProperties;
  navigation?: CSSProperties;
  navButton?: CSSProperties;
  caption?: CSSProperties;
  calendar?: CSSProperties;
  weekday?: CSSProperties;
  day?: CSSProperties;
  selected?: CSSProperties;
  faded?: CSSProperties;
}
```

### CalendarClassNames

Object with optional class name strings for each calendar element:

```typescript
{
  container?: string;
  navigation?: string;
  navButton?: string;
  caption?: string;
  calendar?: string;
  weekday?: string;
  day?: string;
  selected?: string;
  faded?: string;
}
```

## Examples

### 1. Default Calendar

The simplest usage with default dark theme styling:

```tsx
import { Calendar } from './components';

function DefaultCalendar() {
  return <Calendar date={new Date()} />;
}
```

### 2. Inline Styles

Customize the calendar using inline styles:

```tsx
import { Calendar } from './components';

const inlineStyles = {
  container: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  caption: {
    color: '#111827',
    fontWeight: 600,
  },
  day: {
    color: '#374151',
  },
  selected: {
    backgroundColor: '#064e3b',
    color: '#ffffff',
    fontWeight: 600,
  },
};

function InlineStyledCalendar() {
  return (
    <Calendar 
      date={new Date()} 
      styles={inlineStyles}
    />
  );
}
```

### 3. CSS Class Names

Use custom CSS classes for styling:

```tsx
import { Calendar } from './components';
import './custom-calendar.css';

const classNameStyles = {
  container: 'light-theme-container',
  caption: 'light-theme-caption',
  day: 'light-theme-day',
  selected: 'light-theme-selected',
};

function ClassNameStyledCalendar() {
  return (
    <Calendar 
      date={new Date()} 
      classNames={classNameStyles}
    />
  );
}
```

**custom-calendar.css:**
```css
.light-theme-container {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.light-theme-caption {
  color: #111827;
  font-weight: 600;
}

.light-theme-day {
  color: #374151;
}

.light-theme-day:hover {
  background-color: #e5e7eb;
}

.light-theme-selected {
  background-color: #064e3b;
  color: #ffffff;
  font-weight: 600;
}
```

### 4. CSS Modules

Use CSS modules for scoped styling:

```tsx
import { Calendar } from './components';
import customModuleStyles from './custom-module.module.css';

const customModuleClassNames = {
  container: customModuleStyles.container,
  caption: customModuleStyles.caption,
  day: customModuleStyles.day,
  selected: customModuleStyles.selected,
  faded: customModuleStyles.faded,
  navButton: customModuleStyles.navButton,
};

function CustomModuleStyledCalendar() {
  return (
    <Calendar 
      date={new Date()} 
      customStyles={customModuleClassNames}
    />
  );
}
```

**custom-module.module.css:**
```css
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
}

.caption {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.day {
  color: #ffffff;
}

.day:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.selected {
  background-color: #ffffff;
  color: #4c1d95;
  font-weight: 700;
}

.faded {
  color: rgba(255, 255, 255, 0.5);
}

.navButton {
  color: #ffffff;
}

.navButton:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
```

### 5. Fully Custom (No Default Styles)

Completely replace default styles with your own:

```tsx
import { Calendar } from './components';
import customStyles from './custom-styles.module.css';

function FullyCustomCalendar() {
  return (
    <Calendar 
      date={new Date()} 
      customStyles={customStyles}
      useDefaultStyles={false}
    />
  );
}
```

### 6. Mixed Approach

Combine inline styles, class names, and CSS modules:

```tsx
import { Calendar } from './components';
import './mixed-styles.css';

const mixedStyles = {
  container: {
    backgroundColor: '#ffffff',
    border: '2px solid #f3f4f6',
  },
  caption: {
    fontSize: '18px',
  },
};

const mixedClassNames = {
  day: 'custom-hover-effect',
  caption: 'custom-caption-style',
};

function MixedStyledCalendar() {
  return (
    <Calendar 
      date={new Date()} 
      styles={mixedStyles}
      classNames={mixedClassNames}
    />
  );
}
```

**mixed-styles.css:**
```css
.custom-hover-effect:hover {
  background-color: #fef3c7;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

.custom-caption-style {
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

### 7. Date String Input

You can pass a date as a string:

```tsx
import { Calendar } from './components';

function StringDateCalendar() {
  return <Calendar date="2024-01-15" />;
}
```

### 8. Controlled Calendar

Use state to control the calendar date:

```tsx
import { useState } from 'react';
import { Calendar } from './components';

function ControlledCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Calendar 
        date={selectedDate}
        styles={{
          container: { marginBottom: '1rem' }
        }}
      />
      <p>Selected: {selectedDate.toLocaleDateString()}</p>
    </div>
  );
}
```

## Project Structure

```
src/
├── components/
│   ├── Calendar/              # Main calendar component
│   │   ├── Calendar.tsx
│   │   ├── Calendar.module.css
│   │   ├── Calendar.test.tsx
│   │   ├── CalendarDayCell/   # Day cell component
│   │   └── CalendarNavigation/ # Navigation component
│   ├── hooks/
│   │   └── useCalendar/       # Calendar hook
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── index.ts               # Main export
├── main.tsx
└── ...
```

## Type Exports

```typescript
import { 
  Calendar,
  CalendarProps,
  CalendarStyles,
  CalendarClassNames,
  CustomStyles,
  generateCalendarWeeks,
  WEEKDAYS,
  useCalendar
} from './components';
```

## Utilities

### generateCalendarWeeks

Generate calendar weeks for a given month:

```typescript
import { generateCalendarWeeks } from './components';

const weeks = generateCalendarWeeks(new Date(2024, 0)); // January 2024
// Returns: Date[][]
```

### WEEKDAYS

Array of weekday abbreviations:

```typescript
import { WEEKDAYS } from './components';
// ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
```

### useCalendar Hook

Use the calendar hook directly for custom implementations:

```typescript
import { useCalendar } from './components';

function CustomCalendar() {
  const { selectedDate, displayMonth, setDisplayMonth, handleDateClick } = 
    useCalendar(new Date());

  // Custom implementation
  return (
    // Your custom calendar UI
  );
}
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

The calendar component includes tests using Vitest and React Testing Library.

## License

MIT

