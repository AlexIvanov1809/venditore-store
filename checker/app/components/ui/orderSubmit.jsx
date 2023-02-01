import React, { useEffect, useState } from "react";
import TextForm from "../common/form/textForm";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";

const OrderSubmit = ({ onSubmit }) => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    comments: ""
  });
  const [errors, setErrors] = useState([]);
  const [errCheck, setErrCheck] = useState([]);

  const validatorConfig = {
    name: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    phone: {
      isRequired: { message: "Поле необходимое для заполнения" },
      onlyDigit: { message: "Неверный номер телефона" },
      minMax: { message: "Неверный номер телефона 949ХХХХХХХ", value: 10 }
    },
    address: {
      isRequired: { message: "Поле необходимое для заполнения" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrCheck(errors);
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errCheck).length === 0) {
      onSubmit(data);
    } else {
      setErrors(errCheck);
    }
  };

  return (
    <div className="card p-3">
      <form onSubmit={handleSubmit}>
        <TextForm
          label="Имя"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextForm
          label="Телефон"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <TextForm
          label="Адрес доставки"
          name="address"
          type="text"
          value={data.address}
          onChange={handleChange}
          error={errors.address}
        />
        <TextAreaField
          label="Комментарий к заказу"
          name="comments"
          value={data.comments}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100 mt-5">Оформить</button>
      </form>
    </div>
  );
};

OrderSubmit.propTypes = {
  hid: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default OrderSubmit;
