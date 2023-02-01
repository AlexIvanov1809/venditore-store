import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../buttons/deleteButton";

const Counter = ({ orderItems, onChange, onDelete }) => {
  const { _id: id, quantity, name, price, weight, beans, brand } = orderItems;

  return (
    <li key={id} className="">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex flex-wrap mt-2">
          <div className="ms-2">
            <span>{brand}</span>{" "}
          </div>
          <div className="ms-2">
            <span className="fw-bold">{name}</span>{" "}
            <div className="fst-italic">{beans}</div>
          </div>
        </div>
        <div className="d-flex">
          <div className="mx-2 text-center">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-white text-primary fs-6 btn-sm m-1"
                onClick={() => onChange(id, 1)}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
              <span className="fs-6 mx-2">{quantity}</span>

              <button
                className="btn btn-white text-danger fs-6 btn-sm m-1"
                onClick={() => (quantity > 1 ? onChange(id, -1) : onDelete(id))}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
            <div className="fw-bold">
              <span>1 шт. {price} &#8381;</span>
            </div>
            <div>{weight}</div>
          </div>
          <div className="fl">
            <div className="w-100 mt-2 text-end">
              <span className="fw-bold text-primary">
                {price * quantity} &#8381;
              </span>
            </div>
            <DeleteButton onDelete={onDelete} itemId={id} />
          </div>
        </div>
      </div>
      <hr />
    </li>
  );
};

Counter.propTypes = {
  orderItems: PropTypes.object,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
};

export default Counter;
