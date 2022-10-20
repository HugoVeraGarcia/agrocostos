import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { loginThunk } from "../redux/actions";
import "../styles/loginModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useEffect } from "react";

const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSign, setIsSign] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!isSign) {
      const credentials = {
        email,
        password,
      };

      axios
        .post(
          "http://backend.concienciaartificial.us:4000/api/v1/users/login",
          credentials
        )
        .then(
          (res) => localStorage.setItem("token", res.data.token),
          setErrorMsg(""),
          setIsLoginOpen(false),
          dispatch({
            type: "SET_EMAIL",
            payload: email,
          }),
          navigate("/bidones")
        )
        .catch((error) => {
          setErrorMsg(error.response.data.message);
          setIsLoginOpen(true);
        });
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoginOpen(false);
    navigate("/");
  };

  const close = () => {
    setIsLoginOpen(false);
    setIsSign(false);
  };

  return (
    <div>
      {
        <div>
          <form
            onSubmit={login}
            className={`login ${isLoginOpen ? "open" : ""}`}
          >
            {localStorage.getItem("token") ? (
              <div className="logout_container">
                <i
                  className="fa-solid fa-arrow-right-from-bracket icon"
                  onClick={logout}
                ></i>
                <i
                  className="fa-solid fa-xmark icon m4rem"
                  onClick={() => setIsLoginOpen(false)}
                ></i>
              </div>
            ) : (
              <>
                <div className="modal">
                  <i className="fa-solid fa-face-grin icon size"></i>

                  {!isSign}

                  {!isSign && (
                    <input
                      type="email"
                      placeholder="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                  {!isSign && (
                    <input
                      type="password"
                      placeholder="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                  {!isSign && <button className="button">Submit</button>}
                  {!isSign && (
                    <button onClick={close} className="button" type="button">
                      Cancel
                    </button>
                  )}
                  {!isSign && <p className="error">{errorMsg}</p>}

                  {isSign && <label htmlFor="email">Email</label>}

                  {isSign && <button className="button">Sign Up</button>}

                  {isSign && <p className="error">{errorMsg}</p>}
                </div>
              </>
            )}
          </form>
        </div>
      }
    </div>
  );
};
export default LoginModal;
