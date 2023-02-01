import React, { useState } from "react";
import PropTypes from "prop-types";
import TextForm from "../common/form/textForm";
import DeleteButton from "../common/buttons/deleteButton";

const Entity = ({ items, onDelete, onSubmit, label, name, loading }) => {
  const [data, setData] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const clearForm = () => {
    setData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    clearForm();
  };

  return (
    <div className="card m-1" style={{ overflow: "hidden" }}>
      <div className="p-2">
        <form className="d-flex align-items-end" onSubmit={handleSubmit}>
          <TextForm
            label={label}
            name={name}
            type="text"
            value={data[name] || ""}
            onChange={handleChange}
          />
          <button className="btn btn-white text-primary fs-6 ms-2 mb-2 h-25">
            <i className="bi bi-plus-circle"></i>
          </button>
        </form>
        <div>
          <div
            className="card bg-secondary bg-opacity-25 px-2 mb-2"
            style={{ height: "100%" }}
          >
            {!loading ? (
              items ? (
                items.map((item) => (
                  <div key={item._id}>
                    {item.value}
                    <DeleteButton
                      onDelete={onDelete}
                      itemId={item._id}
                      name={name}
                    />
                  </div>
                ))
              ) : (
                "Нет данных"
              )
            ) : (
              <div className="d-flex justify-content-center w-100 mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Entity.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool
};

export default Entity;
