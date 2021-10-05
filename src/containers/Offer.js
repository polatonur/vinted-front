import { useParams, useHistory } from "react-router-dom";
import "./Offer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";

const Offer = ({ dataRef, pageRef, userToken, setDisplayModalLogin }) => {
  const { id } = useParams();
  const history = useHistory();
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

  const handleClick = () => {
    if (userToken) {
      history.push({ pathname: "/paiement", state: { data: offerData } });
    } else {
      pageRef.current = "/paiement";
      dataRef.current = offerData;
      setDisplayModalLogin(true);
    }
  };

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
              <section className="price">{offerData.product_price} €</section>
              <div className="details">
                {offerData.product_details.map((detail, index) => {
                  let keys = Object.keys(detail, index);
                  return (
                    <div key={index}>
                      <div>
                        <span>{keys[0]}</span>
                      </div>
                      <div>
                        <span>{detail[keys[0]]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bottom">
              <p>{offerData.product_name}</p>
              <p>{offerData.product_description}</p>
              <p>{offerData.owner.account.username}</p>
              <button onClick={handleClick}>Acheter</button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};
export default Offer;
