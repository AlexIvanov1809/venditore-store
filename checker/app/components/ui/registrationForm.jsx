import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../service/auth.service";
import localStorageSevice from "../../service/localStorage.service";
import TextForm from "../common/form/textForm";

const RegistrationForm = () => {
  const userId = localStorageSevice.getUserID();
  const [data, setData] = useState({
    name: "",
    password: ""
  });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await authService.register(data);
    localStorageSevice.setTokens(user);
  };
  if (userId) {
    return (
      <form onSubmit={handleSubmit}>
        <TextForm
          label="Имя"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        />
        <TextForm
          label="Пароль"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-4 w-100 mx-auto" type="submit">
          submit
        </button>
      </form>
    );
  } else {
    return (
      <>
        <h3>Ошибка 404, страницы не существует, вернитесь на главную</h3>
        <Link className="btn btn-primary" to={"/"}>
          Вернуться
        </Link>
      </>
    );
  }
};

export default RegistrationForm;
