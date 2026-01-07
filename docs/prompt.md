# Trainer Lookup Dashboard Prompts

Copy these prompts to create a Trainer Lookup Dashboard feature.

---

## Constitution Prompt

```
You are building a Trainer Lookup Dashboard for students to check their Pokemon Starter Selector data.

PROJECT CONTEXT:
- Standalone page where students enter their trainer name and see their data
- Connects to an external API at: https://pokemon-selector-lilac.vercel.app/api/external/trainer
- API requires X-API-Key header (pre-configured) and X-Trainer-Name header (user input)
- No authentication required - simple public lookup tool

DESIGN PRINCIPLES:
1. Simplicity: Immediately usable with no learning curve
2. Visual: Display the Pokemon image prominently when found
3. Helpful: Clear error messages and guidance
4. Connected: Link to the main Pokemon selection dashboard for users who need to register

API CONTRACT:
- Method: GET
- Headers: X-API-Key (secret), X-Trainer-Name (user input)
- Success Response (200):
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
- Errors: 401 (bad key), 404 (not found), 400 (missing name)

POKEMON IMAGES:
- Sprites available at: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{number}.png
- Example: Pokemon #25 (Pikachu) = https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png

LINKED RESOURCES:
- Pokemon Selection Dashboard: https://pokemon-selector-lilac.vercel.app/
```

---

## Spec Prompt

```
Create a Trainer Lookup Dashboard with these requirements:

PAGE LAYOUT:
1. Title: "Trainer Lookup"
2. Subtitle: "Enter your trainer name to view your Pokemon data"
3. Input field for trainer name
4. "Look Up" button
5. Results area (hidden until search)
6. Footer link: "Don't have an account? Register at Pokemon Selector" linking to https://pokemon-selector-lilac.vercel.app/

ON SUCCESSFUL LOOKUP - DISPLAY:
- Trainer name (large, prominent)
- Trainer ID (smaller, labeled "Your Trainer ID")
- Pokemon Image (large, fetched from PokeAPI sprites using pokemon.number)
  URL pattern: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{number}.png
- Pokemon name
- Pokemon number (e.g., "#025")
- Pokemon types (as colored badges)
- Pokemon UUID (smaller, labeled "Pokemon Instance ID")

IF NO POKEMON SELECTED:
- Show message: "You haven't selected a starter Pokemon yet!"
- Show link: "Select your starter" pointing to https://pokemon-selector-lilac.vercel.app/

ERROR STATES:
- Not found: "No trainer found with that name. Check your spelling or register at [link]"
- Network error: "Unable to connect. Please try again."
- Empty input: Disable button, show "Enter a name to search"

STYLING:
- Clean, centered card layout
- Pokemon image should be prominent (at least 150x150px)
- Type badges with Pokemon-style colors
- Loading spinner while fetching
- Success state with subtle green accent
- Error state with red accent

TECHNICAL:
- API key stored in environment variable (never expose to client)
- Make API call server-side to protect the key
- Case-insensitive name matching (handled by API)
```
