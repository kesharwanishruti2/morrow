# Morrow — Frontend Documentation & Recent Changes

Morrow is a curated marketplace platform for pre-loved furniture, unique decor, lighting, and vintage gems built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Redux Toolkit**.

---

## 🛠️ Summary of Recent Changes & Fixes

### 1. Tailwind CSS v4 & Styling Config ([index.css](src/index.css))
- **`@theme` Configuration**: Configured custom theme tokens for Tailwind CSS v4 (`--color-background`, `--color-primary`, `--color-dark`, `--color-card`, `--color-terracotta`, etc.).
- **CSS Reset**: Fixed an invalid `margin: 2;` rule under `*` that was disrupting element margins and layout across all pages.

### 2. Home Page Polish & De-duplication ([Home.tsx](src/pages/Home.tsx))
- **Hero Banner**: Polished responsive grid layout, typography, action buttons (**Explore Listings** and **Browse Categories**), and hero image.
- **De-duplication**: Removed redundant duplicate product grids and category filter pills that were repeating on the home page.
- **Shop by Category**: Added hover zoom effect (`group-hover:scale-105`) and gradient overlays for the 4 featured categories.
- **Featured Products**: Added a clean curated product showcase with animated skeleton loading states.
- **Seller CTA**: Added a dedicated "Become a Seller" call-to-action banner linking to `/listings/add`.

### 3. Header Navigation ([Navbar.tsx](src/components/Navbar.tsx))
- **Double Home Rendering Fix**: Fixed the issue where `Navbar.tsx` had accidentally been overwritten with duplicate `Home.tsx` code, causing the entire home page to render twice on `/`.
- **Navigation Links**: Preserved clean links for **Home** (`/`), **Listings** (`/listings`), and **Categories** (`/category`) with active underline indicators.
- **Auth Actions**:
  - **Logged-out State**: Clean **Login** and **Sign Up** links with smooth hover transitions (without awkward background boxes).
  - **Logged-in State**: Shows **Dashboard**, **+ Sell Item** button, user avatar initial, and **Logout**.
- **Mobile Menu**: Responsive slide-down drawer with full navigation and authentication controls.

### 4. Seller Sidebar & Dashboard ([SellerSidebar.tsx](src/components/SellerSidebar.tsx))
- **Sticky Positioning**: Configured `sticky top-0 h-screen` so the sidebar remains pinned to the left while the seller scrolls on the main page.
- **Clean Icons**: Replaced raw Unicode text characters with crisp SVG icons for **Overview**, **My Listings**, **Add a listing**, **Storefront**, and **Logout**.
- **Fixed Logout Handler**: Fixed `onClick={handleLogout}` (was previously `onClick={()=>handleLogout}` which failed to execute on click).
- **Session Cleanup**: Ensured `localStorage.removeItem("accessToken")`, Redux state reset (`logout()`), and navigation to `/login` run reliably.
- **Storefront Link**: Added quick link back to the public marketplace.

### 5. Authentication Modals & Pages ([Loginpage.tsx](src/pages/Loginpage.tsx), [Register.tsx](src/pages/Register.tsx))
- **Labels & Terminology**: Consistent **Login** and **Sign Up** labels, action buttons, and redirection links.
- **Backend Logout Sync ([auth.controller.js](../backend/src/controller/auth.controller.js))**: Updated controller to safely extract `userId` from `req.user` (JWT payload) or `req.body` and clear cookies properly.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
