import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ data }) => {
  const [succeed, setSucceed] = useState(false);
  const [message, setMessage] = useState("");
  console.log(data);
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = data.product_price + 15;
  const handlerPayement = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: data.owner.account._id,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://vinted-api-v1.herokuapp.com/payment",
        {
          token: stripeToken,
          amount: totalPrice,
          title: data.owner.account.username,
        }
      );
      if (response.data.status === "succeeded") {
        setMessage("Merci pour votre achat");
      } else {
        setMessage("Une erreur est survenue. Essayez à nouveau");
      }

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="checkout-main">
      <form onSubmit={handlerPayement} className="checkout-form">
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
        <CardElement />
        <button className="checkout-btn" type="submit">
          Pay
        </button>
        <p className="err-msg">{message}</p>
      </form>
    </main>
  );
};

export default CheckoutForm;
