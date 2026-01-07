# Tasks: Pokemon Nickname Display

**Input**: Design documents from `/specs/002-nickname-display/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test framework configured. Tests not included unless explicitly requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Next.js App Router (web application)
- **Source**: `src/` at repository root
- **Components**: `src/components/`
- **Types**: `src/lib/types.ts`

---

## Phase 1: Setup

**Purpose**: No new project setup required - modifying existing codebase

**⚠️ NOTE**: This feature modifies an existing Next.js project. No setup tasks needed.

**Checkpoint**: Existing project is ready for modifications

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Type definition update required before any UI work

**⚠️ CRITICAL**: User story work cannot begin until the Pokemon type is updated

- [x] T001 Add `nickname?: string | null` field to Pokemon interface in src/lib/types.ts

**Checkpoint**: Pokemon type now includes optional nickname field - UI work can begin

---

## Phase 3: User Story 1 - View Pokemon with Nickname (Priority: P1) 🎯 MVP

**Goal**: Display the Pokemon's nickname prominently when present, with species name as subtitle

**Independent Test**: Look up a trainer whose Pokemon has a nickname and verify the nickname appears as primary name with species as subtitle

### Implementation for User Story 1

- [x] T002 [US1] Add nickname detection logic (`hasNickname` helper) in src/components/PokemonCard.tsx
- [x] T003 [US1] Update PokemonCard to display nickname as primary heading when present in src/components/PokemonCard.tsx
- [x] T004 [US1] Display species name as secondary subtitle below nickname in src/components/PokemonCard.tsx
- [x] T005 [US1] Apply visual hierarchy styles (nickname larger/bold, species smaller/muted) in src/components/PokemonCard.tsx

**Checkpoint**: Pokemon cards with nicknames display correctly. User Story 1 is complete and testable.

---

## Phase 4: User Story 2 - Add Nickname Link (Priority: P2)

**Goal**: Show "Add a nickname" link when Pokemon has no nickname, linking to /pokemon-selection

**Independent Test**: Look up a trainer whose Pokemon has no nickname and verify a link to add one appears

### Implementation for User Story 2

- [x] T006 [US2] Add "Add a nickname" link component when hasNickname is false in src/components/PokemonCard.tsx
- [x] T007 [US2] Style the link with Tailwind (text-blue-600 hover:text-blue-800) in src/components/PokemonCard.tsx
- [x] T008 [US2] Set link href to /pokemon-selection in src/components/PokemonCard.tsx

**Checkpoint**: Pokemon cards without nicknames show "Add a nickname" link. User Story 2 is complete and testable.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validation, edge cases, and final verification

- [x] T009 Handle empty string nickname as "no nickname" (same as null/undefined) in src/components/PokemonCard.tsx
- [x] T010 Run linter to verify code quality: `npm run lint`
- [x] T011 Run build to verify no compilation errors: `npm run build`
- [x] T012 Manual verification using quickstart.md test checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A - existing project
- **Foundational (Phase 2)**: Must complete T001 before any UI work
- **User Story 1 (Phase 3)**: Depends on T001 completion
- **User Story 2 (Phase 4)**: Depends on T001 completion (can run parallel to Phase 3 but modifies same file)
- **Polish (Phase 5)**: Depends on Phase 3 and Phase 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after T001 - No dependencies on other stories
- **User Story 2 (P2)**: Can start after T001 - Builds on hasNickname logic from US1 but independently testable

### Task Dependencies Within Phases

```
T001 (type update)
  ├── T002 (nickname detection)
  │     └── T003 → T004 → T005 (nickname display sequence)
  └── T006 → T007 → T008 (add link sequence - can start after T002)

T009 (edge cases - after T002-T008)
T010 → T011 → T012 (verification sequence)
```

### Parallel Opportunities

- T002-T005 and T006-T008 could theoretically run in parallel but modify the same file (PokemonCard.tsx)
- Recommend sequential execution within each phase to avoid merge conflicts
- **Single developer**: Execute T001 → T002-T005 → T006-T008 → T009-T012

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001: Add nickname to Pokemon type
2. Complete T002-T005: Implement nickname display
3. **STOP and VALIDATE**: Test with a nicknamed Pokemon
4. Deploy if ready (nickname display works even without US2)

### Full Feature

1. Complete T001: Foundation
2. Complete T002-T005: User Story 1 (MVP)
3. Complete T006-T008: User Story 2
4. Complete T009-T012: Polish and verification
5. Deploy complete feature

### Estimated Effort

- **Total tasks**: 12
- **User Story 1**: 4 tasks (T002-T005)
- **User Story 2**: 3 tasks (T006-T008)
- **Foundation**: 1 task (T001)
- **Polish**: 4 tasks (T009-T012)
- **Files modified**: 2 (types.ts, PokemonCard.tsx)

---

## Notes

- All UI tasks modify `src/components/PokemonCard.tsx` - avoid parallel work on this file
- No test framework is configured; manual testing via quickstart.md checklist
- The `/pokemon-selection` route may not exist yet - link will still function (navigates to that path)
- Empty string, null, and undefined nicknames all treated as "no nickname"
- Commit after completing each phase for clean git history
