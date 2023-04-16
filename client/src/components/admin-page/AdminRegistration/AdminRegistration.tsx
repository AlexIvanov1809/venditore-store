import React, { useState } from 'react';
import styles from './AdminRegistration.module.scss';
import { Button, SelectField, TextInput } from '@/components/ui';
import { useRootStore } from '@/context/StoreContext';
import { FnOnChange } from '@/types/uiTypes';
import authService from '@/http/userAPI';
import { validator } from '@/utils';

interface ErrorPassValidation {
  email?: string;
  password?: string;
  passwordDouble?: string;
  main?: string;
}

const DEFAULT = {
  email: '',
  password: '',
  passwordDouble: '',
  role: 'ADMIN'
};

const CONFIG_VALID = {
  email: {
    isRequired: { message: 'Поле необходимое для заполнения' },
    isEmail: { message: 'Неправильно указан email' }
  },
  password: {
    isRequired: { message: 'Поле необходимое для заполнения' },
    isCapitalSymbol: { message: 'Необходима хотя бы одна заглавная буква' },
    isContainDigit: { message: 'Необходима хотя бы одна цифра' },
    isLength: { message: 'Поле должно содержать более 6 символов' }
  }
};
const AdminRegistration = (): JSX.Element => {
  const { user } = useRootStore();
  const isOwner = user.user?.role === 'OWNER';
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(DEFAULT);
  const [errors, setErrors] = useState<ErrorPassValidation>({});

  const handleChange: FnOnChange = ({ name, value }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const validationFields = {
      email: data.email,
      password: data.password
    };

    const same = (): ErrorPassValidation => {
      if (data.password !== data.passwordDouble) {
        return { passwordDouble: 'Пароль не совпадает' };
      }
      return {};
    };
    const validErrors = { ...validator(validationFields, CONFIG_VALID), ...same() };

    setErrors(validErrors as ErrorPassValidation);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate();
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await authService.registration(data);
      console.log(response);
    } catch (e: any) {
      setErrors({ main: e?.response?.data?.message });
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
            <TextInput label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <TextInput
              label="повторите пароль"
              name="passwordDouble"
              type="password"
              value={data.passwordDouble}
              onChange={handleChange}
              error={errors.passwordDouble}
            />
            <SelectField
              label="Выберите уровень допуска"
              name="role"
              options={[{ id: 'OWNER', name: 'OWNER' }]}
              value={data.role}
              onChange={handleChange}
              defaultOption="ADMIN"
            />
            {errors.main && <p style={{ color: 'red' }}>{errors.main}</p>}
            <Button appearance="primary">Зарегистрировать</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminRegistration;
