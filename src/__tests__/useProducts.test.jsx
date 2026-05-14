import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach, test, expect } from 'vitest';
import useProducts from '../hooks/useProducts';

// Mock data
var fakeProducts = [
  { id: 1, name: 'Tusker Lager', price: 2800, category: 'Drinks', stock: 50, description: 'Classic Kenyan beer.' },
  { id: 2, name: 'Maasai Shuka', price: 1500, category: 'Clothing', stock: 80, description: 'Traditional blanket.' },
];

beforeEach(function () {
  global.fetch = vi.fn();
});

afterEach(function () {
  vi.resetAllMocks();
});

// ─── GET ────────────────────────────────────────────────────────────────────

test('starts with loading=true and empty products', function () {
  global.fetch = vi.fn(function () {
    return new Promise(function () {}); // never resolves — keeps loading state
  });

  var result = renderHook(function () { return useProducts(); }).result;

  expect(result.current.loading).toBe(true);
  expect(result.current.products).toEqual([]);
  expect(result.current.error).toBe('');
});

test('loads products from the API on mount', async function () {
  global.fetch = vi.fn(function () {
    return Promise.resolve({
      ok: true,
      json: function () { return Promise.resolve(fakeProducts); },
    });
  });

  var result = renderHook(function () { return useProducts(); }).result;

  await waitFor(function () {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.products).toEqual(fakeProducts);
  expect(result.current.error).toBe('');
});

test('sets error message when fetch fails on mount', async function () {
  global.fetch = vi.fn(function () {
    return Promise.reject(new Error('Network error'));
  });

  var result = renderHook(function () { return useProducts(); }).result;

  await waitFor(function () {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.error).toMatch(/could not connect/i);
  expect(result.current.products).toEqual([]);
});

// ─── POST ───────────────────────────────────────────────────────────────────

test('addProduct adds a new product to the list', async function () {
  var newProduct = { id: 3, name: 'Omo Detergent', price: 350, category: 'Other', stock: 100, description: '' };

  // First call = initial GET, second call = POST
  global.fetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve(fakeProducts); },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve(newProduct); },
    });

  var result = renderHook(function () { return useProducts(); }).result;

  await waitFor(function () {
    expect(result.current.loading).toBe(false);
  });

  await act(async function () {
    result.current.addProduct({ name: 'Omo Detergent', price: 350, category: 'Other', stock: 100, description: '' });
  });

  await waitFor(function () {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.products.some(function (p) { return p.id === 3; })).toBe(true);
});

// ─── PATCH ──────────────────────────────────────────────────────────────────

test('updateProduct updates an existing product in the list', async function () {
  var updatedProduct = { id: 1, name: 'Tusker Lager', price: 3000, category: 'Drinks', stock: 45, description: 'Updated.' };

  global.fetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve(fakeProducts); },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve(updatedProduct); },
    });

  var result = renderHook(function () { return useProducts(); }).result;

  await waitFor(function () {
    expect(result.current.loading).toBe(false);
  });

  await act(async function () {
    result.current.updateProduct(1, { price: 3000, stock: 45, description: 'Updated.' });
  });

  await waitFor(function () {
    var product = result.current.products.find(function (p) { return p.id === 1; });
    expect(product.price).toBe(3000);
  });
});

// ─── DELETE ─────────────────────────────────────────────────────────────────

test('deleteProduct removes the product from the list', async function () {
  global.fetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve(fakeProducts); },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: function () { return Promise.resolve({}); },
    });

  var result = renderHook(function () { return useProducts(); }).result;

  await waitFor(function () {
    expect(result.current.products.length).toBe(2);
  });

  await act(async function () {
    result.current.deleteProduct(1);
  });

  await waitFor(function () {
    expect(result.current.products.find(function (p) { return p.id === 1; })).toBeUndefined();
  });

  expect(result.current.products.length).toBe(1);
});
