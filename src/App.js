import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import Cookies from "js-cookie";
import { useState } from "react";
import Footer from "./components/Footer";
import axios from "axios";
import Publish from "./containers/Publish";
import Paiement from "./containers/Paiement";

function App() {
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [searchResults, setSearchResults] = useState();
  const [searchedText, setSearchedText] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [maxMin, setMaxMin] = useState({});
  const [ascOrDesc, setAscOrDesc] = useState("price-asc");
  const [displayPublish, setDisplayPublish] = useState(true);

  const paginationHandler = async (page) => {
    let headers = {
      params: {
        title: searchedText,
        priceMin: maxMin.min || 0,
        priceMax: maxMin.max || 500,
        sort: ascOrDesc,
        skip: 0,
        limit: 5,
      },
    };
    headers.params.page = page;
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

  const setUser = (token) => {
    setDisplayModalLogin(false);
    setDisplayModalSignup(false);
    Cookies.set("userToken", token, { expires: 10 });
    setUserToken(token);
  };
  return (
    <Router>
      <Header
        ascOrDesc={ascOrDesc}
        setAscOrDesc={setAscOrDesc}
        maxMin={maxMin}
        setMaxMin={setMaxMin}
        pageNo={pageNo}
        setPageNo={setPageNo}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        setSearchResults={setSearchResults}
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
            displayPublish={displayPublish}
            setDisplayPublish={setDisplayPublish}
            paginationHandler={paginationHandler}
            pageNo={pageNo}
            setPageNo={setPageNo}
            searchedText={searchedText}
            searchResults={searchResults}
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
