# AdminPortal — React SPA

A full-featured e-commerce admin portal built with React. Manage your store's product catalogue from one place — add new products, edit prices, track stock levels, search by name or category, and filter by category.

🔗 **Live Demo:** [https://aadminshowcase.vercel.app](https://aadminshowcase.vercel.app)

---

## Features

- 📦 View all products in a responsive grid
- ➕ Add new products with form validation
- ✏️ Edit any product's name, price, category, stock, and description
- 🗑️ Delete products with a confirmation prompt
- 🔍 Search products in real time by name or category
- 🗂️ Filter products by category using a sidebar with checkboxes
- 🔄 Full CRUD via a local JSON backend (json-server)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Routing | React Router v5 |
| State & Data | Custom hook (`useProducts`) |
| Backend | json-server (local) |
| Build Tool | Vite |
| Testing | Vitest + React Testing Library |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/felicien51/Adminshowcase.git
cd Adminshowcase
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Runs json-server on `http://localhost:3001`:

```bash
npm run backend
```

### 4. Start the frontend

Runs the Vite dev server on `http://localhost:3000`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Both the backend and frontend need to be running at the same time. Use two terminal windows.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run backend` | Start json-server on port 3001 |
| `npm test` | Run the Vitest test suite |

---

## Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with feature overview |
| `/products` | Products | View, search, and filter all products |
| `/add-product` | Add Product | Form to add a new product |
| `/product/:id` | Product Detail | View, edit, or delete a product |

---

## Project Structure

```
Adminshowcase/
├── db.json                         # json-server database
├── vite.config.js                  # Vite + Vitest configuration
├── index.html                      # App entry point
└── src/
    ├── index.jsx                   # React root render
    ├── App.jsx                     # Router + global state
    ├── App.css
    ├── hooks/
    │   └── useProducts.jsx         # Custom hook — all CRUD logic
    ├── components/
    │   ├── Navbar.jsx              # Navigation + search bar
    │   ├── Navbar.css
    │   ├── ProductCard.jsx         # Product tile with delete button
    │   └── ProductCard.css
    ├── pages/
    │   ├── HomePage.jsx            # Landing page
    │   ├── ProductsPage.jsx        # Grid + search + category filter sidebar
    │   ├── AddProductPage.jsx      # Add product form
    │   └── ProductDetailPage.jsx   # View / edit / delete single product
    └── __tests__/
        ├── useProducts.test.jsx    # Hook tests (GET, POST, PATCH, DELETE)
        ├── HomePage.test.jsx
        ├── ProductsPage.test.jsx
        ├── AddProductPage.test.jsx
        ├── ProductDetailPage.test.jsx
        └── Navbar.test.jsx
```

---

## Custom Hook — `useProducts`

All product data and API calls are managed in a single custom hook:

```js
const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
```

| Value | Type | Description |
|---|---|---|
| `products` | Array | All products from the backend |
| `loading` | Boolean | True while a request is in flight |
| `error` | String | Error message if a request fails |
| `addProduct(data)` | Function | POST a new product |
| `updateProduct(id, changes)` | Function | PATCH an existing product |
| `deleteProduct(id)` | Function | DELETE a product by id |

---

## Category Filter Sidebar

The Products page includes a sidebar that lets users filter by one or more categories simultaneously. Filters combine with the search bar — only products matching both the search query and the selected categories are shown.

Available categories: Electronics, Clothing, Footwear, Kitchen, Drinks, Food, Beauty, Other.

A **Clear filters** button appears whenever any category is selected.

---

## Testing

Run the full test suite:

```bash
npm test
```

Tests are written with **Vitest** and **React Testing Library**, covering all 6 components and the custom hook (30 tests total).

```
src/__tests__/
  useProducts.test.jsx       ← 6 tests (GET, POST, PATCH, DELETE, error, loading)
  HomePage.test.jsx          ← 4 tests
  Navbar.test.jsx            ← 4 tests
  ProductsPage.test.jsx      ← 6 tests
  AddProductPage.test.jsx    ← 4 tests
  ProductDetailPage.test.jsx ← 6 tests
```

---

## License

MIT
