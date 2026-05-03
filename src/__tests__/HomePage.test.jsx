import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

test('renders the welcome heading', function () {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByText(/welcome to the admin portal/i)).toBeInTheDocument();
});

test('renders the View Products link', function () {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByText(/view products/i)).toBeInTheDocument();
});

test('renders the Add Product link', function () {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByText(/add product/i)).toBeInTheDocument();
});

test('renders the three feature cards', function () {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByText(/manage products/i)).toBeInTheDocument();
  expect(screen.getByText(/add products/i)).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
});
