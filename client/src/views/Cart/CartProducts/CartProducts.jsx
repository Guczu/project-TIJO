import React, { useState } from "react"
import CartProductTile from "../CartProductTile/CartProductTile"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AiOutlineShopping } from "react-icons/ai";

const CartProducts = ({ cartProducts, setCartProducts }) => {
  const [isCartExpanded, setIsCartExpanded] = useState(false);

  return (
    <div className="w-full xl:w-1/2 p-12 flex flex-col items-center justify-center gap-6 rounded-[10px] pt-0" data-testid="cart-products">
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.slice(0, isCartExpanded ? cartProducts.length : 5).map((product, index) => (
            <CartProductTile key={index} product={product} setCartProducts={setCartProducts} />
          ))}
          {cartProducts.length > 5 && (
            isCartExpanded ? (
              <MdKeyboardArrowUp
                className="w-6 h-6 bg-base-graybackground rounded-full hover:cursor-pointer"
                onClick={() => setIsCartExpanded(false)}
              />
            ) : (
              <MdKeyboardArrowDown
                className="w-6 h-6 bg-base-graybackground rounded-full hover:cursor-pointer"
                onClick={() => setIsCartExpanded(true)}
              />
            )
          )}
        </>
      ) : (
        <section className="flex flex-col items-center justify-center mt-12 min-h-[300px] gap-4">
          <span className="text-heading-6 text-center">
            Brak produktów w koszyku
          </span>
          <Link to='/categories' replace>
            <CustomButton 
              styles="w-14 h-14 rounded-[5px] bg-main-primary hover:bg-main-third text-white"
              data-testid="check-products"
            >
              <AiOutlineShopping className="w-6 h-6" />
            </CustomButton>
          </Link>
        </section>
      )}
    </div>
  );
}

export default CartProducts