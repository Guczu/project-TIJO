import React, { useEffect, useState } from "react";
import CartProducts from "./CartProducts/CartProducts"
import CartSummary from "./CartSummary/CartSummary"
import fetchCart from "../../utils/fetchCart";
import PaymentPopup from "../Cart/PaymentPopup/PaymentPopup"

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showPaymentPopup, setShowPaymentPopup] = useState({ paymentStatus: null, popupStatus: false });

  useEffect(() => {
    const cart = fetchCart();
    if (cart !== cartProducts) {
      setCartProducts(cart);
    }
  },[setCartProducts])

  return (
    <>
      {showPaymentPopup.popupStatus && <PaymentPopup status={showPaymentPopup.paymentStatus} setShowPaymentPopup={setShowPaymentPopup}/> }
        <section className="container mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-center mt-12 min-h-[300px] gap-4">
          <CartProducts cartProducts={cartProducts} setCartProducts={setCartProducts}/>
          <CartSummary cartProducts={cartProducts} setCartProducts={setCartProducts} setShowPaymentPopup={setShowPaymentPopup}/>
        </section>
    </>
  )
}

export default Cart