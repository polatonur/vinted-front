import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./paiement.css";
const stripePromise = loadStripe(
  "pk_test_51JKLSaFah0iJlwU1ulmkVmGfm6ZeKYo0JuSUtd1IgVzobuC7s9E5clQtAYGgPiGywyQX9QcgJiWvw9II48jyILWC00oTB6UNBd"
);
const Paiement = ({ userToken, setDisplayModalLogin }) => {
  const location = useLocation();
  const history = useHistory();
  if (!userToken) {
    setDisplayModalLogin(true);
    history.push("/");
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm data={location.state.data} />
    </Elements>
  );
};

export default Paiement;
