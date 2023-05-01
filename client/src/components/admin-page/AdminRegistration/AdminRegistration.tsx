import React, { useState } from 'react';
import { Button, SelectField, TextInput } from '@/components/ui';
import { useRootStore } from '@/context/StoreContext';
import { FnOnChange } from '@/types/uiTypes';
import authService from '@/http/userAPI';
import useValidation from '@/hooks/useValidation';
import { VALIDATOR_CONFIG } from '@/constants/configConstants';
import styles from './AdminRegistration.module.scss';
import makeErrorMsg from '../utils/makeErrorMsg';

const DEFAULT = {
  email: '',
  password: '',
  passwordCheckEqual: '',
  role: 'ADMIN'
};

function AdminRegistration(): JSX.Element {
  const { user, adminErrors } = useRootStore();
  const isOwner = user.user?.role === 'OWNER';
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(DEFAULT);
  // const [errorFromServer, setErrorFromServer] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const emailError = useValidation(data.email, VALIDATOR_CONFIG.email);
  const passwordError = useValidation(data.password, VALIDATOR_CONFIG.password, data.passwordCheckEqual);
  const passwordCheckEqualError = useValidation(data.passwordCheckEqual, VALIDATOR_CONFIG.password, data.password);

  const handleChange: FnOnChange = ({ name, value }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => !!emailError || !!passwordError || !!passwordCheckEqualError;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setShowErrors(true);
      return;
    }

    try {
      const response = await authService.registration(data);
      console.log(response);
    } catch (error: unknown) {
      const errorMsg = makeErrorMsg(e);
      adminErrors.setError(errorMsg);
    }
  };

  if (!isOwner) {
    return <></>;
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} appearance="primary">
        Создать админа
      </Button>
      {isOpen && (
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <h3>Регистрация Админа</h3>
            <TextInput
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={showErrors ? emailError : ''}
            />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              error={showErrors ? passwordError : ''}
            />
            <TextInput
              label="повторите пароль"
              name="passwordCheckEqual"
              type="password"
              value={data.passwordCheckEqual}
              onChange={handleChange}
              error={showErrors ? passwordCheckEqualError : ''}
            />
            <SelectField
              label="Выберите уровень допуска"
              name="role"
              options={[{ id: 'OWNER', name: 'OWNER' }]}
              value={data.role}
              onChange={handleChange}
              defaultOption="ADMIN"
            />
            {/* {errorFromServer && <p style={{ color: 'red' }}>{errorFromServer}</p>} */}
            <Button appearance="primary">Зарегистрировать</Button>
            <Button onClick={handleClose} appearance="danger">
              Закрыть
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminRegistration;
