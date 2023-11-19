import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';
import { API_URL } from '../constants';

const makeOrder = async (items, deliveryPrice, discountValue, cartValue) => {
  try {
    const userId = localStorage.getItem('userId');

    const token = await axios.get(`${API_URL}/api/user/token`, {
      params: { userId: userId }
    });

    const response = await axios.post(`${API_URL}/api/payment/create-payment`, { items: items, deliveryPrice: deliveryPrice, discountValue: discountValue, cartValue: cartValue }, { 
        headers:  {
            "Content-Type": 'application/json',
            'authorization': `Bearer ${token.data.value}` 
        }
    });

    return response.data;

  } catch (error) {
    return { error: true }
  }
};

const initiateStripeCheckout = async (sessionId) => {
  const stripe = await loadStripe('pk_test_51NxZPaDSuxecRLBOu2ck23JR29AzapqKRJEmCTqgaUGneqVBPGTBjwEDlqhz3BwB5vSb9nwOKqwdqpBJAeFTf37P00JvG7Bcpz');
  stripe.redirectToCheckout({
    sessionId: sessionId,
  });
};

const addOrder = async (products, sessionId) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.post(`${API_URL}/api/orders/add`, { products: products, userId: userId, sessionId: sessionId });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return { error: true }
  }
};

const getOrders = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/api/orders/get`, { params: {userId: userId} });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return { error: true }
  }
};

const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/delete/${orderId}`);

    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    return { error: true }
  }
};

const checkPayment = async () => {
  try {
    const sessionId = localStorage.getItem('sessionId');
    const response = await axios.post(`${API_URL}/api/payment/check-session`, { sessionId: sessionId });

    if (response.status === 200) {
      return response.data.payment_status;
    }
  } catch (error) {
    return { error: true }
  }
};

export {
  makeOrder,
  addOrder,
  getOrders,
  deleteOrder,
  checkPayment,
  initiateStripeCheckout
};
