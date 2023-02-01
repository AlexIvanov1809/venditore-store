import React, { useState } from "react";
import authService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";
import { LoginFormProps } from "./loginForm.props";
import { CheckBoxField, Input } from "../../components";
import localStorageService from "../../service/localStorage.service";
import { AxiosError } from "axios";

interface IErrResp {
  message: string;
}

const LoginForm = ({ ...props }: LoginFormProps): JSX.Element => {
  const navigate = useNavigate();
  const defaultData = { email: "", password: "", stay: false };
  const [logData, setData] = useState(defaultData);
  const [errors, setErrors] = useState("");

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.name === "stay") {
      setData((prevState) => ({ ...prevState, [target.name]: !logData.stay }));
    } else {
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = logData;
      const data = await authService.login({ email, password });
      // setData(defaultData);
      console.log(data);
      await localStorageService.setTokens(data);
      // navigate("/adminPanel/coffee");
      console.log(document.cookie.split(";"));
    } catch (error) {
      console.log(error);
      const errData = (error as AxiosError).response?.data;
      setErrors((errData as IErrResp).message);
    }
  };
  return (
    <form className="row g-3 mb-3" {...props} onSubmit={handleSubmit}>
      <Input
        placeholder="Электронная почта"
        name="email"
        type="text"
        value={logData.email}
        onChange={handleChange}
      />
      <Input
        placeholder="Пароль"
        name="password"
        type="password"
        value={logData.password}
        onChange={handleChange}
      />
      {errors && <p className="text-danger">{errors}</p>}
      <CheckBoxField
        name="stay"
        value={logData.stay}
        getChange={(target) =>
          setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
          }))
        }
      >
        Оставаться в сети
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        submit
      </button>
    </form>
  );
};

export default LoginForm;
