import React from "react";
import backphoto from "../assets/backphoto.jpg";
//import Login0 from "../components/Login0";
import "../styles/styles.css";
//import LoginModal from "../components/LoginModal";
import Login0 from "../components/Login0";
//import { useFormState } from "react-hook-form";

const LoginPage = () => {
  //const [isLoginOpen, setIsLoginOpen] = useFormState(false);
  return (
    <div>
      <img className="backphoto" src={backphoto} alt="Blueberries" />
      <Login0 />
    </div>
  );
};

export default LoginPage;
