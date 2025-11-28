# Pages Directory

Route-level page components. Each page is self-contained with its own mock data and UI components.

## Page Structure Pattern

All pages follow this structure:
```typescript
import { useState } from 'react'
import { /* icons */ } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

// Mock data array
const mockData = [...]

export default function PageName() {
  const isMobile = useIsMobile()
  const [state, setState] = useState(...)

  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingBottom: isMobile ? '100px' : '0' }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div className="animate-pulse-slow" style={{ /* gradient orb */ }} />
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '20px 16px' : '40px' }}>
        {/* Page-specific content */}
      </div>
    </div>
  )
}
```

## Pages Overview

### Landing.tsx (~400 lines)
Hero landing page with animated background.

**State:** None (static)
**Features:**
- Large gradient title
- Feature highlights
- CTA buttons to Discover/Create
- Floating animated elements

### Discover.tsx (~720 lines)
Browse and search all tracks.

**State:**
- `selectedGenre` - Genre filter
- `sortBy` - Sort option (trending/new/top)
- `searchQuery` - Search text
- `isSearchFocused` - Search input focus

**Features:**
- Search bar with keyboard hint (⌘K)
- Genre filter pills (horizontal scroll)
- Sort dropdown
- Song card grid (responsive columns)
- Stats header (total tracks, trending)

**Mock Data:** `mockSongs[]` with full song objects

### Library.tsx (~800 lines)
User's saved music collection.

**State:**
- `viewMode` - 'grid' | 'list'
- `searchQuery` - Filter library
- `selectedCategory` - 'All' | 'Liked' | 'Recent' | 'Albums'
- `playingId` - Currently playing track
- `isSearchFocused` - Search focus

**Features:**
- Category sidebar (desktop) / tabs (mobile)
- Grid/List view toggle
- Search filter
- Play button overlay on cards
- Recently played section

**Mock Data:** `mockLibrarySongs[]`

### SongDetail.tsx (~600 lines)
Individual track detail page.

**State:**
- `isPlaying` - Play/pause
- `isLiked` - Like toggle
- `currentTime` - Playback progress
- `showPurchaseModal` - Modal visibility

**Features:**
- Large album art with play button
- Track metadata (BPM, genre, duration)
- Purchase options (stream vs exclusive)
- Purchase modal with fee breakdown
- Related tracks section
- Artist info card

**Route Param:** `/song/:id`

### CreateDashboard.tsx (~1160 lines)
Creator upload and analytics.

**State:**
- `showUploadModal` - Upload modal visibility
- `hoveredCard` - Card hover state
- Modal form: `prompt`, `title`, `genre`, `streamPrice`, `exclusivePrice`, `isExclusive`

**Features:**
- Upload CTA with modal
- 3-step upload wizard (Generate → Details → Pricing)
- Analytics cards (earnings, streams, tracks)
- Track list with edit/delete actions
- Earnings chart placeholder

**Mock Data:** `mockCreatorSongs[]`

### Profile.tsx (~712 lines)
User profile and settings.

**State:**
- `copied` - Clipboard copy feedback
- `hoveredCard` / `hoveredButton` / `hoveredActivity` - Hover states

**Features:**
- Wallet address display (truncated + full)
- Copy to clipboard button
- Stats cards (balance, earnings, streams, tracks)
- Activity feed (streams, purchases, uploads)
- Quick action buttons

**Uses:** `useWallet()` from WalletContext

## Common UI Elements (Inline)

### Song/Track Card
```typescript
<div
  onMouseEnter={() => setHoveredId(id)}
  onMouseLeave={() => setHoveredId(null)}
  style={{
    background: 'rgba(20, 20, 25, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    overflow: 'hidden',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
  }}
>
  {/* Cover image with play overlay */}
  {/* Title + Artist */}
  {/* Price + Stream count */}
  {/* Exclusive badge if applicable */}
</div>
```

### Stats Card
```typescript
<div style={{
  background: 'rgba(20, 20, 25, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.08)',
  padding: '24px',
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <IconComponent />
    <span>{label}</span>
  </div>
  <div style={{ fontSize: '32px', fontWeight: '700' }}>{value}</div>
</div>
```

### Modal Pattern
```typescript
{showModal && (
  <div style={{
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      background: 'rgba(20,20,25,0.95)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.1)',
      maxWidth: '500px',
      width: '90%',
    }}>
      {/* Modal content */}
    </div>
  </div>
)}
```

## Refactoring Opportunities

1. **Extract shared components:**
   - `<SongCard />` - Used in Discover, Library, SongDetail
   - `<StatCard />` - Used in CreateDashboard, Profile
   - `<Modal />` - Used in SongDetail, CreateDashboard
   - `<SearchInput />` - Used in Discover, Library
   - `<GenrePill />` - Used in Discover, Library

2. **Move mock data:**
   - Create `src/data/mockSongs.ts`
   - Share between pages

3. **Create types file:**
   - `src/types/index.ts` with Song, Activity, Stats interfaces

4. **Add API layer:**
   - `src/services/api.ts` for data fetching
   - Replace mock data with React Query calls
