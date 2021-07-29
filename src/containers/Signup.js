import { Link, useHistory } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { useState } from "react";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: pass,
        }
      );
      console.log(response.data.token);
      console.log(response.data);
      setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
    history.push("/");
  };
  return (
    <div className="signup">
      <div className="signup-block">
        <p>S'inscrire</p>
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
          <div>
            {" "}
            <input type="checkbox" name="newsletter" />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit">S'inscrire</button>
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    </div>
  );
};
export default Signup;
