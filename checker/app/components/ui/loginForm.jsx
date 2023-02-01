import React, { useState } from "react";
import TextForm from "../common/form/textForm";
import CheckBoxField from "../common/form/checkBoxField";
import authService from "../../service/auth.service";
import localStorageSevice from "../../service/localStorage.service";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [logData, setData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState("");

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, password } = logData;
      const data = await authService.login({ name, password });
      await localStorageSevice.setTokens(data);
      navigate("/adminPanel/coffee");
    } catch (error) {
      const { code } = error.response.data.error;
      if (code === 400) {
        setErrors("Неверное имя или пароль");
      } else {
        setErrors("Произошла ошибка на сервере попробуйте позже");
      }
    }
  };
  return (
    <form className="row g-3 mb-3" onSubmit={handleSubmit}>
      <TextForm
        label="Элекстронная почта"
        name="name"
        type="text"
        value={logData.name}
        onChange={handleChange}
      />
      <TextForm
        label="Пароль"
        name="password"
        type="password"
        value={logData.password}
        onChange={handleChange}
      />
      {errors && <p className="text-danger">{errors}</p>}
      <CheckBoxField>Оставаться в сети</CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        submit
      </button>
    </form>
  );
};

export default LoginForm;
