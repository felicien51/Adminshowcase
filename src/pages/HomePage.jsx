import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to the Admin Portal</h1>
        <p>Manage your store products from one place. Add new products, edit prices, track stock, and search your catalogue.</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-blue">View Products</Link>
          <Link to="/add-product" className="btn-white">+ Add Product</Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature">
          <h2>📦 Manage Products</h2>
          <p>View all products, update their details, or remove them from the store.</p>
        </div>
        <div className="feature">
          <h2>➕ Add Products</h2>
          <p>Quickly add new products with a name, price, category, and stock level.</p>
        </div>
        <div className="feature">
          <h2>🔍 Search</h2>
          <p>Use the search bar to instantly find any product by name or category.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
