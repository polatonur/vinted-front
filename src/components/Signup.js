import { useHistory } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
library.add(faTimes);
const Signup = ({
  pageRef,
  dataRef,
  setUser,
  setDisplayModalLogin,
  setDisplayModalSignup,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handlerSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-api-v1.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: pass,
        }
      );
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
      setErrorMessage(error.message);
      console.log(error);
    }
  };
  return (
    <div className="signup">
      <div className="signup-block">
        <FontAwesomeIcon
          onClick={() => setDisplayModalSignup(false)}
          className="close-icon"
          icon="times"
        />

        <p className="signup-text">S'inscrire</p>
        <form onSubmit={handlerSubmit}>
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            placeholder="Nom d'utilisateur"
          />
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
          <div className="newsletter-block">
            <div>
              {" "}
              <input type="checkbox" name="newsletter" />
              <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
            </div>
            <p className="sub-text">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <span className="error-message"> {errorMessage}</span>
          <button type="submit">S'inscrire</button>
          <h4
            onClick={() => {
              setDisplayModalLogin(true);
              setDisplayModalSignup(false);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </h4>
        </form>
      </div>
    </div>
  );
};
export default Signup;
