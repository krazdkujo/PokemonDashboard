# Data Model: Trainer Lookup Dashboard

**Feature Branch**: `001-trainer-lookup-dashboard`
**Date**: 2026-01-07

## Overview

This document defines the data structures used in the Trainer Lookup Dashboard. The application does not persist data locally; all data is fetched from the external Pokemon Selector API.

---

## Entities

### 1. Trainer

Represents a registered trainer in the Pokemon Selector system.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `trainer_id` | string (UUID) | Unique identifier for the trainer | Required, UUID v4 format |
| `trainer_name` | string | Display name of the trainer | Required, 1-100 characters |
| `pokemon` | Pokemon \| null | Selected starter Pokemon | Nullable |

**Source**: Pokemon Selector API response

---

### 2. Pokemon

Represents a trainer's selected starter Pokemon.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `uuid` | string (UUID) | Unique instance ID for this Pokemon | Required, UUID v4 format |
| `number` | integer | National Pokedex number | Required, 1-151 |
| `name` | string | Pokemon species name | Required |
| `types` | string[] | List of type names | Required, 1-2 elements |

**Derived Fields** (computed in frontend):
- `spriteUrl`: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{number}.png`
- `formattedNumber`: `#{number.toString().padStart(3, '0')}` (e.g., "#025")

---

## TypeScript Interfaces

```typescript
// lib/types.ts

/**
 * Pokemon data from the external API
 */
export interface Pokemon {
  uuid: string;
  number: number;
  name: string;
  types: string[];
}

/**
 * Trainer data from the external API
 */
export interface TrainerData {
  trainer_id: string;
  trainer_name: string;
  pokemon: Pokemon | null;
}

/**
 * Internal API response wrapper
 */
export interface LookupResponse {
  success: boolean;
  data?: TrainerData;
  error?: {
    type: 'not_found' | 'validation' | 'network';
    message: string;
  };
}

/**
 * Application state for the lookup form
 */
export type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TrainerData }
  | { status: 'error'; errorType: 'not_found' | 'network'; message: string };

/**
 * Pokemon type color configuration
 */
export interface TypeColorConfig {
  bg: string;      // Tailwind background class
  text: string;    // Tailwind text class
}
```

---

## State Transitions

### Lookup Form State Machine

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    ▼                                     │
┌──────────┐    submit    ┌───────────┐                  │
│   IDLE   │─────────────►│  LOADING  │                  │
└──────────┘              └───────────┘                  │
     ▲                         │                         │
     │                    ┌────┴────┐                    │
     │                    │         │                    │
     │              success│         │error              │
     │                    ▼         ▼                    │
     │              ┌─────────┐ ┌─────────┐              │
     │              │ SUCCESS │ │  ERROR  │              │
     │              └─────────┘ └─────────┘              │
     │                    │         │                    │
     └────────────────────┴─────────┴────────────────────┘
                        (new search)
```

**State Descriptions**:
- **IDLE**: Initial state, input empty or cleared, no results displayed
- **LOADING**: API request in progress, button disabled, spinner shown
- **SUCCESS**: Trainer data received, results displayed with green accent
- **ERROR**: Error occurred, error message displayed with red accent

---

## Validation Rules

### Input Validation (Client-side)

| Field | Rule | Error Behavior |
|-------|------|----------------|
| Trainer Name | Non-empty after trim | Button disabled, helper text shown |

### API Response Validation

| Status Code | Interpretation | State Transition |
|-------------|----------------|------------------|
| 200 | Success | → SUCCESS |
| 400 | Missing/invalid input | → ERROR (validation) |
| 404 | Trainer not found | → ERROR (not_found) |
| 401, 500, network | Service error | → ERROR (network) |

---

## Relationships

```
┌─────────────────────────────┐
│          Trainer            │
├─────────────────────────────┤
│ trainer_id: UUID            │
│ trainer_name: string        │
│ pokemon: Pokemon | null ────┼──────┐
└─────────────────────────────┘      │
                                     │ 0..1
                                     ▼
                          ┌─────────────────────────────┐
                          │          Pokemon            │
                          ├─────────────────────────────┤
                          │ uuid: UUID                  │
                          │ number: int (1-151)         │
                          │ name: string                │
                          │ types: string[]             │
                          └─────────────────────────────┘
```

- A Trainer has zero or one Pokemon (nullable relationship)
- Pokemon is owned by exactly one Trainer (from system perspective)
- Types are stored as strings, mapped to colors in the UI layer

---

## External Data Sources

| Source | URL Pattern | Data Retrieved |
|--------|-------------|----------------|
| Pokemon Selector API | `GET /api/external/trainer` | Trainer + Pokemon data |
| PokeAPI Sprites | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{number}.png` | Pokemon sprite image |
