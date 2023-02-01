import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import { Context } from "..";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Войти</button>
      <button onClick={() => store.registration(email, password)}>
        Регистрация
      </button>
      <button
        onClick={() => {
          console.log("click");
          sessionStorage.setItem("tik", "123");
        }}
      >
        click
      </button>
    </div>
  );
};

export default observer(LoginForm);
