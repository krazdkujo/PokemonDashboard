# Quickstart: Pokemon Nickname Display

**Feature**: 002-nickname-display
**Estimated Complexity**: Low (2 files modified)

## Overview

This feature adds Pokemon nickname display to the trainer lookup dashboard. When a Pokemon has a nickname, it's shown prominently; when not, a link to add one is displayed.

## Prerequisites

- Node.js 20.x LTS
- npm
- Existing project setup (`npm install` completed)

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/types.ts` | Add `nickname?: string \| null` to Pokemon interface |
| `src/components/PokemonCard.tsx` | Display nickname or "Add a nickname" link |

## Implementation Steps

### Step 1: Update Pokemon Type

In `src/lib/types.ts`, add the nickname field:

```typescript
export interface Pokemon {
  uuid: string;
  number: number;
  name: string;
  types: string[];
  nickname?: string | null;  // Add this line
}
```

### Step 2: Update PokemonCard Component

In `src/components/PokemonCard.tsx`:

1. Add nickname detection:
```typescript
const hasNickname = pokemon.nickname && pokemon.nickname.trim() !== '';
```

2. Update the display logic:
- If `hasNickname`: Show nickname as primary heading, species name as subtitle
- If not `hasNickname`: Show species name as before + "Add a nickname" link

### Step 3: Verify

```bash
npm run dev
```

Test with:
- Trainer with nicknamed Pokemon → nickname displays
- Trainer with un-nicknamed Pokemon → link displays
- Trainer with no Pokemon → no nickname UI shown

## Testing Checklist

- [ ] Nickname displays prominently when present
- [ ] Species name shows as subtitle when nickname present
- [ ] "Add a nickname" link appears when no nickname
- [ ] Link navigates to `/pokemon-selection`
- [ ] Empty string nickname treated as no nickname
- [ ] No nickname UI when trainer has no Pokemon
- [ ] Lint passes: `npm run lint`
- [ ] Build succeeds: `npm run build`

## API Response Examples

**With nickname:**
```json
{
  "pokemon": {
    "uuid": "abc-123",
    "number": 25,
    "name": "pikachu",
    "types": ["electric"],
    "nickname": "Sparky"
  }
}
```

**Without nickname:**
```json
{
  "pokemon": {
    "uuid": "abc-123",
    "number": 25,
    "name": "pikachu",
    "types": ["electric"],
    "nickname": null
  }
}
```
