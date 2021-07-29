import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import heroImg from "../assets/img/img-hero.jpg";
import imgDecor from "../assets/img/img-decoration.svg";
import Cookies from "js-cookie";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setOffers(response.data.offers);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const token = Cookies.get("userToken");

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : token ? (
    <div className="home">
      <section className="hero">
        <div className="hero-img">
          <img src={heroImg} alt="clothes" />
          <img src={imgDecor} alt="cut img" />
        </div>
        <div className="middle-block">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <main className="offers container">
        {offers.map((offer) => {
          return (
            <Link key={offer.id} to={`/offer/${offer._id}`}>
              {" "}
              <div className="offer-card">
                <p className="username">{offer.owner.account.username}</p>
                <div className="image">
                  <img src={offer.product_image.secure_url} alt="offer" />
                </div>
                <div className="bottom-info">
                  <p className="price">{offer.product_price + " €"}</p>
                  {offer.product_details[1].TAILLE && (
                    <p className="details">{offer.product_details[1].TAILLE}</p>
                  )}
                  {offer.product_details[0].MARQUE ? (
                    <p className="brand">{offer.product_details[0].MARQUE}</p>
                  ) : (
                    <p className="brand">SANS MARQUE</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};
export default Home;
