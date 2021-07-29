import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useState } from "react";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
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
    <div className="login">
      <div className="login-block">
        <p>Se connecter</p>
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
          <button type="submit">Se connecter</button>
          <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
