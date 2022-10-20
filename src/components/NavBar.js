import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const email = useSelector((state) => state.email);
  const year = useSelector((state) => state.year);
  const month = useSelector((state) => state.month);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_YEAR", payload: "" });
    dispatch({ type: "SET_MONTH", payload: "" });
    dispatch({ type: "SET_BIDONES", payload: [] });

    navigate("/");
  };

  const calendar = () => {
    navigate("/calendar");
  };
  const bidones = () => {
    navigate("/bidones");
  };
  const kgCosechados = () => {
    navigate("/kgCosechados");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo_container">
          <Link to="/">
            <img className="logoNavBar" src={logo} alt="logo" />
          </Link>
          {email ? (
            <p className="navBarMsg">
              Bienvenido: {email}, estamos en el periodo {year}/{month}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="icons_main_container">
          <div className="icon_container">
            {email ? (
              <i
                onClick={kgCosechados}
                className="fa-brands fa-raspberry-pi icon"
              ></i>
            ) : (
              ""
            )}
            {email ? <p>kg cosechados</p> : ""}
          </div>

          <div className="icon_container">
            {email ? (
              <i
                onClick={bidones}
                className="fa-solid fa-bottle-water icon"
              ></i>
            ) : (
              ""
            )}
            {email ? <p>Bidones</p> : ""}
          </div>

          <div className="icon_container">
            {email ? (
              <i
                onClick={calendar}
                className="fa-solid fa-calendar-days icon"
              ></i>
            ) : (
              ""
            )}
            {email ? <p>Calendario</p> : ""}
          </div>
          <div className="icon_container">
            {email ? (
              <i onClick={logout} className="fa-solid fa-user icon"></i>
            ) : (
              ""
            )}
            {email ? <p>Logout</p> : ""}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
