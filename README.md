# 🍽️ Restaurant Manager

A frontend restaurant management app built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Users can browse, search, add, and view detailed info for restaurants — with data persisted via localStorage.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/restaurant-manager.git
cd restaurant-manager
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Home page (/)
│   ├── layout.tsx                      # Root layout with provider
│   ├── globals.css                     # Global styles
│   ├── restaurants/
│   │   └── page.tsx                    # All restaurants listing (/restaurants)
│   ├── manage/
│   │   └── restaurant/
│   │       └── add/
│   │           └── page.tsx            # Add restaurant form (/manage/restaurant/add)
│   └── restaurant/
│       └── [slug]/
│           └── page.tsx                # Restaurant detail page (/restaurant/[slug])
│
├── components/
│   ├── Header.tsx                      # App header with search + nav
│   ├── RestaurantCard.tsx              # Reusable restaurant card
│   ├── SearchBar.tsx                   # Controlled search input
│   └── RestaurantForm.tsx              # Add restaurant form fields
│
├── context/
│   └── RestaurantContext.tsx           # Global state + localStorage sync
│
├── types/
│   └── restaurant.ts                   # TypeScript types
│
└── lib/
    ├── mockData.ts                     # Sample restaurants
    └── utils.ts                        # Slug generator + helpers
```

---

## 🗺️ Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured restaurants and search |
| `/restaurants` | Full listing with search and type filter |
| `/manage/restaurant/add` | Form to add a new restaurant |
| `/restaurant/[slug]` | Dynamic detail page for each restaurant |

---

## ✨ Features

- **Browse restaurants** in a responsive card grid
- **Search** restaurants by name (client-side filtering)
- **Filter by type** — Cafe, Fine Dining, Fast Food, Cloud Kitchen
- **Add new restaurants** via a validated form
- **Persistent data** — restaurants saved to localStorage, survive page refresh
- **Dynamic routing** — each restaurant has its own URL via slug
- **Responsive UI** — works on mobile, tablet, and desktop

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework + routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Context API | Global state management |
| localStorage | Client-side data persistence |

---

## 🧩 Key Components

### `RestaurantCard`
Reusable card component. Displays image, name, type badge, and address. Clicking navigates to the detail page.

### `SearchBar`
Controlled input component. Accepts `value` and `onChange` props for parent-managed filtering.

### `Header`
App-wide header with the title, search bar, and "Add Restaurant" CTA button.

### `RestaurantForm`
Full form for adding a restaurant. Includes validation, slug generation on submit, and redirect on success.

---

## 🗃️ Data Model

```ts
type Restaurant = {
  id: string
  slug: string
  name: string
  ownerName: string
  mobile: string
  address: {
    line1: string
    area: string
    city: string
    state: string
    pincode: string
  }
  type: 'Cafe' | 'Fine Dining' | 'Fast Food' | 'Cloud Kitchen'
  imageUrl: string
}
```

---

## 🔧 Utility Functions

### `generateSlug(name: string): string`
Converts a restaurant name to a URL-safe slug.

```ts
generateSlug("The Spice Garden!")  // → "the-spice-garden"
generateSlug("KFC Fast Food")      // → "kfc-fast-food"
```

---

## 📦 LocalStorage

Data is stored under the key `restaurants` in the browser's localStorage.

- On first load, mock data is seeded automatically.
- Every new restaurant added via the form is persisted immediately.
- To reset data: open DevTools → Application → Local Storage → delete the `restaurants` key.

---

## 🧪 Testing Routes

| URL | Expected |
|-----|----------|
| `localhost:3000/` | Home with restaurant cards |
| `localhost:3000/restaurants` | Full listing + filters |
| `localhost:3000/manage/restaurant/add` | Add form |
| `localhost:3000/restaurant/the-spice-garden` | Detail page |
| `localhost:3000/restaurant/fake-slug` | "Not found" message |

---

## 🌱 Bonus Features (Optional)

- [ ] Debounced search
- [ ] Edit restaurant
- [ ] Delete with confirmation modal
- [ ] Pagination or infinite scroll

---

made with ❤️ by Keshav chauhan