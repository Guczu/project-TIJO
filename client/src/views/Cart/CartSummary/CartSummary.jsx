import React, { useEffect, useState } from "react"
import CustomButton from "../../../components/CustomButton/CustomButton"
import { BsCash } from 'react-icons/bs'
import { RiCoupon2Line } from 'react-icons/ri'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { isCodeValid } from "../../../services/discount.service"
import { getAddress } from "../../../services/address.service"
import { addOrder, checkPayment, deleteOrder, initiateStripeCheckout, makeOrder } from "../../../services/order.service"
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated } from "../../../services/user.service"
import { useError } from "../../../utils/ErrorContext/ErrorContext"

const CartSummary = ({ cartProducts, setCartProducts, setShowPaymentPopup }) => {
    const [cartValue, setCartValue] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(10);
    const [discountValue, setDiscountValue] = useState(0);
    const [isCodeUsed, setIsCodeUsed] = useState(false);
    const [discountError, setDiscountError] = useState('');
    const errorContext = useError();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const isPayment = queryParams.get('payment');

    const validationSchema = Yup.object().shape({
        coupon: Yup.string().required('Wpisz kod rabatowy'),
    });      

    useEffect(() => {
        if (cartProducts) {
            const sumValue = () => {
                const sum = cartProducts.reduce((total, obj) => total + obj.price * obj.quantity, 0);
                setCartValue(parseFloat(sum.toFixed(2)));
            }
            sumValue();
        }
    }, [cartProducts])

    const checkDiscountCode = async (code) => {
        const validCode = await isCodeValid(code);

        if(validCode.error) {
            errorContext.showError('Wystąpił błąd!8');
        }

        if (validCode && !isCodeUsed) {
            validCode.freeShip && setDeliveryPrice(0);
            validCode.priceDiscount && setDiscountValue(validCode.discountValue);
            validCode.priceDiscount && setCartValue(cartValue - cartValue * (validCode.discountValue / 100 ));
            setIsCodeUsed(true);
        } else {
            setDiscountError('Kod został już aktywowany lub jest nieważny!');
        }
    }

    const makeAnOrder = async (products) => {
        let address, isAddressValid;
        const isLoggedIn = await isAuthenticated();

        if(isLoggedIn.error) {
            errorContext.showError('Wystąpił błąd!7');
        }

        if (isLoggedIn) {
            address = await getAddress();

            if(address.error) {
                errorContext.showError('Wystąpił błąd!6');
            }

            isAddressValid = address && !Object.values(address).some(value => value === " ");
        } else {
            navigate('/login');
        }

        if (isAddressValid && address) {
            const order = await makeOrder(products, deliveryPrice, discountValue, cartValue);

            if(order.error) {
                errorContext.showError('Wystąpił błąd!5');
            }
            
            if (order.status === 401) {
                navigate('/login')
            } else if (order) {
                const orderResult = await addOrder(products, order);

                if(orderResult.error) {
                    errorContext.showError('Wystąpił błąd!4');
                }

                if (orderResult && !orderResult.error) {
                    localStorage.setItem('orderId', orderResult.data._id);
                    localStorage.setItem('sessionId', order);
                    await initiateStripeCheckout(order);
                }
            }

        }
    }

    useEffect(() => {
        const delOrder = async () => {
            const orderId = localStorage.getItem('orderId');
            if (orderId) {
                const order = await deleteOrder(orderId);

                if(order.error) {
                    errorContext.showError('Wystąpił błąd!3');
                }

                localStorage.removeItem('orderId');
            }
        }

        const checkOrder = async () => {
            const sessionId = localStorage.getItem('sessionId');
            let isOrderPaid = false;

            if (sessionId) {
                const isPaid = await checkPayment();

                if(isPaid.error) {
                    errorContext.showError('Wystąpił błąd!2');
                }
                
                if (isPaid === "paid") {
                    isOrderPaid = true;
                }
            }

            return isOrderPaid;
        }

        const manageOrder = async () => {
            if (isPayment !== null) {
                const isOrderPaid = await checkOrder();

                if(isOrderPaid.error) {
                    errorContext.showError('Wystąpił błąd!1');
                }
    
                if (isOrderPaid) {
                    setShowPaymentPopup({ paymentStatus: isPayment, popupStatus: true });
                    setCartProducts([]);
                    if(localStorage.getItem('cart')) {
                        localStorage.removeItem('cart');
                    }
                } else {
                    await delOrder();
                    setShowPaymentPopup({ paymentStatus: isPayment, popupStatus: true });
                }
            }
        }
        manageOrder();

    },[isPayment])

  return (
    <>
        <div className="w-full xl:w-1/4 p-6 flex flex-col gap-4 bg-base-softbackground rounded-[10px] h-max pb-12" data-testid="cart-summary">
            <span className="text-heading-5 p-6">
                Podsumowanie
            </span>

            <div className="flex flex-col gap-2">
                <span data-testid="sum-text">
                    Suma: {cartValue.toFixed(2)}zł
                </span>

                <span data-testid="delivery-text">
                    Dostawa: {deliveryPrice}zł
                </span>
            </div>

            <CustomButton 
                styles={`text-body-3 text-white px-6 py-2 ${cartProducts.length < 1 ? 'bg-base-disabled' : 'bg-main-primary hover:bg-main-third'}`}
                disabled={cartProducts.length < 1}
                onClick={() => makeAnOrder(cartProducts)}
                data-testid="checkout-button"
            >
                <span>
                    ZAPŁAĆ
                </span>
                <BsCash className="ml-[6px] w-4 h-4"/>
            </CustomButton>

            <div className="flex flex-col gap-3">
                <Formik
                    initialValues={{ coupon: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await checkDiscountCode(values.coupon);
                        setSubmitting(false);
                        values.coupon = ""
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                        <div className="flex flex-col gap-3">
                            <span className="text-heading-3 mt-6 p-6">Kod rabatowy</span>

                            <Field
                                type="text"
                                name="coupon"
                                placeholder="Wpisz kod"
                                className="text-body-1 w-full rounded-[10px] text-typography-subtext h-[30px] md:p-[20px] focus:outline-none"
                            />

                            <CustomButton
                                type="submit"
                                disabled={isSubmitting || cartProducts.length < 1}
                                className={`flex justify-center items-center text-body-3 text-white px-6 py-2 rounded-full ${cartProducts.length < 1 ? 'bg-base-disabled' : 'bg-main-primary hover:bg-main-third'}`}
                                data-testid="discount-button"
                            >
                                <span>ZASTOSUJ</span>
                                <RiCoupon2Line className="ml-[6px] w-4 h-4" />
                            </CustomButton>
                            
                            <span className="text-red-500">
                                {discountError && discountError}
                            </span>
                        </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </>
  )
}

export default CartSummary