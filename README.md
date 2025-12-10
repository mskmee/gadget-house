# React + TypeScript + Vite

Gadget House is a React + TypeScript e‑commerce frontend for browsing and purchasing electronics (smartphones, laptops, tablets, TVs, consoles, etc.).  
It provides a full customer flow (catalog, search, product details, basket, checkout, user account) and an admin area for managing orders/invoices, with authentication and token refresh handled against a backend API.

---

## Features

- **Product catalog**
  - Category pages (smartphones, laptops, tablets, TVs, consoles, kids, sale, etc.).
  - Main landing page with highlighted products and sections.
  - Single product page with detailed information.

- **Search & filtering**
  - Search by query with:
    - **Results page** if matches are found.
    - **“No results” page** when nothing matches.
  - Category filters and sorting (via Redux slices).

- **Shopping basket & checkout**
  - Basket page with list of products, quantities, prices.
  - Order confirmation (checkout) page.
  - Order success page with order id.
  - “Viewed” and “Favorites” support via Redux store.

- **Authentication & account**
  - Sign up / sign in with e‑mail and password.
  - Forgot password + change password flows.
  - Auth token storage in `localStorage` and automatic refresh on 401.
  - User dashboard:
    - Account details page.
    - Favorites page.
    - Orders history page.
  - Personal data & contacts editable from dashboard.

- **Admin area**
  - Admin login.
  - Admin layout and pages for managing orders/invoices.

- **Internationalization & UI**
  - Ant Design UI library (`antd`) configured with Ukrainian locale (`uk_UA`).
  - Shared layout with header/footer and nested routing.
  - Toast notifications (`react-toastify`).
  - Responsive layout (`react-responsive`).

- **State management & data fetching**
  - Global state with **Redux Toolkit**.
  - **RTK Query** for orders/auth APIs with a custom `baseQuery` that:
    - Sends access token in `Authorization` header.
    - Refreshes token with `refreshToken` on `401` and retries the original request.
    - Forces logout and redirect to sign‑in on refresh failure.
  - Custom `authService` and `authApi` for auth-related HTTP requests.

---

## Tech Stack

