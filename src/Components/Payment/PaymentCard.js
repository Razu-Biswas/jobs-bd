import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';



const cardOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

function PaymentCard({ checkoutBtn }) {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        console.log('call');
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            checkoutBtn()
        }
    };


    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <CardElement options={cardOptions} />
                <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>Pay</button>
            </form>
        </div>
    )
}

export default PaymentCard
