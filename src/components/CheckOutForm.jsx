import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
   Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

// import "../styles/common.css";



const CheckoutForm = ({purchaseInfo,closeModal,refetch}) => {
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

      <div className="flex justify-around mt-5">
        <button className="btn text-green-500 rounded-xl border-green-300 bg-green-300" type="submit" disabled={!stripe}>
        {`Pay ${purchaseInfo?.price}`}
      </button>
      <button className="btn text-red-200 rounded-xl border-red-300 bg-red-300" onClick={closeModal}>Cancel</button>
      </div>
    </form>
  );
};

// Load Stripe outside the component
const stripePromise = loadStripe(
  "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
);



export default CheckoutForm;