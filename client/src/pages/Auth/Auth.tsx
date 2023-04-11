import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FnOnChange } from '@/types/uiTypes';
import { AxiosError } from 'axios';
import styles from './Auth.module.css';
import { Button, TextInput } from '@/components/ui';
import { check, login, logout, registration } from '@/http/userAPI';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '@/utils/consts';
import { useRootStore } from '@/context/StoreContext';

const Auth = observer(() => {
  const location = useLocation();
  const { user } = useRootStore();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    role: 'ADMIN'
  });

  const changeHandle: FnOnChange = ({ name, value }) => {
    setAuthData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(authData.email, authData.password);
      } else {
        data = await registration(authData.email, authData.password, authData.role);
      }
      user.setUser(data);
      user.setIsAuth(true);
      // navigate(SHOP_ROUTE);
    } catch (e) {
      const errData = (e as AxiosError).response?.data;
      console.log(errData);
    }
  };

  const onClick = () => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((e) => e);
  };

  const logoutClick = () => {
    logout()
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.auth}>
      <h3>{isLogin ? 'Login' : 'Registration'}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput type="text" name="email" value={authData.email} placeholder="Enter email" onChange={changeHandle} />
        <TextInput
          type="password"
          name="password"
          value={authData.password}
          placeholder="Enter password"
          onChange={changeHandle}
        />
        <div className={styles.bottom}>
          {isLogin ? (
            <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
          ) : (
            <NavLink to={LOGIN_ROUTE}>login</NavLink>
          )}
          <Button appearance="primary" type="submit">
            {isLogin ? 'Login' : 'registration'}
          </Button>
        </div>
      </form>
      <button onClick={onClick}>refresh</button>
      <button onClick={logoutClick}>logout</button>
    </div>
  );
});

export default Auth;
