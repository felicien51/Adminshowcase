import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

var ALL_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Footwear',
  'Kitchen',
  'Drinks',
  'Food',
  'Beauty',
  'Other',
];

function ProductsPage(props) {
  var products = props.products;
  var loading = props.loading;
  var error = props.error;
  var searchQuery = props.searchQuery;
  var onDelete = props.onDelete;

  // Track which category checkboxes are ticked
  var checkedState = useState([]);
  var selectedCategories = checkedState[0];
  var setSelectedCategories = checkedState[1];

  function handleCategoryToggle(category) {
    setSelectedCategories(function (prev) {
      if (prev.includes(category)) {
        return prev.filter(function (c) { return c !== category; });
      }
      return prev.concat(category);
    });
  }

  // Filter by search query first, then by selected categories
  var filtered = products.filter(function (p) {
    var q = searchQuery.toLowerCase();
    var matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    var matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  return (
    <div className="products-layout">

      {/* Sidebar */}
      <aside className="filter-sidebar">
        <h3 className="filter-title">Filter by Category</h3>
        {ALL_CATEGORIES.map(function (category) {
          return (
            <label key={category} className="filter-option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={function () { handleCategoryToggle(category); }}
              />
              {category}
            </label>
          );
        })}

        {selectedCategories.length > 0 && (
          <button
            className="clear-filters"
            onClick={function () { setSelectedCategories([]); }}
          >
            Clear filters
          </button>
        )}
      </aside>

      {/* Main content */}
      <div className="products-main">
        <h1>All Products</h1>
        <p className="count">{filtered.length} product(s) found</p>

        {filtered.length === 0 ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          <div className="products-grid">
            {filtered.map(function (product) {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
