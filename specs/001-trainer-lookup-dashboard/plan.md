# Implementation Plan: Trainer Lookup Dashboard

**Branch**: `001-trainer-lookup-dashboard` | **Date**: 2026-01-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-trainer-lookup-dashboard/spec.md`

## Summary

Build a single-page web dashboard where trainers can look up their Pokemon data by entering their name. The system makes server-side API calls to protect the API key, fetches trainer data from the Pokemon Selector API, and displays trainer information with Pokemon sprite images from PokeAPI. The dashboard handles success, empty Pokemon, not found, and error states with appropriate UI feedback.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20.x LTS
**Primary Dependencies**: Next.js 14 (App Router), React 18, Tailwind CSS
**Storage**: N/A (no local storage required; data fetched from external API)
**Testing**: Jest + React Testing Library (unit/component), Playwright (E2E optional)
**Target Platform**: Web browsers (modern Chrome, Firefox, Safari, Edge), responsive for mobile/desktop
**Project Type**: Web application (frontend + API route)
**Performance Goals**: < 3 second total lookup time under normal network conditions (per SC-001)
**Constraints**: API key must never be exposed client-side; single-page design; mobile-responsive
**Scale/Scope**: Single page dashboard, ~5 components, 1 API route

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Simplicity | Zero learning curve, single input + button | PASS | Single text input and "Look Up" button design |
| I. Simplicity | No authentication required | PASS | Lookup is anonymous by trainer name |
| I. Simplicity | Ready-to-use state on load | PASS | Page loads with input visible and focused |
| I. Simplicity | YAGNI - no extra features | PASS | Only lookup functionality as specified |
| II. Visual Design | Pokemon image min 150x150px | PASS | Using PokeAPI sprites at 150x150 minimum |
| II. Visual Design | Use official PokeAPI sprites | PASS | URL pattern: `sprites/master/sprites/pokemon/{number}.png` |
| II. Visual Design | Name + type badges with image | PASS | Included in results display |
| II. Visual Design | Clear "no Pokemon" state | PASS | Message + link to select starter |
| III. Helpful UX | Plain language error messages | PASS | Specific messages per error type |
| III. Helpful UX | Loading state feedback | PASS | Spinner during API call |
| III. Helpful UX | No technical jargon | PASS | User-friendly error messages |
| IV. Connected Experience | Link to Pokemon Selector | PASS | Footer link always visible |
| Technical: Security | API key server-side only | PASS | Next.js API route handles external API calls |
| Technical: Security | API key in env variable | PASS | Using POKEMON_API_KEY env var |
| Technical: Security | Validate user input | PASS | Non-empty check before API call |

**Constitution Gate: PASSED**

## Project Structure

### Documentation (this feature)

```text
specs/001-trainer-lookup-dashboard/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI spec for internal API route
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Global styles + Tailwind
│   └── api/
│       └── lookup/
│           └── route.ts     # Server-side API route (proxies to Pokemon Selector)
├── components/
│   ├── TrainerLookupForm.tsx    # Input + button form
│   ├── TrainerResult.tsx        # Success state display
│   ├── PokemonCard.tsx          # Pokemon image, name, types display
│   ├── TypeBadge.tsx            # Individual type badge
│   ├── LoadingSpinner.tsx       # Loading indicator
│   └── ErrorMessage.tsx         # Error state display
├── lib/
│   ├── api.ts                   # API client for internal route
│   └── types.ts                 # TypeScript interfaces
└── constants/
    └── pokemon-types.ts         # Type color mappings

tests/
├── components/
│   ├── TrainerLookupForm.test.tsx
│   ├── TrainerResult.test.tsx
│   └── PokemonCard.test.tsx
└── api/
    └── lookup.test.ts

public/
└── placeholder-pokemon.png      # Fallback image for failed sprite loads
```

**Structure Decision**: Single Next.js 14 application with App Router. The frontend and API route are co-located since this is a single-page dashboard with one server-side endpoint. No separate backend needed as Next.js API routes provide server-side execution for protecting the API key.

## Complexity Tracking

No constitution violations requiring justification. Implementation follows minimal viable design.
