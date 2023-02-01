import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistrationForm from "../components/ui/registrationForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "registration" ? type : "login"
  );

  const toggleChangeForm = () => {
    setFormType((prevState) =>
      prevState === "registration" ? "login" : "registration"
    );
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        {formType === "login" ? (
          <div className="card p-4" style={{ maxWidth: "400px" }}>
            <h2>Войти</h2>
            <LoginForm />
            <p>
              Нет аккаунта?{" "}
              <Link to="/registration" onClick={toggleChangeForm}>
                Регистрация
              </Link>
            </p>
          </div>
        ) : (
          <div className="card p-4" style={{ maxWidth: "400px" }}>
            <h2>Регистрация</h2>
            <RegistrationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
