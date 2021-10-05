import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CheckoutForm = ({ data }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = data.product_price + 15;

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post(
          "https://vinted-api-v1.herokuapp.com/payment",
          {
            amount: totalPrice,
            title: data.owner.account.username,
          }
        );
        // console.log(response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error.message);
      }
    };
    getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(payload);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    } catch (error) {
      console.log(error.message);
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    }
  };

  return (
    <main className="checkout-main">
      {!succeeded ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="checkout-details-section">
            <p>Résumé de la commande</p>
            <div className="checkout-details">
              <p>
                <span>Commande</span>
                <span>{data.product_price}</span>
              </p>
              <p>
                <span>Frais protection acheteurs</span>
                <span>10 €</span>
              </p>
              <p>
                <span>Frais de port</span>
                <span>5 €</span>
              </p>
            </div>
          </section>
          <section className="checkout-total-price-section">
            <p>
              <span>Total</span>
              <span>{data.product_price + 15} €</span>
            </p>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span>{data.owner.account.username}</span>. Vous allez payer{" "}
              <span>{data.product_price + 15}</span> € (frais de protection et
              frais de port inclus).
            </p>
          </section>
          <CardElement options={cardStyle} onChange={handleChange} />
          <button
            disabled={processing || disabled || succeeded}
            className="checkout-btn"
            type="submit"
          >
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </button>
          {error && (
            <p className="err-msg">
              {"Une ereur est survenue. Essayer à nouveau"}
            </p>
          )}
        </form>
      ) : (
        <div className="order-succeed">
          <p>
            <FontAwesomeIcon
              className="order-succeed-icon"
              icon="check-circle"
            />
          </p>
          <p className="order-succeed-valid">
            Félicitation, votre achat est validé !
          </p>
          <p className="order-succeed-price">
            Votre paiement de {data.product_price + 15} € a bien été effectué.
          </p>
          <Link to="/">
            <button>Retourner a la page d'accueil </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default CheckoutForm;
