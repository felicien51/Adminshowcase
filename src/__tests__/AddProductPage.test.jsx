import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import AddProductPage from '../pages/AddProductPage';

function renderPage(onAdd) {
  render(
    <MemoryRouter initialEntries={['/add-product']}>
      <Route path="/add-product">
        <AddProductPage onAdd={onAdd || function () {}} />
      </Route>
    </MemoryRouter>
  );
}

test('renders the Add New Product heading', function () {
  renderPage();
  expect(screen.getByText('Add New Product')).toBeInTheDocument();
});

test('renders all form inputs', function () {
  renderPage();
  expect(screen.getByPlaceholderText(/unga wa dola/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/250/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue('-- Select category --')).toBeInTheDocument();
});

test('shows error when required fields are empty', function () {
  renderPage();
  fireEvent.click(screen.getByText('Add Product'));
  expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
});

test('calls onAdd with the correct data', function () {
  var received = null;
  renderPage(function (data) { received = data; });

  fireEvent.change(screen.getByPlaceholderText(/unga wa dola/i), { target: { value: 'Omo Detergent' } });
  fireEvent.change(screen.getByPlaceholderText(/250/i), { target: { value: '350' } });
  fireEvent.change(screen.getByDisplayValue('-- Select category --'), { target: { value: 'Food' } });
  fireEvent.change(screen.getByPlaceholderText(/e.g. 50/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText('Add Product'));

  expect(received).not.toBeNull();
  expect(received.name).toBe('Omo Detergent');
  expect(received.price).toBe(350);
  expect(received.stock).toBe(100);
});
