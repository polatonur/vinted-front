import { useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faTimes);

const Login = ({
  dataRef,
  pageRef,
  setUser,
  setDisplayModalLogin,
  setDisplayModalSignup,
  displayPublish,
  setDisplayPublish,
}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-api-v1.herokuapp.com/user/login",
        {
          email: email,
          password: pass,
        }
      );
      // console.log(response.data);
      setUser(response.data.token);
      if (pageRef.current) {
        history.push({
          pathname: pageRef.current,
          state: { data: dataRef.current },
        });
        pageRef.current = null;
        dataRef.current = null;
      } else {
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-block">
        <FontAwesomeIcon
          onClick={() => setDisplayModalLogin(false)}
          className="close-icon"
          icon="times"
        />
        <p className="login-text">Se connecter</p>
        <form onSubmit={handlerSubmit}>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="text"
            placeholder="Email"
          />
          <input
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
            type="password"
            placeholder="Mot de passe"
          />
          <span className="error-message"> {errorMessage}</span>

          <button type="submit">Se connecter</button>
          <h4
            onClick={() => {
              setDisplayModalLogin(false);
              setDisplayModalSignup(true);
            }}
          >
            Pas encore de compte ? Inscris-toi !
          </h4>
        </form>
      </div>
    </div>
  );
};
export default Login;
