import { useState, useEffect } from 'react';

var API = 'http://localhost:3001/products';

function useProducts() {
  var productsState = useState([]);
  var products = productsState[0];
  var setProducts = productsState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  var errorState = useState('');
  var error = errorState[0];
  var setError = errorState[1];

  // GET - load all products when the app starts
  useEffect(function () {
    fetch(API)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setProducts(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Could not connect to the backend. Make sure you ran: npm run backend');
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // POST - add a new product
  function addProduct(newProduct) {
    setLoading(true);
    setError(null);
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then(function (saved) {
        setProducts(function (prev) { return [saved].concat(prev); });
      })
      .catch(function (err) {
        setError(err.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  // PATCH - update an existing product
  function updateProduct(id, changes) {
    fetch(API + '/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
      .then(function (res) { return res.json(); })
      .then(function (updated) {
        setProducts(function (prev) {
          return prev.map(function (p) { return p.id === id ? updated : p; }); // ✅ fixed
        });
      });
  }

  // DELETE - remove a product
  function deleteProduct(id) {
    fetch(API + '/' + id, { method: 'DELETE' })
      .then(function () {
        setProducts(function (prev) {
          return prev.filter(function (p) { return p.id !== id; }); // ✅ fixed
        });
      });
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
}

export default useProducts;
