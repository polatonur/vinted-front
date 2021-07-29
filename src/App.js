import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";
import { useState } from "react";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const setUser = (token) => {
    Cookies.set("userToken", token, { expires: 10 });
    setUserToken(token);
    console.log("sssss");
    console.log(Cookies.get("userToken"));
  };
  const token = Cookies.get("userToken");
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
