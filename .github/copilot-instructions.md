# SvJs AI Coding Guidelines

## Overview
SvJs is a lightweight, object-oriented library for generative SVG art. It provides a thin wrapper over the SVG DOM API with chainable methods and utility functions for creative coding.

## Architecture
- **SvJs class** (`src/sv.js`): Core SVG element wrapper with chainable DOM manipulation methods
- **Gen object** (`src/gen.js`): Static utility functions for generative art (randomness, math helpers)
- **Noise class** (`src/noise.js`): 2D Perlin noise implementation
- **Entry point** (`src/index.js`): Exports all modules

## Key Patterns
- **Chainable API**: All SvJs methods return `this` or the created child element for fluent interfaces
- **Element Creation**: Use `create(elementName)` to generate and append SVG child elements
- **Generative Utils**: Leverage `Gen` for probability (`Gen.chance()`), interpolation (`Gen.interp()`), and distributions (`Gen.gaussian()`, `Gen.pareto()`)
- **Noise Integration**: Instantiate `Noise` once and call `get(x, y)` for procedural values
- **DOM Integration**: Use `addTo(node)` to append to HTML/SVG containers

## Development Workflow
- **Build**: Run `npm run build` to generate minified bundle in `dist/` using Parcel
- **Watch Mode**: Use `npm start` for development with auto-rebuild
- **Clean**: Execute `npm run clean` to remove build artifacts
- **Testing**: No formal tests; validate by creating generative sketches and inspecting SVG output

## Code Examples
```javascript
// Create SVG with generative circle pattern
const svg = new SvJs('svg').addTo(document.body);
const noise = new Noise();

for (let i = 0; i < 100; i++) {
  if (Gen.chance(30)) {  // 30% chance
    const circle = svg.create('circle');
    circle.element.setAttribute('cx', Gen.map(noise.get(i * 0.1), -1, 1, 0, 400));
    circle.element.setAttribute('cy', Gen.map(noise.get(i * 0.1, 0.5), -1, 1, 0, 400));
    circle.element.setAttribute('r', Gen.gaussian(10, 5));
  }
}
```

## Conventions
- Use JSDoc comments for all public methods
- Prefer functional style for Gen utilities (no side effects)
- Cache noise values when possible for performance
- Follow SVG spec naming conventions for element attributes