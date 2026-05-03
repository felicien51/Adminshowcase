import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddProductPage.css';

function AddProductPage(props) {
  // Standard hook - one state per form field
  var nameState = useState('');
  var name = nameState[0];
  var setName = nameState[1];

  var priceState = useState('');
  var price = priceState[0];
  var setPrice = priceState[1];

  var categoryState = useState('');
  var category = categoryState[0];
  var setCategory = categoryState[1];

  var stockState = useState('');
  var stock = stockState[0];
  var setStock = stockState[1];

  var descState = useState('');
  var description = descState[0];
  var setDescription = descState[1];

  var errorState = useState('');
  var error = errorState[0];
  var setError = errorState[1];

  var history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !price || !category || !stock) {
      setError('Please fill in all required fields.');
      return;
    }

    props.onAdd({
      name: name,
      price: parseInt(price),
      category: category,
      stock: parseInt(stock),
      description: description,
    });

    history.push('/products');
  }

  return (
    <div className="add-page">
      <h1>Add New Product</h1>

      {error && <p className="error-msg">{error}</p>}

      <form className="add-form" onSubmit={handleSubmit}>
        <label>Product Name *</label>
        <input
          type="text"
          value={name}
          onChange={function (e) { setName(e.target.value); }}
          placeholder="e.g. Unga wa Dola (2kg)"
        />

        <label>Price (KSh) *</label>
        <input
          type="number"
          value={price}
          onChange={function (e) { setPrice(e.target.value); }}
          placeholder="e.g. 250"
          min="0"
        />

        <label>Category *</label>
        <select value={category} onChange={function (e) { setCategory(e.target.value); }}>
          <option value="">-- Select category --</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Drinks">Drinks</option>
          <option value="Food">Food</option>
          <option value="Beauty">Beauty</option>
          <option value="Other">Other</option>
        </select>

        <label>Stock *</label>
        <input
          type="number"
          value={stock}
          onChange={function (e) { setStock(e.target.value); }}
          placeholder="e.g. 50"
          min="0"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={function (e) { setDescription(e.target.value); }}
          placeholder="Short product description (optional)"
          rows="3"
        />

        <div className="form-buttons">
          <button type="submit" className="btn-submit">Add Product</button>
          <button type="button" className="btn-cancel" onClick={function () { history.push('/products'); }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
