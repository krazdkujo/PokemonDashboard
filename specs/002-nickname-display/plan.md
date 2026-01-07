# Implementation Plan: Pokemon Nickname Display

**Branch**: `002-nickname-display` | **Date**: 2026-01-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-nickname-display/spec.md`

## Summary

Add support for displaying Pokemon nicknames on the trainer lookup dashboard. When a Pokemon has a nickname, display it prominently above the species name. When no nickname exists, show a link to the Pokemon selection dashboard (`/pokemon-selection`) where users can add one. This requires updating the Pokemon type interface to include an optional `nickname` field and modifying the PokemonCard component to conditionally render nickname or add-nickname link.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20.x LTS
**Primary Dependencies**: Next.js 14 (App Router), React 18, Tailwind CSS
**Storage**: N/A (data from external API)
**Testing**: ESLint (no test framework currently configured)
**Target Platform**: Web (browser)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Standard web application (<3s page load)
**Constraints**: Must integrate with existing external Pokemon Selector API
**Scale/Scope**: Single-page dashboard, ~10 components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Simplicity | Zero learning curve, single input + button | ✅ PASS | No new inputs required; nickname display is passive |
| II. Visual Design | Pokemon imagery focal point, 150x150 sprites | ✅ PASS | Nickname adds to, doesn't replace, existing visual design |
| III. Helpful UX | Clear actionable guidance for all states | ✅ PASS | "Add a nickname" link provides clear action path |
| IV. Connected Experience | Link to Pokemon Selector ecosystem | ✅ PASS | Link to `/pokemon-selection` aligns with ecosystem integration |
| Security | API key server-side, no client exposure | ✅ PASS | No changes to API key handling required |

**Gate Status**: PASS - No violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-nickname-display/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   └── lookup/
│   │       └── route.ts      # API route (passes nickname from external API)
│   ├── layout.tsx
│   └── page.tsx              # Main page
├── components/
│   ├── PokemonCard.tsx       # MODIFY: Add nickname display + add-nickname link
│   ├── TrainerResult.tsx
│   ├── TrainerLookupForm.tsx
│   ├── TypeBadge.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── NoPokemonMessage.tsx
│   └── Footer.tsx
└── lib/
    ├── api.ts
    └── types.ts              # MODIFY: Add nickname to Pokemon interface
```

**Structure Decision**: Existing Next.js App Router structure. Changes confined to:
1. `src/lib/types.ts` - Add optional `nickname` field to Pokemon interface
2. `src/components/PokemonCard.tsx` - Display nickname or add-nickname link

## Complexity Tracking

> No violations - table not required.

## Constitution Check (Post-Design)

*Re-evaluated after Phase 1 design completion.*

| Principle | Requirement | Status | Design Impact |
|-----------|-------------|--------|---------------|
| I. Simplicity | Zero learning curve | ✅ PASS | No new interactions; nickname display is automatic |
| II. Visual Design | Pokemon imagery focal point | ✅ PASS | Sprite remains prominent; nickname adds text only |
| III. Helpful UX | Clear actionable guidance | ✅ PASS | "Add a nickname" link uses clear text, blue link styling |
| IV. Connected Experience | Link to ecosystem | ✅ PASS | Link to `/pokemon-selection` maintains ecosystem connection |
| Security | API key server-side | ✅ PASS | No security changes; nickname comes from existing API response |

**Post-Design Gate Status**: PASS - Design aligns with all constitution principles.

## Generated Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Research | `specs/002-nickname-display/research.md` | ✅ Complete |
| Data Model | `specs/002-nickname-display/data-model.md` | ✅ Complete |
| API Contract | `specs/002-nickname-display/contracts/api.yaml` | ✅ Complete |
| Quickstart | `specs/002-nickname-display/quickstart.md` | ✅ Complete |

## Next Steps

Run `/speckit.tasks` to generate the implementation task list.
