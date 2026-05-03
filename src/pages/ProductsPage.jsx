import React from 'react';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

function ProductsPage(props) {
  var products = props.products;
  var loading = props.loading;
  var error = props.error;
  var searchQuery = props.searchQuery;
  var onDelete = props.onDelete;

  // Filter products based on search
  var filtered = products.filter(function (p) {
    var q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  return (
    <div>
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
  );
}

export default ProductsPage;
