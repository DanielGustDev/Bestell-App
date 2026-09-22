# Bestell-App

A responsive, single-page web application for browsing retro video games and managing an interactive shopping basket. Built using modern HTML5, vanilla JavaScript, CSS custom properties, and full JSDoc typing.

---

## Features

- **Dynamic Product Rendering:** Product grid dynamically generated from custom JavaScript dataset objects (`database.js`).
- **Interactive Shopping Basket:** Real-time quantity adjustments, automatic subtotal/delivery calculations, and item removal.
- **LocalStorage Persistence:** Remembers user shopping cart state across browser sessions.
- **Modal Dialog Checkout:** Integrated popover modal overlay for seamless order placement feedback.
- **Responsive Design:** Optimized layout for desktop, tablet, and mobile devices with dedicated media query stylesheets.
- **Legal Compliance Pages:** Includes standalone HTML templates for Imprint (`imprint.html`) and Cookie Preferences (`cookies.html`).
- **Clean Architecture & JSDoc:** Modular function structure utilizing HTML string templates, cleanly annotated with JSDoc type definitions.

---

## Tech Stack

- **HTML5:** Semantic markup structure with native HTML dialog/popover elements.
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid layout, custom typography, and mobile-first media queries.
- **JavaScript (ES6+):** Pure Vanilla JavaScript without external dependencies or heavy frameworks.
- **JSDoc & Type Safety:** Comprehensive JSDoc annotations powering VS Code IntelliSense and type checking.

---

## Project Structure

```text
Bestell-App/
├── assets/
│   ├── fonts/         # Custom typography webfonts
│   ├── icons/         # Custom SVG vector icons
│   └── imgs/          # Product image assets
├── scripts/
│   ├── database.js    # Data source & product catalogue objects
│   └── templates.js   # Reusable HTML template literal functions
├── styles/
│   ├── assets.css     # Icon and asset styling definitions
│   ├── basket.css     # Shopping cart component styles
│   ├── fonts.css      # @font-face declarations
│   ├── mobile.css     # Responsive mobile navigation & layouts
│   ├── standards.css  # CSS Reset, base tags, utility classes
│   └── variables.css  # Root color palette, spacing, typography variables
├── cookies.html       # Cookie management page
├── imprint.html       # Legal imprint page (Impressum)
├── index.html         # Main application landing page
├── script.js          # Core app controller, DOM manipulation, LocalStorage logic
└── style.css          # Main stylesheet entry point (@import hub)
```

---

## ⚡ Getting Started

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/danielgust/Bestell-App.git](https://github.com/danielgust/Bestell-App.git)
   ```

2. **Open the application:**
   - Open `index.html` directly in any web browser, or launch it using the VS Code **Live Server** extension for local development.

---
