import React, { useState } from 'react';
import styles from './AdminRegistration.module.scss';
import { Button, SelectField, TextInput } from '@/components/ui';
import { useRootStore } from '@/context/StoreContext';
import { FnOnChange } from '@/types/uiTypes';
import authService from '@/http/userAPI';
// import { validator } from '@/utils';
// import { VALIDATOR_CONFIG } from '@/constants/otherConstants';

const DEFAULT = {
  email: '',
  password: '',
  passwordDouble: '',
  role: 'ADMIN'
};

const ROLE_OPTIONS = [{ id: 'OWNER', name: 'OWNER' }];

const AdminRegistration = (): JSX.Element => {
  const { user } = useRootStore();
  const isOwner = user.user?.role === 'OWNER';
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(DEFAULT);
  // const [errors, setErrors] = useState<ErrorValidation>({});

  const handleChange: FnOnChange = ({ name, value }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // const validate = () => {
  //   const validationFields = {
  //     email: data.email,
  //     password: data.password,
  //   };
  //   const validErrors = validator(validationFields, VALIDATOR_CONFIG),

  //   setErrors(validErrors as ErrorValidation);
  // };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.registration(data);
      console.log(response);
    } catch (e) {
      console.log(e);
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
            <TextInput label="Email" name="email" value={data.email} onChange={handleChange} />
            <TextInput label="Пароль" name="password" type="password" value={data.password} onChange={handleChange} />
            <TextInput
              label="повторите пароль"
              name="passwordDouble"
              type="password"
              value={data.passwordDouble}
              onChange={handleChange}
            />
            <SelectField
              label="Выберите уровень допуска"
              name="role"
              options={ROLE_OPTIONS}
              value={data.role}
              onChange={handleChange}
              defaultOption="ADMIN"
            />
            <Button appearance="primary">Зарегистрировать</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminRegistration;
