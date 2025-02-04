import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
      const location = useLocation();
      const { id } = location.state || {};

      return (
            <Elements stripe={stripePromise}>
                  <CheckOutForm id={id} />
            </Elements>
      )
}

export default Payment