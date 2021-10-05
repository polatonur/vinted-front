import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../containers/Home.css";
import TwoLabeledRange from "./TwoLabeledRange";
import "./header.css";
import MenuMobile from "./MenuMobile";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

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
  const location = useLocation();
  // console.log("location==>", location.pathname);

  const handlerCheckBox = async (event) => {
    if (event.target.checked) {
      setAscOrDesc("price-desc");
    } else {
      setAscOrDesc("price-asc");
    }
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);
  // console.log("visib", isComponentVisible);
  const secondComp = useOutsideAlerter(false);

  // const { ref2, displaySortBy, setDisplaySortBy } = useOutsideAlerter(true);

  const handlerSearch = async (event) => {
    if (event) {
      setSearchedText(event.target.value);
    }
  };
  return (
    <header
      style={{ height: location.pathname !== "/" && "60px" }}
      // className="container"
    >
      <div className="upper-header">
        <Link to="/">
          {" "}
          <div className="logo">
            <img src={logo} alt="vinted" />
          </div>
        </Link>
        {location.pathname === "/" && (
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
        )}
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
              <button className="logout-btn" onClick={() => setUserToken(null)}>
                Se deconnecter
              </button>
            </Link>
          ) : (
            <div className="connection-btn">
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
          <MenuMobile
            userToken={userToken}
            setUserToken={setUserToken}
            setDisplayModalLogin={setDisplayModalLogin}
            setDisplayModalSignup={setDisplayModalSignup}
          />
        </nav>
      </div>
      {location.pathname === "/" && (
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
            <span ref={secondComp.ref}>
              <span
                onClick={() =>
                  secondComp.setIsComponentVisible(
                    !secondComp.isComponentVisible
                  )
                }
              >
                Tier par prix:{" "}
              </span>
              <FontAwesomeIcon
                onClick={() =>
                  secondComp.setIsComponentVisible(
                    !secondComp.isComponentVisible
                  )
                }
                className="up-down-icons"
                icon={"sort-down"}
              />
              <input
                className="checkbox1"
                type="checkbox"
                onClick={handlerCheckBox}
              />

              {secondComp.isComponentVisible && (
                <div className="checkbox-div">
                  {" "}
                  <input type="checkbox" onClick={handlerCheckBox} />
                </div>
              )}
            </span>
            <span ref={ref}>
              <span onClick={() => setIsComponentVisible(!isComponentVisible)}>
                Prix entre :{" "}
              </span>
              <FontAwesomeIcon
                onClick={() => setIsComponentVisible(!isComponentVisible)}
                className="up-down-icons"
                icon={"sort-down"}
              />{" "}
              <div className="range-div">
                <TwoLabeledRange setMaxMin={setMaxMin} />
              </div>
              {isComponentVisible && (
                <div className="range-div-2">
                  <TwoLabeledRange setMaxMin={setMaxMin} />
                </div>
              )}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
