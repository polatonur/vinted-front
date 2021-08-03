import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/img/img-hero.jpg";
import imgDecor from "../assets/img/img-decoration.svg";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = ({
  displayModalLogin,
  displayModalSignup,
  setDisplayModalLogin,
  setDisplayModalSignup,
  setUser,
  searchResults,
  searchedText,
  setSearchedText,
  pageNo,
  setPageNo,
  paginationHandler,
  displayPublish,
  setDisplayPublish,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-api-v1.herokuapp.com/offers?sort=price-asc&page=1&limit=5"
        );
        setOffers(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  let pubToDisplay = offers;
  if (searchResults || searchedText) {
    pubToDisplay = searchResults;
  }

  let pagination = Math.ceil(pubToDisplay.count / 10);
  console.log(`is loading is =${isLoading}`);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="home">
      <section className="hero">
        <div className="hero-img">
          <img src={heroImg} alt="clothes" />
          <img src={imgDecor} alt="cut img" />
        </div>
        <div className="middle-block">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <Link to="publish">
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </section>
      <main className="offers container">
        {pubToDisplay.offers.map((offer) => {
          return (
            <Link key={offer.id} to={`/offer/${offer._id}`}>
              {" "}
              <div className="offer-card">
                <p className="username">
                  <span className="avatar">
                    {offer.owner.account.username[0]}
                  </span>
                  <span>{offer.owner.account.username}</span>
                </p>
                <div className="image">
                  <img src={offer.product_image.secure_url} alt="offer" />
                </div>
                <div className="bottom-info">
                  <p className="price">{offer.product_price + " €"}</p>
                  {offer.product_details[3].TAILLE && (
                    <p className="details">{offer.product_details[3].TAILLE}</p>
                  )}
                  {offer.product_details[2].MARQUE ? (
                    <p className="brand">{offer.product_details[2].MARQUE}</p>
                  ) : (
                    <p className="brand">SANS MARQUE</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        {/* {pubToDisplay.slice(0)} */}
      </main>
      {displayModalSignup && (
        <Signup
          displayPublish={displayPublish}
          setDisplayPublish={setDisplayPublish}
          setUser={setUser}
          setDisplayModalSignup={setDisplayModalSignup}
          setDisplayModalLogin={setDisplayModalLogin}
        />
      )}
      {displayModalLogin && (
        <Login
          displayPublish={displayPublish}
          setDisplayPublish={setDisplayPublish}
          setDisplayModalSignup={setDisplayModalSignup}
          setUser={setUser}
          setDisplayModalLogin={setDisplayModalLogin}
        />
      )}
      <div className="bottom-page-nos">
        {pubToDisplay.offers.slice(0, pagination).map((elem, index) => {
          return (
            <span
              onClick={() => {
                paginationHandler(index + 1);
              }}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
