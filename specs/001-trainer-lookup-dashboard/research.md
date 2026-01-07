# Research: Trainer Lookup Dashboard

**Feature Branch**: `001-trainer-lookup-dashboard`
**Date**: 2026-01-07

## Overview

This document consolidates research findings for implementing the Trainer Lookup Dashboard. All technical unknowns from the plan have been investigated and resolved.

---

## 1. Framework Selection

### Decision: Next.js 14 with App Router

### Rationale
- **Server-side API Routes**: Next.js API routes execute server-side, keeping the Pokemon Selector API key secure and never exposed to the client
- **Vercel Deployment**: Seamless deployment to Vercel (where Pokemon Selector is hosted), ensuring low latency between services
- **React Ecosystem**: Leverages React 18 for component-based UI with hooks for state management
- **TypeScript Support**: First-class TypeScript support for type safety
- **Zero Config**: Built-in CSS, image optimization, and development server

### Alternatives Considered
| Alternative | Rejected Because |
|------------|------------------|
| Create React App + Express | Two separate deployments; more complexity for a single-page app |
| Vite + Separate API | Same issue; requires CORS configuration and separate hosting |
| Plain HTML/CSS/JS | No server-side capability for API key protection without a backend |
| Remix | Viable but less ecosystem support; Next.js is more widely adopted |

---

## 2. Styling Approach

### Decision: Tailwind CSS

### Rationale
- **Rapid Development**: Utility classes enable fast prototyping without context switching
- **Responsive Design**: Built-in responsive breakpoints (`sm:`, `md:`, `lg:`)
- **Consistent Design**: Predefined spacing, colors, and typography scales
- **Small Bundle**: PurgeCSS removes unused styles in production
- **Pokemon Type Colors**: Custom colors easily added to tailwind.config.js

### Alternatives Considered
| Alternative | Rejected Because |
|------------|------------------|
| CSS Modules | More boilerplate; slower for small projects |
| styled-components | Runtime CSS-in-JS adds bundle size; less performant |
| Plain CSS | Harder to maintain consistency; no responsive utilities |

---

## 3. Pokemon Type Color Mapping

### Decision: Custom Tailwind color palette with official Pokemon type colors

### Implementation
```typescript
// constants/pokemon-types.ts
export const POKEMON_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Normal: { bg: 'bg-stone-400', text: 'text-white' },
  Fire: { bg: 'bg-orange-500', text: 'text-white' },
  Water: { bg: 'bg-blue-500', text: 'text-white' },
  Electric: { bg: 'bg-yellow-400', text: 'text-black' },
  Grass: { bg: 'bg-green-500', text: 'text-white' },
  Ice: { bg: 'bg-cyan-300', text: 'text-black' },
  Fighting: { bg: 'bg-red-700', text: 'text-white' },
  Poison: { bg: 'bg-purple-500', text: 'text-white' },
  Ground: { bg: 'bg-amber-600', text: 'text-white' },
  Flying: { bg: 'bg-indigo-300', text: 'text-black' },
  Psychic: { bg: 'bg-pink-500', text: 'text-white' },
  Bug: { bg: 'bg-lime-500', text: 'text-white' },
  Rock: { bg: 'bg-stone-600', text: 'text-white' },
  Ghost: { bg: 'bg-violet-700', text: 'text-white' },
  Dragon: { bg: 'bg-indigo-600', text: 'text-white' },
  Dark: { bg: 'bg-stone-800', text: 'text-white' },
  Steel: { bg: 'bg-slate-400', text: 'text-black' },
  Fairy: { bg: 'bg-pink-300', text: 'text-black' },
};
```

### Rationale
- Uses Tailwind's built-in color palette for consistency
- Maps closely to official Pokemon game type colors
- Includes text color for accessibility (contrast)

---

## 4. API Route Design

### Decision: Single `/api/lookup` route with query parameter

