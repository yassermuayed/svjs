# SVJS - Scalable Vector JavaScript

SVJS is a lightweight TypeScript library for generative SVG art, providing a chainable API for SVG manipulation plus utilities for procedural generation.

## Architecture Overview

**Three core modules exported from `src/index.ts`:**
- `SvJs` - Main SVG element wrapper with chainable methods
- `Gen` - Static utility functions for generative art
- `Noise` - Perlin noise implementation with caching

**Key Design Patterns:**
- **Chainable API**: All `SvJs` methods return `this` for fluent interfaces
- **Namespace Handling**: SVG elements created with proper `http://www.w3.org/2000/svg` namespace
- **Caching**: Noise class caches gradients and values for performance
- **Type Safety**: Full TypeScript with strict mode, targeting ES2020

## Core Workflows

**Development:**
```bash
npm run start    # Parcel watch mode for development
npm run typecheck # TypeScript validation only
```

**Production Build:**
```bash
npm run build    # Clean + bundle + generate types
```

**Build outputs to `dist/`:**
- `svjs.min.js` - Minified bundle with all modules
- `index.d.ts` - TypeScript declarations

## API Patterns & Conventions

**SvJs Class Usage:**
```typescript
// Create and chain SVG elements
const svg = new SvJs('svg').set({ width: 1000, height: 1000 });
const rect = svg.create('rect').set({ x: 100, y: 100, width: 200, height: 200 });

// Method chaining is mandatory for fluent API
rect.moveTo(500, 500).rotate(45).animate(keyframes, options);
```

**Gen Utilities:**
```typescript
// Static functions for generative values
const x = Gen.map(Gen.gaussian(), -3, 3, 0, 1000);
const color = Gen.random(['red', 'blue', 'green']);
const shouldDraw = Gen.chance(30); // 30% chance
```

**Noise Generation:**
```typescript
const noise = new Noise();
// Precompute for performance if coordinate range is known
noise.precomputeGradients(0, 1000, 0, 1000);
const value = noise.get(x, y); // Returns -1 to 1
```

**Special Methods:**
- `create()` - Factory method that appends and returns new child elements
- `createCurve()` - Generates smooth bezier paths from point arrays
- `createFilter()` - Adds filters to `<defs>` with proper attributes
- `moveTo()` - Centers elements by their bounding box
- `getCentre()` - Returns {x, y} center coordinates

**Filter/Gradient/Pattern Creation:**
```typescript
// Always create within main SVG element
const filter = svg.createFilter('blur-filter');
const grad = svg.createGradient('linear', 'my-gradient');
const pattern = svg.createPattern('my-pattern');
```

## Code Style Guidelines

**TypeScript:**
- Strict mode enabled
- JSDoc comments required for all public APIs
- Private methods use `#` prefix (ES2022 private fields)
- Generic constraints for SVG element types

**SVG Handling:**
- Elements validated on creation
- Automatic `<defs>` management for filters/gradients/patterns
- Namespace attributes added automatically to root `<svg>`

**Performance Considerations:**
- Noise caching enabled by default
- `clearCache()` and `clearGradients()` available when needed
- Precompute gradients for known coordinate ranges

**Error Handling:**
- Throws on invalid SVG element names
- Validates filter/gradient creation on root SVG only
- Type-safe event listeners with SVG element constraints

## Common Patterns

**Generative Art Setup:**
```typescript
const svg = new SvJs('svg').set({ viewBox: '0 0 1000 1000' });
const noise = new Noise();

for (let i = 0; i < 100; i++) {
  const x = Gen.random(0, 1000);
  const y = Gen.random(0, 1000);
  const n = noise.get(x * 0.01, y * 0.01);
  const size = Gen.map(n, -1, 1, 5, 50);
  
  svg.create('circle')
    .set({ cx: x, cy: y, r: size, fill: Gen.random(['#f00', '#0f0', '#00f']) });
}
```

**Animation Workflow:**
```typescript
const circle = svg.create('circle').set({ cx: 500, cy: 500, r: 50 });
circle.animate(
  { transform: ['scale(1)', 'scale(2)', 'scale(1)'] },
  { duration: 2000, iterations: Infinity }
);
```

**Curve Generation:**
```typescript
const points: [number, number][] = [[0,0], [100,200], [300,100], [400,300]];
svg.createCurve(points, 0.8); // curveFactor 0-1
```

## Build & Deployment Notes

- Uses Parcel bundler with TypeScript transformer
- Dual package output: minified JS + type declarations
- CDN-ready via jsdelivr: `https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js`
- Tree-shakable imports: `import { SvJs, Gen } from 'svjs'`

## Key Files Reference

- `src/sv.ts` - Core SvJs class with SVG manipulation methods
- `src/gen.ts` - Generative utility functions
- `src/noise.ts` - Perlin noise implementation
- `src/index.ts` - Module exports
- `dist/` - Build outputs (generated)