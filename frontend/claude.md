# Frontend Architecture

React 19 + TypeScript + Vite application with BSV wallet integration.

## Directory Structure

```
src/
├── App.tsx                 # Root: WalletProvider → Router → Routes
├── main.tsx               # React DOM entry point
├── index.css              # Global styles, animations, glass effects
├── components/
│   └── Navigation.tsx     # App-wide nav (desktop sticky top, mobile bottom bar)
├── pages/
│   ├── Landing.tsx        # Hero with gradient orbs, CTAs
│   ├── Discover.tsx       # Track grid with genre filter, search, sort
│   ├── Library.tsx        # User collection with sidebar categories
│   ├── SongDetail.tsx     # Track player, purchase modal, related tracks
│   ├── CreateDashboard.tsx # Upload modal, creator analytics, track list
│   └── Profile.tsx        # Stats cards, activity feed, wallet info
├── contexts/
│   └── WalletContext.tsx  # Wallet state: identityKey, connect(), disconnect()
├── hooks/
│   └── useIsMobile.ts     # Responsive hook (breakpoint: 768px)
└── lib/
    ├── wallet.ts          # getIdentityKey(), isWalletAvailable()
    └── walletClient.ts    # BSV SDK WalletClient singleton
```

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite config with React plugin |
| `tsconfig.app.json` | TypeScript strict mode, ES2022 target |
| `tailwind.config.js` | Tailwind content paths |
| `postcss.config.js` | Tailwind + Autoprefixer |
| `eslint.config.js` | ESLint + React Hooks rules |

## Dependencies

**Runtime:**
- `react` / `react-dom` ^19.2.0
- `react-router-dom` ^7.9.6
- `@bsv/sdk` ^1.9.11
- `lucide-react` ^0.554.0

**Dev:**
- `vite` ^7.2.4
- `typescript` ~5.9.3
- `tailwindcss` ^4.1.17
- `eslint` with TypeScript + React plugins

## State Management

### WalletContext (`contexts/WalletContext.tsx`)

```typescript
interface WalletContextType {
  identityKey: string | null   // User's BSV public key
  isConnecting: boolean        // Loading state
  isConnected: boolean         // Derived: identityKey !== null
  connect: () => Promise<void> // Trigger wallet connection
  disconnect: () => void       // Clear identity key
}
```

**Usage:**
```typescript
const { isConnected, connect, identityKey } = useWallet()
```

### Page-Level State Patterns

Pages use `useState` for local UI state:
- `searchQuery` - Search input value
- `selectedGenre` / `selectedCategory` - Filter selections
- `viewMode` - Grid vs list toggle
- `isPlaying` - Playback state
- `showModal` - Modal visibility
- `hoveredCard` - Hover effects

## Responsive Design

### useIsMobile Hook

```typescript
const isMobile = useIsMobile()        // Default: 768px
const isMobile = useIsMobile(1024)    // Custom breakpoint
```

### Layout Pattern

```typescript
if (!isMobile) {
  return <DesktopLayout />
}
return <MobileLayout />
```

### Navigation Behavior
- **Desktop:** Sticky top nav with centered links, wallet button right
- **Mobile:** Minimal top header + fixed bottom nav bar with 4 icons

## Styling System

### Tailwind Classes
Standard utility classes for layout, spacing, colors.

### Custom CSS Classes (`index.css`)

| Class | Effect |
|-------|--------|
| `.glass` | Glassmorphism (blur + semi-transparent bg) |
| `.glass-strong` | Stronger glass effect |
| `.gradient-text` | Purple→Pink gradient text |
| `.hover-lift` | Lift on hover with shadow |
| `.animate-fade-in` | Fade in from below |
| `.animate-slide-up` | Slide up entrance |
| `.animate-pulse-slow` | Background orb pulse |
| `.animate-glow` | Glowing box shadow |
| `.animate-float` | Floating animation |
| `.card-glow` | Hover glow effect |
| `.btn-press` | Button press scale |

### Inline Styles
Complex dynamic styles use inline `style` prop:
```typescript
style={{
  background: isActive ? 'linear-gradient(...)' : 'transparent',
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
}}
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | `#9333ea` | Primary accent |
| Pink | `#db2777` | Secondary accent |
| Black | `#000000` | Background |
| Dark Gray | `rgba(20,20,20,0.8)` | Card backgrounds |
| White | `#ffffff` | Text |
| Gray | `rgba(255,255,255,0.5-0.7)` | Secondary text |

## Wallet Integration

### Connection Flow

1. User clicks "Connect Wallet"
2. `connect()` sets `isConnecting = true`
3. `getIdentityKey()` calls BSV SDK
4. SDK prompts user's wallet extension
5. Returns public key → stored as `identityKey`
6. `isConnected` derived as `true`

### BSV SDK Usage

```typescript
// lib/walletClient.ts
export const walletClient = new WalletClient()

// lib/wallet.ts
export async function getIdentityKey(): Promise<string> {
  const result = await walletClient.getPublicKey({ identityKey: true })
  return result.publicKey
}
```

## Data Types (Inline - No Types File)

### Song Object
```typescript
{
  id: string
  title: string
  artist: string           // Truncated wallet address
  artistName?: string      // Display name
  genre: string
  coverUrl: string
  duration: string         // "3:42"
  streamPrice: number      // Per-stream cost USD
  totalStreams: number
  earnings: number
  isExclusive: boolean
  exclusivePrice?: number
  tags?: string[]
  bpm?: number
}
```

## Routing

**App.tsx structure:**
```typescript
<WalletProvider>
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/library" element={<Library />} />
      <Route path="/song/:id" element={<SongDetail />} />
      <Route path="/create" element={<CreateDashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
</WalletProvider>
```

## Common Patterns

### Conditional Rendering
```typescript
{isConnected ? <ConnectedUI /> : <ConnectPrompt />}
```

### Filter/Search
```typescript
const filteredSongs = songs.filter(song =>
  song.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (selectedGenre === 'All' || song.genre === selectedGenre)
)
```

### Hover State
```typescript
const [hoveredId, setHoveredId] = useState<string | null>(null)

<div
  onMouseEnter={() => setHoveredId(song.id)}
  onMouseLeave={() => setHoveredId(null)}
  style={{ transform: hoveredId === song.id ? 'scale(1.02)' : 'scale(1)' }}
/>
```

## Development Commands

```bash
npm run dev      # Start Vite dev server (port 5175)
npm run build    # tsc -b && vite build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Known Issues / TODOs

1. **Large page files** - Pages are 700-1200 lines, should extract components
2. **Mock data everywhere** - Need API integration
3. **No error boundaries** - Add React error boundaries
4. **No loading states** - Add skeleton loaders
5. **Duplicate card components** - Extract to shared component library
6. **No type definitions file** - Create `src/types/index.ts`
7. **Missing tests** - Add Vitest test suite
