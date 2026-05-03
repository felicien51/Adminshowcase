import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ProductDetailPage.css';

function ProductDetailPage(props) {
  var params = useParams();
  var history = useHistory();
  var id = parseInt(params.id);

  // Find the matching product from the list
  var product = props.products.find(function (p) { return p.id === id; });

  // Standard hook - toggle edit mode on/off
  var editState = useState(false);
  var editMode = editState[0];
  var setEditMode = editState[1];

  // Standard hook - holds the editable form values
  var formState = useState({});
  var formData = formState[0];
  var setFormData = formState[1];

  // Standard hook - shows a success message after saving
  var successState = useState('');
  var success = successState[0];
  var setSuccess = successState[1];

  function handleEditClick() {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description,
    });
    setEditMode(true);
  }

  function handleChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    setFormData(function (prev) {
      var copy = Object.assign({}, prev);
      copy[field] = value;
      return copy;
    });
  }

  function handleSave() {
    props.onUpdate(id, {
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      description: formData.description,
    });
    setEditMode(false);
    setSuccess('Product updated!');
    setTimeout(function () { setSuccess(''); }, 2000);
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this product?')) {
      props.onDelete(id);
      history.push('/products');
    }
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={function () { history.push('/products'); }}>
        ← Back to Products
      </button>

      {success && <p className="success-msg">{success}</p>}

      <div className="detail-card">
        <span className="detail-badge">{product.category}</span>

        {editMode ? (
          <div className="edit-form">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />

            <label>Price (KSh)</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} min="0" />

            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Drinks">Drinks</option>
              <option value="Food">Food</option>
              <option value="Beauty">Beauty</option>
              <option value="Other">Other</option>
            </select>

            <label>Stock</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" />

            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />

            <div className="detail-actions">
              <button className="btn-save" onClick={handleSave}>Save Changes</button>
              <button className="btn-cancel-edit" onClick={function () { setEditMode(false); }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h1>{product.name}</h1>
            <p className="detail-price">KSh {product.price}</p>
            <p className="detail-stock">Stock: {product.stock} units</p>
            <p className="detail-desc">{product.description}</p>
            <div className="detail-actions">
              <button className="btn-save" onClick={handleEditClick}>Edit Product</button>
              <button className="btn-delete" onClick={handleDelete}>Delete Product</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
