import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
   Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import userAxiosSecure from "../hooks/userAxiosSecure";
import { useNavigate } from "react-router-dom";
import { notyf } from "../api/utils";

// import "../styles/common.css";



const CheckoutForm = ({purchaseInfo,closeModal,totalQuantity,refetch}) => {
  const navigate = useNavigate();

  const axiosSecure = userAxiosSecure();

 const [clientSecret,setClientSecret] = useState("");

 console.log(clientSecret.clientSecret);

 const getPayment = async()=>{

  try{
  const {data} = await axiosSecure.post("/create-payment-intent",
    {
      plantId:purchaseInfo?.plantId,
      quantity:purchaseInfo?.quantity
    } 
  )
   setClientSecret(data.clientSecret)
  }catch(error){
   console.log(error.message)
  }
 }

 useEffect(()=>{
   getPayment();
 },[purchaseInfo])





  
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

    const {paymentIntent} = await stripe
  .confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name:purchaseInfo.customer?.name,
        email:purchaseInfo?.customer?.email
      },
    },
    
  })

  // if()
  console.log(paymentIntent);
  if(paymentIntent.status === "succeeded"){
        try{
              const res = await axiosSecure.post("/order",
                { ...purchaseInfo,
                transactionId:paymentIntent?.id
                }
                );
            
    
               console.log(res.data);
    
               const response = await axiosSecure.patch(`/plants/quantity/${purchaseInfo?.plantId}`,{
                updateQuantity:totalQuantity,
                status:"decrease"
               })
    
                console.log(response)
                 notyf.success("Order Completed")
                 refetch();
                 navigate("/dashboard/myOrder");
    
    
            }
            catch(error){
              console.log(error.message)
              console.log(error)
              notyf.error("Order failed")
            }
    
            finally{
              closeModal();
            } 
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