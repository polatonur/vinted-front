import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../containers/Home.css";
import TwoLabeledRange from "./TwoLabeledRange";
import "./header.css";
import MenuMobile from "./MenuMobile";

library.add(faSearch);

const Header = ({
  userToken,
  setUserToken,
  setDisplayModalLogin,
  setDisplayModalSignup,
  searchedText,
  setSearchedText,
  setMaxMin,
  setAscOrDesc,
}) => {
  const logout = () => {
    setUserToken(null);
  };

  const handlerCheckBox = async (event) => {
    if (event.target.checked) {
      setAscOrDesc("price-desc");
    } else {
      setAscOrDesc("price-asc");
    }
  };

  const handlerSearch = async (event) => {
    if (event) {
      setSearchedText(event.target.value);
    }
  };
  return (
    <header className="container">
      <div className="upper-header">
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
          <div className="filter">
            <span>
              <span>Tier par prix: </span>
              <input type="checkbox" onClick={handlerCheckBox} />
            </span>
            <span>
              <span>Prix entre :</span>
              <div className="range-div">
                <TwoLabeledRange setMaxMin={setMaxMin} />
              </div>
            </span>
          </div>
        </div>
        <nav
          className="nav-bar"
          style={{
            justifyContent: userToken && "flex-end",
            marginRight: userToken && "10px",
          }}
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
          <MenuMobile />
        </nav>
      </div>
      <div className="filter-search-hidden">
        <div className="search">
          <FontAwesomeIcon className="search-icon" icon="search" />
          <input
            value={searchedText}
            type="search"
            placeholder="Rechercher des articles"
            onChange={handlerSearch}
          />
        </div>
        <div className="filter">
          <span>
            <span>Tier par prix: </span>
            <input type="checkbox" onClick={handlerCheckBox} />
          </span>
          <span>
            <span>Prix entre :</span>
            <div className="range-div">
              <TwoLabeledRange setMaxMin={setMaxMin} />
            </div>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
