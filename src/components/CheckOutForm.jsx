import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
   Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

// import "../styles/common.css";

import "./styles/CheckOutForm.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Prevent the browser's default form submission
    event.preventDefault();

    // Stripe.js has not loaded yet
    if (!stripe || !elements) {
      return;
    }

    // Get the CardElement
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Create a PaymentMethod using the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

// Load Stripe outside the component
const stripePromise = loadStripe(
  "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
);



export default CheckoutForm;