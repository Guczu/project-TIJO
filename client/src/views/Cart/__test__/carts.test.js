import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartProducts from '../CartProducts/CartProducts';
import CartProductTile from '../CartProductTile/CartProductTile';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../Cart';
import CartSummary from '../CartSummary/CartSummary';

const mockProduct = { id: 2, product_name: 'Product 1', producer: 'Producer 2', price: 20, image_url: 'image2.jpg', quantity: 2 };

describe('CartProducts Component', () => {
  test('renders CartProducts component with no products', () => {
    render(<MemoryRouter><CartProducts cartProducts={[]} setCartProducts={() => {}} /></MemoryRouter>);
    const emptyCartText = screen.getByText(/Brak produktów w koszyku/i);
    expect(emptyCartText).toBeInTheDocument();
  });

  test('renders CartProducts component with products', () => {
    const mockProducts = [
      { id: 1, product_name: 'Product 1', producer: 'Producer 1', price: 10, image_url: 'image1.jpg', quantity: 1 },
      { id: 2, product_name: 'Product 2', producer: 'Producer 2', price: 20, image_url: 'image2.jpg', quantity: 2 },
    ];
    render(<MemoryRouter><CartProducts cartProducts={mockProducts} setCartProducts={() => {}} /></MemoryRouter>);
    const productNames = screen.getAllByText(/Product/i);
    expect(productNames.length).toBe(2);
  });
});

describe('CartProductTile Component', () => {

    test('renders CartProductTile component', () => {
      render(<MemoryRouter><CartProductTile product={mockProduct} setCartProducts={() => {}} /></MemoryRouter>);
      const productName = screen.getByText(/Product 1/i);
      expect(productName).toBeInTheDocument();
    });
 
});

describe('Integration Tests', () => {
  test('renders Cart component with CartProducts and CartSummary', async () => {
    render(<MemoryRouter><Cart /></MemoryRouter>);
    await waitFor(() => {
      const cartProducts = screen.getByTestId('cart-products');
      const cartSummary = screen.getByTestId('cart-summary');
      expect(cartProducts).toBeInTheDocument();
      expect(cartSummary).toBeInTheDocument();
    });
  });
})