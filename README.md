# Admin Portal — React SPA

An e-commerce admin portal built with React. 

## Setup

```bash
npm install
npm run backend
npm start
```

Opens at http://localhost:3000

## Run Tests

```bash
npm test
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home page |
| `/products` | View all products + search |
| `/add-product` | Add a new product |
| `/product/:id` | View, edit, or delete a product |

## Features
- View all products
- Add a new product (form with validation)
- Edit any product field (name, price, stock, etc.)
- Delete a product
- Search by name or category
- Responsive layout



```bash


## File Structure

```
src/
  index.jsx
  App.jsx
  App.css
  hooks/
    useProducts.jsx       ← custom hook (add, update, delete)
  components/
    Navbar.jsx / .css
    ProductCard.jsx / .css
  pages/
    HomePage.jsx / .css
    ProductsPage.jsx / .css
    AddProductPage.jsx / .css
    ProductDetailPage.jsx / .css
  __tests__/
    HomePage.test.jsx
    ProductsPage.test.jsx
    AddProductPage.test.jsx
    ProductDetailPage.test.jsx
    Navbar.test.jsx
``
