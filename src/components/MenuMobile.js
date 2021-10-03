import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "./menuMobile.css";
import { Link } from "react-router-dom";

const MenuMobile = ({
  userToken,
  setUserToken,
  setDisplayLogin,
  setDisplaySignup,
}) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="menu-mobile">
      <FontAwesomeIcon
        onClick={() => {
          setDisplayMenu(true);
        }}
        className="menu-mobile-icon"
        icon="bars"
      />{" "}
      <div
        style={{ right: displayMenu ? "0" : "-100vw" }}
        className="menu-block"
      >
        <p>
          {" "}
          <FontAwesomeIcon
            className="close-icon"
            onClick={() => setDisplayMenu(false)}
            icon="times"
          />
        </p>
        <ul>
          <Link to="/">
            <li onClick={() => setDisplayMenu(false)}>
              {" "}
              <span className="header_link_1">Home</span>
            </li>
          </Link>
          <Link to="/characters" onClick={() => setDisplayMenu(false)}>
            <li>
              {" "}
              <span className="header_link_1">Characters</span>
            </li>
          </Link>
          <Link onClick={() => setDisplayMenu(false)} to="/comics">
            <li>
              {" "}
              <span className="username">Comics</span>
            </li>
          </Link>
          <Link onClick={() => setDisplayMenu(false)} to="/favoris">
            <li>
              {" "}
              <span className="username">Favorites</span>
            </li>
          </Link>

          {userToken ? (
            <>
              <li
                className="menu_mobile_signout_btn"
                onClick={() => {
                  setUserToken(null);
                  setDisplayMenu(false);
                }}
              >
                Log out <FontAwesomeIcon icon="sign-out-alt" />
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  setDisplayLogin(true);
                  setDisplayMenu(false);
                }}
              >
                {" "}
                <span className="username">Login</span>
              </li>
              <li
                onClick={() => {
                  setDisplaySignup(true);
                  setDisplayMenu(false);
                }}
              >
                {" "}
                <span className="username">Signup</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuMobile;
