import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import { useEffect } from "react";

const Login0 = () => {
  //const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSign, setIsSign] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setYear("2022");
    setMonth("00");
    setIsSign(false);
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (year === "0000" || month === "00") {
      setErrorMsg("Eliga el año y mes");
      return;
    }

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
          (res) => (
            localStorage.setItem("token", res.data.token),
            dispatch({
              type: "SET_EMAIL",
              payload: email,
            }),
            dispatch({
              type: "SET_YEAR",
              payload: year,
            }),
            dispatch({
              type: "SET_MONTH",
              payload: month,
            }),
            navigate(`/bidones`)
            //<Link className="link" to={`/pokedex/${pokemon.id}`}>
          )
        )
        .catch((error) => {
          console.log("hubo un error");
          setErrorMsg(error.response.data.message);
        });
    }
  };

  const close = () => {
    setIsSign(false);
  };

  return (
    <div className="input_container">
      <h1>hello</h1>
      <div className="login_container">
        <form action="" onSubmit={login} className="formClass_login">
          <div className="login_credential">
            <p className="label_login">email</p>
            <input
              type="text"
              className="input_login"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="label_login">Password</p>
            <input
              type="password"
              className="input_login"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login_credential">
            <p className="label_login">año</p>

            <select
              name="year"
              id="year"
              onChange={(e) => setYear(e.target.value)}
              className="select_period"
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <p className="label_login">Mes</p>
            <select
              name="month"
              id="month"
              onChange={(e) => setMonth(e.target.value)}
              className="select_period"
            >
              <option value="00">Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>

          <button onClick={login} className="button" type="button">
            Submit
          </button>
          <button onClick={close}>Cancel</button>
          <p className="error_login">{errorMsg}</p>
          {/* {!isSign && <p className="error">{errorMsg}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default Login0;
