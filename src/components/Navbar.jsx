import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">AdminPortal</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/add-product" className="nav-link">+ Add Product</Link>
      </div>
      <div className="nav-right">
        <input
          type="text"
          className="nav-search"
          placeholder="Search products..."
          value={props.searchQuery}
          onChange={function (e) { props.onSearch(e.target.value); }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
