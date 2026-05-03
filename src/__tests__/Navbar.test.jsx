import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

function renderNavbar(onSearch) {
  render(
    <MemoryRouter>
      <Navbar searchQuery="" onSearch={onSearch || function () {}} />
    </MemoryRouter>
  );
}

test('renders the logo', function () {
  renderNavbar();
  expect(screen.getByText('AdminPortal')).toBeInTheDocument();
});

test('renders navigation links', function () {
  renderNavbar();
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('+ Add Product')).toBeInTheDocument();
});

test('renders the search input', function () {
  renderNavbar();
  expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
});

test('calls onSearch when typing in the search box', function () {
  var typed = '';
  renderNavbar(function (v) { typed = v; });
  fireEvent.change(screen.getByPlaceholderText(/search products/i), { target: { value: 'shoes' } });
  expect(typed).toBe('shoes');
});
