# SakBhaji Component Structure

This document outlines the reusable UI component architecture for the SakBhaji Dashboard. It relies heavily on `shadcn/ui` for accessible, customizable base components and atomic design principles.

## 1. UI Components (`src/components/ui/`)
These are generic, highly reusable atomic components provided by `shadcn/ui`.
- `Button`: Standardized buttons with variants (default, outline, ghost, destructive).
- `Input` / `Select` / `Textarea`: Form controls.
- `Card`: For KPI displays and container blocks.
- `Table`: Standardized data tables with headers, rows, and cells.
- `Badge`: For displaying statuses (e.g., Pending, Delivered) with color coding.
- `Drawer` / `Dialog`: For side-overlays (Order Details) and modal actions.
- `Tabs`: For switching between views (e.g., Sales vs. Product analytics).

## 2. Layout Components (`src/components/layout/`)
Provide the structural shell of the application.
- `Sidebar`: Desktop navigation menu with icons (Home, Orders, Analytics).
- `MobileNav`: Bottom tab bar or hamburger menu for mobile-first experience.
- `Header`: Top bar containing Page Title, User Profile, and Quick Actions.

## 3. Dashboard Components (`src/components/dashboard/`)
Specific to the SakBhaji business logic.
- `KPICard`: Reusable metric card taking `title`, `value`, `icon`, and `trend` props.
- `RecentOrdersTable`: A simplified table for the home page.
- `RealtimeOrderRow`: A row component optimized for re-rendering upon real-time updates.
- `OrderDetailsContent`: The business logic wrapper inside the `Drawer` to show items, address, and total.

## 4. Analytics Components (`src/components/analytics/`)
Wrappers around Recharts to ensure consistent styling.
- `RevenueChart`: A responsive Area/Bar chart displaying revenue over time.
- `TopProductsList`: A custom list view showing fast-moving items.
- `CustomerInsightCard`: Specifically formatted card for customer segmentation (VIPs, Inactive).

## 5. Design System Tokens (Tailwind)
The dashboard uses a "SakBhaji Green" primary color palette to simulate a fresh, market aesthetic.
- **Primary:** `hsl(142.1 76.2% 36.3%)` (Fresh Green)
- **Background:** `hsl(0 0% 100%)` (Clean White)
- **Card:** Soft rounded corners (`rounded-xl` or `rounded-2xl`) and minimal borders.
- **Shadows:** Soft, diffused shadows (`shadow-sm`, `shadow-md`).