### Request Flow
```
Client                    Next.js API Route              Pokemon Selector API
  |                              |                              |
  |-- GET /api/lookup?name=X -->|                              |
  |                              |-- GET /api/external/trainer  |
  |                              |   Headers: X-API-Key, X-Trainer-Name
  |                              |<-- 200/400/401/404/500 ------|
  |<-- Transformed Response -----|                              |
```

### Rationale
- Single responsibility: one route, one purpose
- Query parameter is simpler than POST body for GET-like semantics
- API key stays server-side in environment variable
- Response transformation standardizes errors for frontend

### Error Mapping
| External API | Internal API | User Message |
|--------------|--------------|--------------|
| 400 | 400 | "Enter a name to search" |
| 401 | 500 | "Unable to connect. Please try again." (hide auth issues) |
| 404 | 404 | "No trainer found with that name..." |
| 500 | 500 | "Unable to connect. Please try again." |

---

## 5. State Management

### Decision: React useState + useReducer for form state

### Rationale
- **No external library needed**: Simple form with 3 states (idle, loading, result/error)
- **useReducer for complex state**: Cleaner than multiple useState for loading/error/data
- **Local state only**: No need for global state; single page, single form

### State Shape
```typescript
type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TrainerData }
  | { status: 'error'; message: string; type: 'not_found' | 'network' };
```

---

## 6. Image Loading Strategy

### Decision: Next.js Image component with fallback

### Implementation
- Use `next/image` with `unoptimized` for external PokeAPI URLs
- `onError` handler switches to placeholder image
- Placeholder stored in `/public/placeholder-pokemon.png`

### Rationale
- Next.js Image provides lazy loading and responsive sizing
- External images from raw.githubusercontent.com need `unoptimized` or remotePatterns config
- Graceful fallback prevents broken image UI

---

## 7. Form Validation

### Decision: Client-side validation with disabled button state

### Implementation
- Button disabled when input is empty (trimmed)
- Helper text shows "Enter a name to search" when empty
- No complex validation needed (API handles case-insensitivity)

### Rationale
- Prevents unnecessary API calls for empty input
- Immediate feedback without round-trip
- Simple requirements don't warrant a form library

---

## 8. Testing Strategy

### Decision: Jest + React Testing Library for unit/component tests

### Test Coverage Plan
| Area | Tests |
|------|-------|
| Components | Render states, user interactions, accessibility |
| API Route | Mock external API, test error mapping |
| Integration | Full lookup flow with mocked API |

### Rationale
- Jest is standard for Next.js projects
- React Testing Library encourages testing user behavior, not implementation
- E2E (Playwright) optional for this scope; manual testing sufficient for MVP

---

## 9. Environment Variables

### Decision: Single environment variable for API key

### Implementation
```
# .env.local (not committed)
POKEMON_API_KEY=your-secret-key

# .env.example (committed, for documentation)
POKEMON_API_KEY=your-api-key-here
```

### Rationale
- Only one secret needed: the Pokemon Selector API key
- `.env.local` is gitignored by default in Next.js
- `.env.example` documents required variables for other developers

---

## 10. Accessibility Considerations

### Decision: WCAG 2.1 AA compliance for core interactions

### Implementation
- Form labels associated with inputs
- Button has clear text ("Look Up")
- Error messages announced to screen readers (aria-live)
- Sufficient color contrast on type badges
- Focus visible on interactive elements

### Rationale
- Basic accessibility is low effort and high impact
- Educational context benefits from accessible design
- Constitution requires "plain language" which aligns with accessibility

---

## Summary of Decisions

| Topic | Decision |
|-------|----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Type Colors | Custom Tailwind palette mapping |
| API Design | `/api/lookup?name=X` proxy route |
| State Management | React useState/useReducer |
| Images | next/image with fallback |
| Validation | Client-side empty check |
| Testing | Jest + React Testing Library |
| Env Variables | Single `POKEMON_API_KEY` |
| Accessibility | WCAG 2.1 AA basics |

All unknowns resolved. Ready for Phase 1: Design & Contracts.
