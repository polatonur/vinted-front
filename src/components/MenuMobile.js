import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "./menuMobile.css";
import { Link } from "react-router-dom";

const MenuMobile = ({
  userToken,
  setUserToken,
  setDisplayModalLogin,
  setDisplayModalSignup,
}) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="menu-mobile">
      {displayMenu ? (
        <FontAwesomeIcon
          className="menu-mobile-icon"
          onClick={() => setDisplayMenu(false)}
          icon="times"
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => {
            setDisplayMenu(true);
          }}
          className="menu-mobile-icon"
          icon="bars"
        />
      )}
      <div
        style={{ right: displayMenu ? "0" : "-100vw" }}
        className="menu-block"
      >
        <ul>
          <Link to="/">
            <li onClick={() => setDisplayMenu(false)}>
              {" "}
              <span className="header_link_1">Home</span>
            </li>
          </Link>
          <Link onClick={() => setDisplayMenu(false)} to="/publish">
            <li>
              {" "}
              <span className="header_link_1">Vends tes articles</span>
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
                  setDisplayModalLogin(true);
                  setDisplayMenu(false);
                }}
              >
                {" "}
                <span className="header_link_1">Login</span>
              </li>
              <li
                onClick={() => {
                  setDisplayModalSignup(true);
                  setDisplayMenu(false);
                }}
              >
                {" "}
                <span className="header_link_1">Signup</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuMobile;
