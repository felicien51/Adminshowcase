import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetailPage from '../pages/ProductDetailPage';

var mockProducts = [
  { id: 1, name: 'Tusker Lager (Crate of 24)', price: 2800, category: 'Drinks', stock: 50, description: 'Classic Kenyan beer.' },
];

function renderPage(onUpdate, onDelete) {
  render(
    <MemoryRouter initialEntries={['/product/1']}>
      <Route path="/product/:id">
        <ProductDetailPage
          products={mockProducts}
          onUpdate={onUpdate || function () {}}
          onDelete={onDelete || function () {}}
        />
      </Route>
    </MemoryRouter>
  );
}

test('renders the product name', function () {
  renderPage();
  expect(screen.getByText('Tusker Lager (Crate of 24)')).toBeInTheDocument();
});

test('renders the price in KSh', function () {
  renderPage();
  expect(screen.getByText('KSh 2800')).toBeInTheDocument();
});

test('renders the product description', function () {
  renderPage();
  expect(screen.getByText('Classic Kenyan beer.')).toBeInTheDocument();
});

test('shows edit form when Edit Product is clicked', function () {
  renderPage();
  fireEvent.click(screen.getByText('Edit Product'));
  expect(screen.getByText('Save Changes')).toBeInTheDocument();
});

test('calls onUpdate when Save Changes is clicked', function () {
  var called = false;
  renderPage(function () { called = true; });
  fireEvent.click(screen.getByText('Edit Product'));
  fireEvent.click(screen.getByText('Save Changes'));
  expect(called).toBe(true);
});

test('shows product not found for unknown id', function () {
  render(
    <MemoryRouter initialEntries={['/product/999']}>
      <Route path="/product/:id">
        <ProductDetailPage
          products={mockProducts}
          onUpdate={function () {}}
          onDelete={function () {}}
        />
      </Route>
    </MemoryRouter>
  );
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
