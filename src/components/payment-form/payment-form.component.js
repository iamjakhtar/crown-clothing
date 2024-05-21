import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const paymentHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount:  10000 }),
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
    });
    
    const  client_secret  = response.paymentIntent.client_secret
    const paymentResponse = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jon Smith'
        }
      }
    });

    
    if (paymentResponse.error) {
      alert(paymentResponse.error.message);
    } else if (paymentResponse.paymentIntent.status === 'succeeded') {

      elements.getElement(CardElement).clear();
      alert('Your payment has been successful');
    }
    setIsLoading(false);
  }


  return (
    <PaymentFormContainer>
      <h2>Pay by Credit Card</h2>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isLoading}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
