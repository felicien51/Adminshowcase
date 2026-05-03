import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard(props) {
  var product = props.product;

  function handleDelete() {
    if (window.confirm('Delete ' + product.name + '?')) {
      props.onDelete(product.id);
    }
  }

  return (
    <div className="card">
      <span className="card-badge">{product.category}</span>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-price">KSh {product.price}</p>
      <p className="card-stock">Stock: {product.stock}</p>
      <div className="card-actions">
        <Link to={'/product/' + product.id} className="btn-view">View / Edit</Link>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProductCard;
