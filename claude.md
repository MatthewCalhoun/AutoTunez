# Autotunez Project

AI-powered music marketplace built on Bitcoin SV (BSV) blockchain. Users can discover, stream, and purchase AI-generated music tracks with micropayments.

## Project Structure

```
autotunez/
├── frontend/          # React SPA (Vite + TypeScript)
│   └── src/
│       ├── components/   # Shared UI components
│       ├── pages/        # Route page components
│       ├── contexts/     # React Context providers
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utility libraries (wallet integration)
└── (backend - not yet implemented)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 + Custom CSS |
| Routing | React Router DOM 7 |
| Blockchain | BSV SDK (`@bsv/sdk`) |
| Icons | Lucide React |

## Quick Commands

```bash
# Development
cd frontend && npm run dev     # Start dev server on port 5175

# Build
cd frontend && npm run build   # TypeScript compile + Vite build

# Lint
cd frontend && npm run lint    # ESLint check
```

## Application Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | Landing | Hero page with CTAs |
| `/discover` | Discover | Browse/search all tracks |
| `/library` | Library | User's saved music |
| `/song/:id` | SongDetail | Track details + purchase |
| `/create` | CreateDashboard | Creator upload + analytics |
| `/profile` | Profile | User settings + wallet |

## Key Architecture Decisions

### State Management
- **WalletContext**: Global wallet connection state via React Context
- **Component-local state**: Each page manages its own UI state with `useState`
- No external state library (Redux, Zustand) - Context is sufficient for current scope

### Wallet Integration
- Uses BSV SDK's `WalletClient` for blockchain operations
- Identity key (public key) serves as user identifier
- No traditional auth - wallet IS the authentication

### Responsive Design
- `useIsMobile()` hook detects viewport width < 768px
- Components render different layouts based on mobile flag
- Mobile has bottom navigation bar, desktop has top nav

### Styling Approach
- Tailwind utility classes for common patterns
- Inline styles for dynamic/complex values
- CSS file (`index.css`) for animations and glass effects

## Current State

**Implemented:**
- Full UI for all pages (responsive)
- Wallet connection flow
- Navigation (mobile + desktop)
- Search and filtering
- Premium dark theme with animations

**Mock/Placeholder:**
- All song data is hardcoded
- No backend API integration
- Purchase flow UI only (no transactions)
- Upload flow UI only (no file handling)

## Development Priorities

1. Backend API service layer
2. Real data fetching with React Query
3. Transaction processing via BSV SDK
4. File upload for track creation
5. Error boundaries and loading states
