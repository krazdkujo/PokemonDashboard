# Tasks: Trainer Lookup Dashboard

**Input**: Design documents from `/specs/001-trainer-lookup-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested in specification - test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Next.js)**: `src/app/`, `src/components/`, `src/lib/`, `src/constants/`
- **Public assets**: `public/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Next.js configuration

- [X] T001 Initialize Next.js 14 project with TypeScript and App Router in project root
- [X] T002 Install and configure Tailwind CSS with default config in tailwind.config.ts
- [X] T003 [P] Create .env.example with POKEMON_API_KEY placeholder
- [X] T004 [P] Create .gitignore with Node.js defaults and .env.local exclusion
- [X] T005 [P] Configure next.config.js with remotePatterns for raw.githubusercontent.com images

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, utilities, and shared components that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create TypeScript interfaces (Pokemon, TrainerData, LookupResponse, LookupState) in src/lib/types.ts
- [X] T007 [P] Create Pokemon type color mappings (18 types with bg/text classes) in src/constants/pokemon-types.ts
- [X] T008 [P] Create API client function for /api/lookup route in src/lib/api.ts
- [X] T009 [P] Create LoadingSpinner component in src/components/LoadingSpinner.tsx
- [X] T010 [P] Create TypeBadge component with Pokemon type colors in src/components/TypeBadge.tsx
- [X] T011 [P] Add placeholder Pokemon image in public/placeholder-pokemon.png
- [X] T012 Create root layout with metadata and global styles in src/app/layout.tsx
- [X] T013 Create global CSS with Tailwind directives in src/app/globals.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Trainer Looks Up Their Pokemon Data (Priority: P1) MVP

**Goal**: Trainer enters name, clicks Look Up, sees trainer info with Pokemon image, name, number, types, and IDs

**Independent Test**: Enter a valid trainer name with a selected Pokemon and verify all data displays correctly with green accent

### Implementation for User Story 1

- [X] T014 [P] [US1] Create server-side API route /api/lookup with external API proxy in src/app/api/lookup/route.ts
- [X] T015 [P] [US1] Create PokemonCard component (image 150x150, name, number, types, fallback) in src/components/PokemonCard.tsx
- [X] T016 [US1] Create TrainerResult component (trainer name, ID, Pokemon card) in src/components/TrainerResult.tsx
- [X] T017 [US1] Create TrainerLookupForm component (input, button, loading state, disabled logic) in src/components/TrainerLookupForm.tsx
- [X] T018 [US1] Create main page with title, subtitle, form, results area, centered card layout in src/app/page.tsx
- [X] T019 [US1] Wire up form state management (idle/loading/success/error) with useReducer in src/app/page.tsx
- [X] T020 [US1] Add success state styling with subtle green accent in src/app/page.tsx

**Checkpoint**: User Story 1 complete - trainers with Pokemon can look up and see their data

---

## Phase 4: User Story 4 - Error Handling for Invalid Lookups (Priority: P2)

**Goal**: Display clear error messages for not found, network errors, and empty input validation

**Independent Test**: Enter non-existent trainer name and verify error message with registration link appears; verify empty input disables button

### Implementation for User Story 4

- [X] T021 [P] [US4] Create ErrorMessage component (not_found and network variants with red accent) in src/components/ErrorMessage.tsx
- [X] T022 [US4] Add 404 handling in API route with "not_found" error type in src/app/api/lookup/route.ts
- [X] T023 [US4] Add network/500 error handling in API route with "network" error type in src/app/api/lookup/route.ts
- [X] T024 [US4] Add empty input validation with disabled button and helper text in src/components/TrainerLookupForm.tsx
- [X] T025 [US4] Integrate ErrorMessage component into page for error states in src/app/page.tsx
- [X] T026 [US4] Add "register at Pokemon Selector" link in not_found error message in src/components/ErrorMessage.tsx

**Checkpoint**: User Story 4 complete - all error states handled with clear messaging

---

## Phase 5: User Story 2 - Trainer Without Selected Pokemon (Priority: P2)

**Goal**: When trainer has no Pokemon, display message with link to select starter

