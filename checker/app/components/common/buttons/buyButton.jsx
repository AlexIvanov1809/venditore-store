import React, { useState } from "react";
import PropTypes from "prop-types";

const BuyButton = ({ onChange, bought, onOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const handleChange = (counter) => {
    setQuantity(quantity + counter);
  };

  const handleSubmit = (qty) => {
    onChange(qty);
    onOrder("ordered");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <span
          className="text-primary fs-5"
          role="button"
          onClick={quantity > 1 ? () => handleChange(-1) : () => {}}
        >
          <i className="bi bi-dash-lg"></i>
        </span>
        <span className="mx-2 fs-3">{quantity}</span>
        <span
          className="text-primary fs-5"
          role="button"
          onClick={() => handleChange(1)}
        >
          <i className="bi bi-plus-lg"></i>
        </span>
      </div>
      <button
        onClick={() => handleSubmit(quantity)}
        className="btn btn-primary"
      >
        {bought ? "В корзину" : "Купить"}
      </button>
    </div>
  );
};

BuyButton.propTypes = {
  onChange: PropTypes.func,
  onOrder: PropTypes.func,
  bought: PropTypes.bool
};

export default BuyButton;
