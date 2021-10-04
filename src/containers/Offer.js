import { Link, useParams } from "react-router-dom";
import "./Offer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";

const Offer = () => {
  const { id } = useParams();
  const [offerData, setOfferData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-v1.herokuapp.com/offer/${id}`
        );
        setOfferData(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <ActivityIndicator height={"calc(100vh - 121px)"} />
  ) : (
    <div className="offer">
      <section className="contain">
        <main className="main-offer container">
          <div className="photo">
            <img src={offerData.product_image.secure_url} alt="product" />
          </div>
          <div className="info">
            <div className="upper">
              <p className="price">{offerData.product_price} €</p>
              <div className="details">
                {offerData.product_details.map((detail, index) => {
                  let keys = Object.keys(detail, index);
                  return (
                    <p key={index}>
                      <div>
                        <span>{keys[0]}</span>
                      </div>
                      <div>
                        <span>{detail[keys[0]]}</span>
                      </div>
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="bottom">
              <p>{offerData.product_name}</p>
              <p>{offerData.product_description}</p>
              <p>{offerData.owner.account.username}</p>
              <Link to={{ pathname: "/paiement", state: { data: offerData } }}>
                <button>Acheter</button>
              </Link>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};
export default Offer;
