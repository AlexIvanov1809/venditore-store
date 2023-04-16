import React, { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FnOnChange } from '@/types/uiTypes';
import { AxiosError } from 'axios';
import { Button, TextInput } from '@/components/ui';
import authService from '@/http/userAPI';
import { useRootStore } from '@/context/StoreContext';
import styles from './Auth.module.scss';

interface Props {
  onOpen: Dispatch<SetStateAction<boolean>>;
}

const Auth = observer(({ onOpen }: Props) => {
  const { user } = useRootStore();
  const [isLogin, setIsLogin] = useState<boolean>(!user.isAuth);
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const changeHandle: FnOnChange = ({ name, value }) => {
    setAuthData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      try {
        await authService.logout();
        onOpen(false);
        user.setUser(null);
      } catch (e) {
        console.log(e);
      }
      return;
    }

    try {
      const data = await authService.login(authData.email, authData.password);
      user.setUser(data);
      setIsLogin(true);
      onOpen(false);
    } catch (e) {
      const errData = (e as AxiosError).response?.data;
      console.log(errData);
    }
  };
  return (
    <div className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>{isLogin ? 'Login' : user.user?.role}</h3>
        {isLogin && (
          <>
            <TextInput
              type="text"
              name="email"
              value={authData.email}
              placeholder="Enter email"
              onChange={changeHandle}
            />
            <TextInput
              type="password"
              name="password"
              value={authData.password}
              placeholder="Enter password"
              onChange={changeHandle}
            />
          </>
        )}
        <div className={styles.bottom}>
          <Button appearance="primary" type="submit">
            {isLogin ? 'Войти' : 'Выйти'}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default Auth;
