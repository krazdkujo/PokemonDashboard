<!--
  SYNC IMPACT REPORT
  ==================
  Version change: N/A → 1.0.0 (initial)
  Modified principles: N/A (initial creation)
  Added sections:
    - Core Principles (4 principles: Simplicity, Visual Design, Helpful UX, Connected Experience)
    - Technical Constraints
    - API Integration Guidelines
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ no changes required (constitution check section is generic)
    - .specify/templates/spec-template.md: ✅ no changes required
    - .specify/templates/tasks-template.md: ✅ no changes required
    - .specify/templates/agent-file-template.md: ✅ no changes required
    - .specify/templates/checklist-template.md: ✅ no changes required
  Follow-up TODOs: None
-->

# Pokemon Trainer Lookup Dashboard Constitution

## Core Principles

### I. Simplicity

The dashboard MUST be immediately usable with zero learning curve.

- Users MUST be able to perform a lookup with a single text input and button click
- No authentication, login, or registration required for lookup functionality
- The interface MUST load in a ready-to-use state with clear visual affordance for the input field
- YAGNI applies: do not add features beyond the core lookup functionality unless explicitly requested

**Rationale**: Students need quick access to their data without friction. Any barrier reduces adoption.

### II. Visual Design

Pokemon imagery MUST be the focal point of successful lookups.

- When a trainer has a selected Pokemon, display the sprite image prominently (minimum 150x150 pixels)
- Pokemon sprites MUST use the official PokeAPI sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{number}.png`
- Pokemon name and type badges MUST accompany the image for immediate recognition
- Empty/null Pokemon state MUST be clearly communicated (no selected Pokemon yet)

**Rationale**: Visual feedback creates engagement and instant recognition for students.

### III. Helpful UX

All system states MUST provide clear, actionable guidance to users.

- Error states MUST explain what went wrong in plain language:
  - 404: "Trainer not found" with suggestion to check spelling or register
  - 400: "Please enter your trainer name"
  - 401/500: "Service unavailable, please try again later"
- Loading states MUST show visual feedback (spinner or similar)
- Success states MUST clearly show trainer name and Pokemon data (or "No Pokemon selected yet")
- All error messages MUST avoid technical jargon

**Rationale**: Students should never feel stuck or confused about what to do next.

### IV. Connected Experience

The dashboard MUST integrate with the broader Pokemon Selector ecosystem.

- Include a prominent link to the main Pokemon Selection Dashboard: `https://pokemon-selector-lilac.vercel.app/`
- The link MUST be visible regardless of lookup state (success, error, or initial)
- Link text MUST clarify the purpose: "Don't have a trainer? Register at the Pokemon Selector"

**Rationale**: Users who aren't registered need a clear path to participate in the system.

## Technical Constraints

### API Integration

- **Endpoint**: `GET https://pokemon-selector-lilac.vercel.app/api/external/trainer`
- **Required Headers**:
  - `X-API-Key`: Pre-configured secret (MUST NOT be exposed to client-side code in production)
  - `X-Trainer-Name`: User-provided trainer name
- **Response Handling**:
  - 200: Display trainer data and Pokemon (if present)
  - 400: Display "missing name" error
  - 401: Display generic service error (do not expose API key issues to users)
  - 404: Display "trainer not found" with registration guidance

### Security

- API key MUST be stored server-side or in environment variables
- API key MUST NOT be committed to source control
- User input (trainer name) MUST be validated before API calls

## API Integration Guidelines

### Request Flow

1. User enters trainer name
2. Client validates input is non-empty
3. Request sent to API with appropriate headers
4. Response parsed and displayed according to Helpful UX principle

### Response Schema

```json
{
  "trainer_id": "uuid",
  "trainer_name": "string",
  "pokemon": {
    "uuid": "uuid",
    "number": 1-151,
    "name": "string",
    "types": ["string"]
  } | null
}
```

## Governance

- This constitution defines the non-negotiable requirements for the Trainer Lookup Dashboard
- All implementation decisions MUST align with these principles
- Changes to this constitution require documentation and explicit approval
- When principles conflict, prioritize in order: Simplicity > Helpful UX > Visual Design > Connected Experience

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07
