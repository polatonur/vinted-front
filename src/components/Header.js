import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
library.add(faSearch);

const Header = () => {
  return (
    <header className="container">
      <div className="logo">
        <img src={logo} alt="vinted" />
      </div>
      <div className="filter-search">
        <div className="search">
          <FontAwesomeIcon className="search-icon" icon="search" />
          <input type="search" placeholder="Rechercher des articles" />
        </div>
        <div className="filter">
          <span>Tier par prix </span>
          <span className="btn-filter"></span>
          <span>Prix entre :</span>
          <span className="filter-bar"></span>
        </div>
      </div>
      <nav className="nav-bar">
        <Link to="/signup">
          {" "}
          <button>S'inscrire</button>
        </Link>
        <Link to="/login">
          <button>Se connecter</button>
        </Link>
        <button>Vends tes articles</button>
      </nav>
    </header>
  );
};

export default Header;
