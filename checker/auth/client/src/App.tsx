import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/LoginForm";
import { IUser } from "./models/response/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("render");
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  console.log(store.isAuth);

  if (store.isLoading) {
    <div>Loading...</div>;
  }
  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <div>
          <button onClick={getUsers}>получить пользователей</button>
        </div>
        {users.length > 0 &&
          users.map((user) => <div key={user._id}>{user.email}</div>)}
      </>
    );
  }
  return (
    <div>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "Авторизуйтесь"}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>получить пользователей</button>
      </div>
      {users.length > 0 &&
        users.map((user) => <div key={user._id}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