- **Core**
  - [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/) as the build tool
  - [React Router DOM v6](https://reactrouter.com/) with `createBrowserRouter`
  - [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
  - [React Redux](https://react-redux.js.org/)

- **UI & UX**
  - [Ant Design](https://ant.design/) with `ConfigProvider` and Ukrainian locale
  - [react-toastify](https://fkhadra.github.io/react-toastify/)
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Swiper](https://swiperjs.com/) for sliders
  - [react-responsive](https://github.com/contra/react-responsive) for media queries
  - [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)
  - [react-icons](https://react-icons.github.io/react-icons/)

- **Forms & validation**
  - [Formik](https://formik.org/)
  - [Yup](https://github.com/jquense/yup)
  - [zxcvbn](https://github.com/dropbox/zxcvbn) for password strength

- **HTTP & utilities**
  - Custom HTTP client & `request` wrapper
  - `axios` (for some calls)
  - `lodash.debounce`, `classnames`, `dayjs`, `dompurify`, `rxjs`
  - Custom `localStorageService` for typed local storage access

- **Tooling**
  - ESLint + TypeScript ESLint
  - Prettier
  - Stylelint
  - Husky + lint-staged
  - Vite SVGR plugin for SVG imports
  - Dockerfile, Netlify config (`netlify.toml`)

---

## Project Structure

Relevant top-level layout:

```txt
gadget-house/
├─ public/                 # Static assets
├─ src/
│  ├─ App.tsx              # Main application component
│  ├─ main.tsx             # React entry point, wraps App in Providers
│  ├─ routes.tsx           # App routes configuration
│  ├─ assets/              # Images, icons, SVGs, etc.
│  ├─ components/          # Reusable UI components
│  ├─ constants/           # App-wide constants (pagination, flags, etc.)
│  ├─ context/             # Context providers (e.g., locale)
│  ├─ enums/               # Enums (routes, data status, etc.)
│  ├─ hooks/               # Custom hooks
│  ├─ pages/               # Page-level views (Main, Category, Basket, Auth, Admin, etc.)
│  ├─ providers/           # App-wide providers (e.g., StorageProvider)
│  ├─ store/               # Redux store, slices, RTK Query APIs, baseQuery
│  ├─ styles/              # Global SCSS styles (globals.scss)
│  ├─ types/               # Shared TypeScript types
│  └─ utils/               # Utility modules (auth, http, local storage, helpers)
├─ .env.example            # Example env variables (API base URL, etc.)
├─ Dockerfile
├─ netlify.toml
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

Key files:

- `src/main.tsx`
  - Bootstraps React with:
    - `Provider` (Redux store),
    - `ConfigProvider` (Ant Design, Ukrainian locale, theme),
    - `ToastContainer`,
    - Renders `App`.
- `src/App.tsx`
  - Connects `RouterProvider` to `routes`.
  - Uses `StorageProvider`, `LocaleProvider`.
  - On mount:
    - Loads all products for the main page (if not already loaded).
    - Fetches user data if `userToken` exists.
- `src/routes.tsx`
  - All routes defined via `createBrowserRouter`.
  - Pages include:
    - `/` – `Main`
    - `/:category` – category listing
    - `/:category/:id/:title` – single product
    - `/search` / `/search-results`
    - `/basket`, `/order`, `/order-success/:order-id`
    - `/sign-in`, `/sign-up`, `/forgot-password`, `/change-password`
    - `/dashboard/:user-id`, favorites, orders
    - `/admin`, `/admin/:id`, `/auth/login-admin`
    - Fallback `NotFound`.

- `src/store/index.ts`
  - Configures the Redux store and combines slices:
    - `shopping_cart`, `search`, `products`, `filters`, `singleProduct`, `auth`, `authPortals`, `ui`
    - `ordersApi`, `authApi` (RTK Query)
  - Adds `toastMiddleware`, `logger` in development.
  - Exports `store`, `RootState`, `AppDispatch`, and `extraArgument` with `routes`.

- `src/store/base-query.ts`
  - RTK Query base query with:
    - Base URL from `VITE_BASE_URL`.
    - `Authorization` header from `localStorage`.
    - 401 handler that tries to refresh the token via `/updateAccessToken`.
    - On failure, clears tokens and redirects to sign-in.

- `src/utils/packages/auth/`
  - `auth-api.ts`: low-level HTTP calls for sign in, sign up, forgot/change password, profile, update personal data/contacts.
  - `auth-service.ts`: wraps `authApi` and exposes service methods to the rest of the app.

- `src/store/auth/`
  - `auth-slice.ts`: auth state (tokens, user, loading status), reducers `setTokens`, `logout` and extra reducers for async thunks.
  - `actions.ts`: thunks:
    - `getCredentials`, `createUser`, `forgotPassword`, `changePassword`, `getUserData`,
    - `updateUserPersonalData`, `updateUserContacts`.

- `src/pages/Auth/libs/hooks/use-auth.ts`
  - Custom hook coordinating auth forms and flows:
    - Active form (login/register/forgot/permission),
    - Form state,
    - Dispatching auth thunks,
    - Navigating on success.

---

## Getting Started

### Prerequisites

- Node.js (recommended: use version specified in `.nvmrc`).
- npm (comes with Node).

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

For API calls you must create a `.env` file in the project root.

Use `.env.example` as a reference:

```bash
cp .env.example .env
```

Then open `.env` and fill in the required values (e.g. base URL for the backend API):

```env
VITE_BASE_URL=https://your-api-base-url.example.com
# ...other VITE_* variables as needed
```

> All environment variables that must be visible in the client must be prefixed with `VITE_` (Vite rule).

---

## Scripts

Available npm scripts (from `package.json`):

- **Start development server**

  ```bash
  npm run dev
  ```

  Runs Vite dev server with HMR.

- **Build for production**

  ```bash
  npm run build
  ```

  Creates a production build in `dist/`.

- **Preview production build**

  ```bash
  npm run preview
  ```

  Serves the built app locally for testing.

- **Lint & formatting**

  - Check formatting with Prettier:

    ```bash
    npm run lint:prettify
    ```

  - Auto-format with Prettier:

    ```bash
    npm run prettify
    ```

  - CSS lint:

    ```bash
    npm run lint:css
    ```

  - JS/TS lint:

    ```bash
    npm run lint:js
    ```

  - TypeScript type check:

    ```bash
    npm run lint:ts
    ```

  - Run all lints:

    ```bash
    npm run lint
    ```

- **Husky prepare**

  ```bash
  npm run prepare
  ```

  Installs Husky hooks.

---

## Routing Overview

Routes are defined in `src/enums/Route.ts` and used in `src/routes.tsx`.

Important route paths:

- `/` – root (Main)
- `/:category` – category listing
- `/all-products`, `/smartphone`, `/laptop`, `/tablet`, `/tv`, `/console`, `/for-kids`, `/sale`, etc.
- `/basket` – basket page
- `/order` – order confirmation
- `/order-success/:order-id` – success screen
- `/sign-in`, `/sign-up`, `/forgot-password`, `/change-password`
- `/dashboard/:user-id` – user account
  - `/dashboard/:user-id/favorites`
  - `/dashboard/:user-id/orders`
- `/admin` – admin main page
- `/admin/:id` – admin invoice details
- `/auth/login-admin` – admin login
- `*` – not found

---

## Authentication Flow

- On sign in:
  - `getCredentials` thunk calls `authService.signInAuth`.
  - Access and refresh tokens are stored in `localStorage` and in Redux state.
- On app start:
  - `App.tsx` checks if `userToken` exists and `user` is not loaded, then dispatches `getUserData`.
- On API calls:
  - `baseQuery` attaches access token to headers.
  - On 401, it attempts to refresh the token.
  - On refresh failure, user is logged out and redirected to `/sign-in`.
- User can update:
  - Personal data (`updateUserPersonalData`),
  - Contact info (`updateUserContacts`).

---

## Deployment

The repo includes:

- `Dockerfile` – for containerized builds.
- `netlify.toml` – basic Netlify configuration.

Deployment steps depend on your platform, but typically:

1. Ensure `.env` is configured for production.
2. Build the app: `npm run build`.
3. Serve the `dist/` folder (e.g. via Netlify, Docker, or any static hosting).

---

## Development Notes

- Components and pages are written in TypeScript with strict typing.
- Styling uses SCSS via `globals.scss` and component-level styles.
- Linting and formatting are enforced via Husky and lint-staged on commit.
- The code is organized so that:
  - `store/` contains all Redux logic,
  - `utils/` contains reusable utilities (http, auth, local storage, etc.),
  - `pages/` contain route-level views,
  - `components/` contain smaller reusable blocks.

---

## License

This project is provided as-is for development and learning purposes.  
If you plan to distribute it or use it commercially, adjust this section to your preferred license.

