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

        expect(container).toBeInTheDocument();
    })


    it('displays a message when cart is empty', () => {
        const emptyCart = [];

        const { getByText } = render(<MemoryRouter><CartProducts cartProducts={emptyCart} setCartProducts={() => {}} /></MemoryRouter>);

        const emptyCartText = getByText('Brak produktów w koszyku');
        expect(emptyCartText).toBeInTheDocument();
    })


    it('checkout button is disabled when cart is empty', () => {
        const emptyCart = [];

        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).toBeDisabled();
    })


    it('discount code button is disabled when cart is empty', () => {
        const emptyCart = [];

        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const discountButton = screen.getByTestId('discount-button');
        expect(discountButton).toBeDisabled();
    })


    it('checkout button is enabled when cart has products', () => {
        const cart = [{id: 1, product_name: 'Product'}, {id: 2, product_name: "Another product"}];

        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).toBeEnabled();
    })


    it('discount button is enabled when cart has products', () => {
        const cart = [{id: 1, product_name: 'Product'}, {id: 2, product_name: "Another product"}];

        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const discountButton = screen.getByTestId('discount-button');
        expect(discountButton).toBeEnabled();
    })
 

    it('Cart summary price is correctly calculated', () => {
        const cart = [
            {id: '64d9fda84e78cdba9b181e75', product_name: 'Banan', price: 1.29, quantity: 1},
            {id: '6505edeedbe1e77026a89a69', product_name: "Czekolada mleczna Wedel", price: 3.32, quantity: 1}
        ];
        const expectedTotalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const sumText = screen.getByTestId('sum-text').textContent;
        expect(sumText).toEqual('Suma: ' + expectedTotalPrice + 'zł');
    })


    it('Cart price is 0 when no products', () => {
        const emptyCart = [];

        render(<MemoryRouter><CartSummary cartProducts={emptyCart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const sumText = screen.getByTestId('sum-text').textContent;
        expect(sumText).toEqual('Suma: 0.00zł');
    })
 

    it('Delivery price is 10', () => {
        const cart = [{id: 1, product_name: 'Product', price: 15.00, quantity: 1}, {id: 2, product_name: "Another product", price: 3.20, quantity: 1}];

        render(<MemoryRouter><CartSummary cartProducts={cart} setCartProducts={() => {}} setShowPaymentPopup={() => {}}/></MemoryRouter>);

        const deliveryText = screen.getByTestId('delivery-text').textContent;
        expect(deliveryText).toEqual('Dostawa: 10zł');
    })

    it('renders CartProductTile component', () => {
        const mockProduct = { 
            id: '6505ee08dbe1e77026a9162c', 
            product_name: 'Coca Cola', 
            producer: 'Biedronka', 
            price: 3.59, 
            image_url: 'https://media.istockphoto.com/id/458464735/pl/zdj%C4%99cie/coca-cola.jpg?s=612x612&w=0&k=20&c=EGsWdrE-xvvBGNcAqYwOsvyFOCMKH_9TJ91X4nkwVVk=', 
            quantity: 2 
        };
    
        render(<MemoryRouter><CartProductTile product={mockProduct} setCartProducts={() => {}} /></MemoryRouter>);
          
        const productName = screen.getByText(/Coca Cola/i);
        expect(productName).toBeInTheDocument();
    });

})