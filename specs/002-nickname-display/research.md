# Research: Pokemon Nickname Display

**Feature**: 002-nickname-display
**Date**: 2026-01-07

## Research Tasks

### 1. External API Nickname Field Format

**Question**: What is the expected format of the nickname field from the external Pokemon Selector API?

**Decision**: The nickname field will be an optional string (`nickname?: string | null`) on the Pokemon object.

**Rationale**:
- The spec states the API payload "has been updated to include an optional nickname field"
- Following the existing Pokemon object pattern in `types.ts`, optional fields use TypeScript optional syntax
- Empty strings and null/undefined should be treated as "no nickname" per FR-005

**Alternatives Considered**:
- Separate endpoint for nicknames: Rejected - adds complexity, the data comes with trainer lookup
- Nickname as required field with empty default: Rejected - breaks backwards compatibility

### 2. Visual Hierarchy for Nickname vs Species Name

**Question**: How should nickname and species name be visually distinguished?

**Decision**: Display nickname as primary heading (larger, bold), species name as secondary label (smaller, muted color, capitalized).

**Rationale**:
- SC-003 requires users identify nickname within 2 seconds
- Pokemon games display nickname prominently with species as subtitle
- Maintains existing card layout pattern while adding information

**Alternatives Considered**:
- Side-by-side display: Rejected - clutters the compact card layout
- Tooltip for species: Rejected - hides important information, requires interaction

### 3. Add Nickname Link Styling

**Question**: How should the "Add a nickname" link be styled to fit the existing UI?

**Decision**: Use a text link with subtle styling below the Pokemon name area, using Tailwind's text-blue-600 hover:text-blue-800 pattern.

**Rationale**:
- Matches the connected experience principle (link to ecosystem)
- Non-intrusive but visible
- Consistent with web conventions for actionable links

**Alternatives Considered**:
- Button: Rejected - too prominent for optional action, breaks visual hierarchy
- Icon-only: Rejected - unclear purpose without text

### 4. Empty String Handling

**Question**: How to differentiate empty string from null/undefined for nickname?

**Decision**: Treat empty string (`""`) identically to null/undefined - show "Add a nickname" link.

**Rationale**:
- FR-005 explicitly requires this behavior
- Simplifies conditional logic in component
- Users don't distinguish between "no nickname" and "empty nickname"

**Implementation Pattern**:
```typescript
const hasNickname = pokemon.nickname && pokemon.nickname.trim() !== '';
```

## Technical Decisions Summary

| Decision | Choice | Impact |
|----------|--------|--------|
| Nickname field type | `nickname?: string \| null` | Type update in `types.ts` |
| Visual hierarchy | Nickname primary, species secondary | Layout changes in `PokemonCard.tsx` |
| Link styling | Text link with blue color | Tailwind classes |
| Empty handling | Treat as no nickname | Single conditional check |

## No Further Research Required

All technical context is clear from existing codebase. No external dependencies or new patterns needed.
