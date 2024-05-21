import { CardElement } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, PaymentStyledForm } from "./payment-form.styles";


const PaymentForm = () => {
  return (
    <PaymentFormContainer>
        <h1>Pay by Credit Card</h1>
      <PaymentStyledForm>
          <CardElement />
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </PaymentStyledForm>
    </PaymentFormContainer>
  );
}
export default PaymentForm