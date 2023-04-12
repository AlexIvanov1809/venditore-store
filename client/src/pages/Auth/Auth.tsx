import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FnOnChange } from '@/types/uiTypes';
import { AxiosError } from 'axios';
import { Button, TextInput } from '@/components/ui';
import authService from '@/http/userAPI';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '@/constants/consts';
import { useRootStore } from '@/context/StoreContext';
import styles from './Auth.module.css';

const Auth = observer(() => {
  const navigate = useNavigate();
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
      const data = await (() => {
        if (isLogin) {
          return authService.login(authData.email, authData.password);
        }
        return authService.registration(authData.email, authData.password, authData.role);
      })();

      user.setUser(data);
      navigate(SHOP_ROUTE);
    } catch (e) {
      const errData = (e as AxiosError).response?.data;
      console.log(errData);
    }
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
    </div>
  );
});

export default Auth;
