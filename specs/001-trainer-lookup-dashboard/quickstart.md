# Quickstart: Trainer Lookup Dashboard

**Feature Branch**: `001-trainer-lookup-dashboard`
**Date**: 2026-01-07

## Prerequisites

- Node.js 20.x LTS
- npm or pnpm
- Pokemon Selector API key (provided by instructor)

## Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd PokemonDashboard
git checkout 001-trainer-lookup-dashboard
npm install
```

### 2. Configure Environment

Create `.env.local` in the project root:

```bash
# .env.local
POKEMON_API_KEY=your-api-key-here
```

> **Important**: Never commit `.env.local` to version control.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Tailwind styles
│   └── api/lookup/route.ts  # Server-side API proxy
├── components/              # React components
├── lib/                     # Utilities and types
└── constants/               # Type colors, etc.
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page component |
| `src/app/api/lookup/route.ts` | API route that proxies to Pokemon Selector |
| `src/components/TrainerLookupForm.tsx` | Search form component |
| `src/components/TrainerResult.tsx` | Success result display |
| `src/lib/types.ts` | TypeScript interfaces |

## API Endpoint

**Internal** (this app):
```
GET /api/lookup?name={trainerName}
```

**External** (Pokemon Selector - called server-side only):
```
GET https://pokemon-selector-lilac.vercel.app/api/external/trainer
Headers: X-API-Key, X-Trainer-Name
```

## Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

For Vercel deployment:
1. Connect repository to Vercel
2. Add `POKEMON_API_KEY` environment variable in Vercel dashboard
3. Deploy

## Common Tasks

### Add a new component

```bash
# Create component file
touch src/components/MyComponent.tsx

# Component template
export function MyComponent() {
  return <div>MyComponent</div>;
}
```

### Test the API locally

```bash
curl "http://localhost:3000/api/lookup?name=YourName"
```

### Check TypeScript errors

```bash
npm run type-check
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized from API | Check `POKEMON_API_KEY` in `.env.local` |
| Module not found | Run `npm install` |
| Styles not loading | Ensure Tailwind is configured in `tailwind.config.js` |
| Images not loading | Check `next.config.js` remotePatterns for githubusercontent.com |

## Links

- **Pokemon Selector**: https://pokemon-selector-lilac.vercel.app/
- **PokeAPI Sprites**: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/
- **Spec**: [spec.md](./spec.md)
- **Plan**: [plan.md](./plan.md)
