# Data Model: Pokemon Nickname Display

**Feature**: 002-nickname-display
**Date**: 2026-01-07

## Entity Changes

### Pokemon (Modified)

The Pokemon entity is extended to include an optional nickname field.

**Current Definition** (`src/lib/types.ts`):
```typescript
export interface Pokemon {
  uuid: string;
  number: number;
  name: string;      // Species name (e.g., "pikachu")
  types: string[];
}
```

**Updated Definition**:
```typescript
export interface Pokemon {
  uuid: string;
  number: number;
  name: string;           // Species name (e.g., "pikachu")
  types: string[];
  nickname?: string | null;  // NEW: Optional trainer-assigned nickname
}
```

### Field Details

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| uuid | string | Yes | Unique identifier | UUID format |
| number | number | Yes | Pokedex number | 1-151 |
| name | string | Yes | Species name | Non-empty, lowercase |
| types | string[] | Yes | Pokemon types | 1-2 elements |
| nickname | string \| null | No | Trainer-assigned name | Max 12 chars, or null/empty |

### Nickname Field Behavior

| API Value | UI Behavior |
|-----------|-------------|
| `"Sparky"` | Display "Sparky" as nickname, species as subtitle |
| `""` (empty) | Show "Add a nickname" link |
| `null` | Show "Add a nickname" link |
| `undefined` | Show "Add a nickname" link |

## State Transitions

N/A - Nickname is read-only from this dashboard. Modification happens on the Pokemon Selection Dashboard.

## Relationships

```
TrainerData (1) ──────> (0..1) Pokemon
                              │
                              └── nickname?: string | null
```

- A trainer may have zero or one Pokemon
- A Pokemon may or may not have a nickname
- Nickname is managed externally (Pokemon Selection Dashboard)

## Validation Rules

1. **Nickname Display**: Only display nickname if it exists AND is non-empty after trimming
2. **Species Name**: Always display regardless of nickname presence
3. **Special Characters**: Display as-is (no sanitization needed for display)
4. **Length**: Assume max 12 characters (Pokemon game standard)
