import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../containers/Home.css";
import axios from "axios";
import TwoLabeledRange from "./TwoLabeledRange";

library.add(faSearch);

const Header = ({
  userToken,
  setUserToken,
  setDisplayModalLogin,
  setDisplayModalSignup,
  setSearchResults,
  searchedText,
  setSearchedText,
  pageNo,
  maxMin,
  setMaxMin,
  ascOrDesc,
  setAscOrDesc,
}) => {
  // const [displaySearchButton, setDisplaySearchButton] = useState(false);

  let headers = {
    params: {
      title: searchedText,
      priceMin: maxMin.min || 0,
      priceMax: maxMin.max || 500,
      sort: ascOrDesc,
      skip: 0,
      limit: 5,
      page: pageNo,
    },
  };

  const logout = () => {
    setUserToken(null);
  };

  const handlerMAxMin = async (values) => {
    headers.params.priceMax = values.max;
    headers.params.priceMin = values.min;
    try {
      console.log(headers.params);
      const response = await axios.get(
        "https://vinted-api-v1.herokuapp.com/offers",
        headers
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlerCheckBox = async (event) => {
    if (event.target.checked) {
      headers.params.sort = "price-desc";
      setAscOrDesc("price-desc");
    } else {
      headers.params.sort = "price-asc";
      setAscOrDesc("price-asc");
    }
    try {
      console.log(headers.params);
      const response = await axios.get(
        "https://vinted-api-v1.herokuapp.com/offers",
        headers
      );
      // setSearchedText("");
      setSearchResults(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlerSearch = async (event) => {
    if (event) {
      headers.params.title = event.target.value;
      setSearchedText(event.target.value);
    }
    try {
      console.log(headers.params);
      const response = await axios.get(
        "https://vinted-api-v1.herokuapp.com/offers",
        headers
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <header className="container" style={{ height: userToken && "120px" }}>
      <Link to="/">
        {" "}
        <div className="logo">
          <img src={logo} alt="vinted" />
        </div>
      </Link>
      <div className="filter-search">
        <div className="search">
          <FontAwesomeIcon className="search-icon" icon="search" />
          <input
            value={searchedText}
            type="search"
            placeholder="Rechercher des articles"
            onChange={handlerSearch}
          />
        </div>
        {/* {displaySearchButton && (
            <div className="search-btn-hidden">
              <button>Rechercher </button> <span>: {searchedText}</span>
            </div>
          )} */}

        <div className="filter">
          <span>Tier par prix: </span>
          <input type="checkbox" onClick={handlerCheckBox} />
          <span>Prix entre :</span>
          {/* <span className="filter-bar"></span> */}
          <div className="range-div">
            <TwoLabeledRange
              setMaxMin={setMaxMin}
              handlerMAxMin={handlerMAxMin}
            />
          </div>
        </div>
      </div>
      <nav
        className="nav-bar"
        style={{ justifyContent: userToken && "space-around" }}
      >
        {userToken ? (
          <Link to="/">
            {" "}
            <button className="logout-btn" onClick={logout}>
              Se deconnecter
            </button>
          </Link>
        ) : (
          <div>
            <button onClick={() => setDisplayModalSignup(true)}>
              S'inscrire
            </button>
            <button onClick={() => setDisplayModalLogin(true)}>
              Se connecter
            </button>
          </div>
        )}
        <Link to="/publish">
          <button className="btn-sell">Vends tes articles</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
