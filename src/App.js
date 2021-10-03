import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import Cookies from "js-cookie";
import { useState } from "react";
import Footer from "./components/Footer";
import Publish from "./containers/Publish";
import Paiement from "./containers/Paiement";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBars,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faBars, faSortDown, faSortUp);

function App() {
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [searchedText, setSearchedText] = useState("");
  const [maxMin, setMaxMin] = useState({ min: 0, max: 500 });
  const [ascOrDesc, setAscOrDesc] = useState("price-asc");
  const [displayPublish, setDisplayPublish] = useState(true);

  const setUser = (token) => {
    setDisplayModalLogin(false);
    setDisplayModalSignup(false);
    Cookies.set("userToken", token, { expires: 10 });
    setUserToken(token);
  };
  return (
    <Router>
      <Header
        setAscOrDesc={setAscOrDesc}
        setMaxMin={setMaxMin}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        setUser={setUser}
        userToken={userToken}
        setUserToken={setUserToken}
        setDisplayModalLogin={setDisplayModalLogin}
        setDisplayModalSignup={setDisplayModalSignup}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route exact path="/">
          <Home
            ascOrDesc={ascOrDesc}
            maxMin={maxMin}
            displayPublish={displayPublish}
            setDisplayPublish={setDisplayPublish}
            searchedText={searchedText}
            setUser={setUser}
            displayModalLogin={displayModalLogin}
            displayModalSignup={displayModalSignup}
            setDisplayModalLogin={setDisplayModalLogin}
            setDisplayModalSignup={setDisplayModalSignup}
          />
        </Route>
        <Route path="/publish">
          <Publish
            setDisplayPublish={setDisplayPublish}
            userToken={userToken}
            setDisplayModalLogin={setDisplayModalLogin}
          />
        </Route>
        <Route>
          <Paiement
            setDisplayModalLogin={setDisplayModalLogin}
            userToken={userToken}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