**Independent Test**: Look up a trainer without selected Pokemon and verify message "You haven't selected a starter Pokemon yet!" appears with link

### Implementation for User Story 2

- [X] T027 [US2] Create NoPokemonMessage component with "Select your starter" link in src/components/NoPokemonMessage.tsx
- [X] T028 [US2] Add null Pokemon handling in TrainerResult to show NoPokemonMessage in src/components/TrainerResult.tsx

**Checkpoint**: User Story 2 complete - trainers without Pokemon see guidance to select one

---

## Phase 6: User Story 3 - New Visitor Discovers Registration (Priority: P3)

**Goal**: Footer link to Pokemon Selector always visible for unregistered visitors

**Independent Test**: Load page and verify footer link "Don't have an account? Register at Pokemon Selector" is visible

### Implementation for User Story 3

- [X] T029 [US3] Create Footer component with registration link in src/components/Footer.tsx
- [X] T030 [US3] Add Footer to main page layout (visible in all states) in src/app/page.tsx

**Checkpoint**: User Story 3 complete - new visitors can discover registration path

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, responsive design, and validation

- [X] T031 [P] Add responsive styles for mobile viewport in all components
- [X] T032 [P] Add aria-live region for screen reader announcements on results/errors in src/app/page.tsx
- [X] T033 [P] Add form label association and focus management for accessibility in src/components/TrainerLookupForm.tsx
- [X] T034 Validate full flow using quickstart.md test scenarios
- [X] T035 Review API key security (confirm never in client bundle, only in server route)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - Can proceed in priority order (US1 → US4 → US2 → US3)
  - Or partially parallel (US1 required first, then US2/US4 can parallel)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories (MVP)
- **User Story 4 (P2)**: Can start after Foundational - Builds on form from US1
- **User Story 2 (P2)**: Can start after Foundational - Uses TrainerResult from US1
- **User Story 3 (P3)**: Can start after Foundational - Independent footer component

### Within Each User Story

- API route before components that use it
- Shared components before page integration
- Core implementation before state wiring
- Story complete before moving to next priority

### Parallel Opportunities

- T003, T004, T005 can run in parallel (Setup phase)
- T007, T008, T009, T010, T011 can run in parallel (Foundational phase)
- T014, T015 can run in parallel (US1 - different files)
- T021 can run in parallel with T022, T023 (US4 - component vs route)
- T031, T032, T033 can run in parallel (Polish phase)

---

## Parallel Example: Phase 2 (Foundational)

```bash
# After T006 (types), launch all independent tasks together:
Task: "Create Pokemon type color mappings in src/constants/pokemon-types.ts"
Task: "Create API client function in src/lib/api.ts"
Task: "Create LoadingSpinner component in src/components/LoadingSpinner.tsx"
Task: "Create TypeBadge component in src/components/TypeBadge.tsx"
Task: "Add placeholder Pokemon image in public/placeholder-pokemon.png"
```

## Parallel Example: User Story 1

```bash
# After Foundational complete, launch together:
Task: "Create server-side API route in src/app/api/lookup/route.ts"
Task: "Create PokemonCard component in src/components/PokemonCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T013) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T014-T020)
4. **STOP and VALIDATE**: Test lookup with valid trainer + Pokemon
5. Deploy/demo if ready - core functionality works

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → Deploy (MVP - core lookup works)
3. Add User Story 4 → Test → Deploy (error handling complete)
4. Add User Story 2 → Test → Deploy (no Pokemon state handled)
5. Add User Story 3 → Test → Deploy (footer link added)
6. Polish phase → Final deployment

### Task Execution Order (Single Developer)

```
T001 → T002 → T003/T004/T005 (parallel) →
T006 → T007/T008/T009/T010/T011 (parallel) → T012 → T013 →
T014/T015 (parallel) → T016 → T017 → T018 → T019 → T020 →
T021 (parallel with T022/T023) → T024 → T025 → T026 →
T027 → T028 →
T029 → T030 →
T031/T032/T033 (parallel) → T034 → T035
```

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- API key MUST stay server-side (src/app/api/ only)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
