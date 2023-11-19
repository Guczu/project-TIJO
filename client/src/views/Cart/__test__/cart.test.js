import React from 'react';
import CartProducts from "../CartProducts/CartProducts";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CartSummary from '../CartSummary/CartSummary';
import Cart from '../Cart';
import CartProductTile from '../CartProductTile/CartProductTile';

describe('Cart Component', () => {
    it('renders cart component correctly', () => {
        const { container } = render(<MemoryRouter><Cart /></MemoryRouter>);

        //assert
        expect(container).toBeInTheDocument();
    })


    it('displays a message when cart is empty', () => {
        //arrange
        const emptyCart = [];

        //act
        const { getByText } = render(<MemoryRouter><CartProducts cartProducts={emptyCart} setCartProducts={() => {}} /></MemoryRouter>);

        //assert
        const emptyCartText = getByText('Brak produktów w koszyku');
        expect(emptyCartText).toBeInTheDocument();
    })


    it('checkout button is disabled when cart is empty', () => {
        //arrange
        const emptyCart = [];

        //act
        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).toBeDisabled();
    })


    it('discount code button is disabled when cart is empty', () => {
        //arrange
        const emptyCart = [];

        //act
        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const discountButton = screen.getByTestId('discount-button');
        expect(discountButton).toBeDisabled();
    })


    it('checkout button is enabled when cart has products', () => {
        //arrange
        const cart = [{id: 1, product_name: 'Product'}, {id: 2, product_name: "Another product"}];

        //act
        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).toBeEnabled();
    })


    it('discount button is enabled when cart has products', () => {
        //arrange
        const cart = [{id: 1, product_name: 'Product'}, {id: 2, product_name: "Another product"}];

        //act
        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const discountButton = screen.getByTestId('discount-button');
        expect(discountButton).toBeEnabled();
    })
 

    it('Cart summary price is correctly calculated', () => {
        //arrange
        const cart = [{id: 1, product_name: 'Product', price: 15.00, quantity: 1}, {id: 2, product_name: "Another product", price: 3.20, quantity: 1}];
        const expectedTotalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

        //act
        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const sumText = screen.getByTestId('sum-text').textContent;
        expect(sumText).toEqual('Suma: ' + expectedTotalPrice + 'zł');
    })


    it('Cart price is 0 when no products', () => {
        //arrange
        const emptyCart = [];

        //act
        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const sumText = screen.getByTestId('sum-text').textContent;
        expect(sumText).toEqual('Suma: 0.00zł');
    })
 

    it('Delivery price is 10', () => {
        //arrange
        const cart = [{id: 1, product_name: 'Product', price: 15.00, quantity: 1}, {id: 2, product_name: "Another product", price: 3.20, quantity: 1}];

        //act
        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        //assert
        const deliveryText = screen.getByTestId('delivery-text').textContent;
        expect(deliveryText).toEqual('Dostawa: 10zł');
    })


    it('renders CartProductTile when a product is passed to CartProducts', async () => {
        // Arrange
        const product = {
          id: 1,
          product_name: 'Example Product',
          producer: 'Example Producer',
          price: 1,
          image_url: 'example.com',
          quantity: 3
        };
      
        // Act
        render(<MemoryRouter><CartProducts cartProducts={[product]} setCartProducts={() => {}} /></MemoryRouter>);
      
        // Assert
        const cartProductTile = screen.getByTestId('cartproducttile-container');
        expect(cartProductTile).toBeInTheDocument();

      });
      

})