import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/img/img-hero.jpg";
import imgDecor from "../assets/img/img-decoration.svg";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Pagination from "../components/Pagination";
import ActivityIndicator from "../components/ActivityIndicator";
import "../components/hero.css";

const Home = ({
  displayModalLogin,
  displayModalSignup,
  setDisplayModalLogin,
  setDisplayModalSignup,
  setUser,
  searchedText,
  ascOrDesc,
  maxMin,
  displayPublish,
  setDisplayPublish,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState();
  const [activePage, setActivePage] = useState(1);
  // console.log(window.innerWidth);

  const getPageLimit = () => {
    const width = window.innerWidth;
    if (width > 970) {
      return 10;
    }
    if (width > 700) {
      return 9;
    }
    if (width > 570) {
      return 8;
    } else {
      return 10;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-v1.herokuapp.com/offers?title=${searchedText}&priceMin=${
            maxMin.min
          }&priceMax=${
            maxMin.max
          }&sort=${ascOrDesc}&page=${activePage}&limit=${getPageLimit()}`
        );
        setOffers(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [activePage, ascOrDesc, maxMin, searchedText]);

  return isLoading ? (
    <ActivityIndicator height={"100vh"} />
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
        {offers.offers.map((offer) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
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
      <Pagination
        count={offers.count}
        activePage={activePage}
        setActivePage={setActivePage}
        perPage={getPageLimit()}
      />
    </div>
  );
};
export default Home;
