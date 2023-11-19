import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

async function createPayment(data) {
    const coupon = data.discountValue > 0 && await stripe.coupons.create({
        percent_off: data.discountValue,
        duration: 'once',
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        discounts: [{
            coupon: coupon.id
        }],
        line_items: [
            ...data.items.map(item => ({
                price_data: {
                    currency: "pln",
                    product_data: {
                        name: item.product_name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            {
                price_data: {
                    currency: "pln",
                    product_data: {
                        name: "Dostawa",
                    },
                    unit_amount: data.deliveryPrice * 100,
                },
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:5173/cart/?payment=true',
        cancel_url: 'http://localhost:5173/cart/?payment=false'
    })
    
    return { id: session.id };
}

async function checkSession(data) {
    try {
        const session = await stripe.checkout.sessions.retrieve(data.sessionId);

        if (session) {
            return session;
        } else {
            return 'Brak podanej sesji';
        }

      } catch (error) {
        console.error('Błąd podczas sprawdzania sesji płatności', error);
        throw error;
    }
}

export default {
  createPayment: createPayment,
  checkSession: checkSession
};
