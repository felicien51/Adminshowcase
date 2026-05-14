import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';

var mockProducts = [
  { id: 1, name: 'Tusker Lager (Crate of 24)', price: 2800, category: 'Drinks', stock: 50, description: '' },
  { id: 2, name: 'Maasai Shuka Blanket', price: 1500, category: 'Clothing', stock: 80, description: '' },
];

function renderPage(searchQuery) {
  render(
    <MemoryRouter>
      <ProductsPage
        products={mockProducts}
        loading={false}
        error=""
        searchQuery={searchQuery || ''}
        onDelete={function () {}}
      />
    </MemoryRouter>
  );
}

test('renders all products when search is empty', function () {
  renderPage('');
  expect(screen.getByText('Tusker Lager (Crate of 24)')).toBeInTheDocument();
  expect(screen.getByText('Maasai Shuka Blanket')).toBeInTheDocument();
});

test('filters products by search query', function () {
  renderPage('tusker');
  expect(screen.getByText('Tusker Lager (Crate of 24)')).toBeInTheDocument();
  expect(screen.queryByText('Maasai Shuka Blanket')).not.toBeInTheDocument();
});

test('shows no results message when nothing matches', function () {
  renderPage('zzzzzz');
  expect(screen.getByText(/no products match/i)).toBeInTheDocument();
});

test('shows the product count', function () {
  renderPage('');
  expect(screen.getByText(/2 product/i)).toBeInTheDocument();
});

test('shows loading message when loading is true', function () {
  render(
    <MemoryRouter>
      <ProductsPage products={[]} loading={true} error="" searchQuery="" onDelete={function () {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('shows error message when error is set', function () {
  render(
    <MemoryRouter>
      <ProductsPage products={[]} loading={false} error="Could not connect to the backend." searchQuery="" onDelete={function () {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/could not connect/i)).toBeInTheDocument();
});
