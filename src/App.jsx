import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import useProducts from './hooks/useProducts';
import './App.css';

function App() {
  // Standard hook - tracks search input
  var searchState = useState('');
  var searchQuery = searchState[0];
  var setSearchQuery = searchState[1];

  // Custom hook - all product data and CRUD via db.json backend
  var productData = useProducts();

  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <div className="page-wrapper">
        <Switch>

          {/* Route 1 - Home / landing page */}
          <Route exact path="/">
            <HomePage />
          </Route>

          {/* Route 2 - View all products */}
          <Route path="/products">
            <ProductsPage
              products={productData.products}
              loading={productData.loading}
              error={productData.error}
              searchQuery={searchQuery}
              onDelete={productData.deleteProduct}
            />
          </Route>

          {/* Route 3 - Add a new product */}
          <Route path="/add-product">
            <AddProductPage onAdd={productData.addProduct} />
          </Route>

          {/* Route 4 - Single product detail and edit */}
          <Route path="/product/:id">
            <ProductDetailPage
              products={productData.products}
              onUpdate={productData.updateProduct}
              onDelete={productData.deleteProduct}
            />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
