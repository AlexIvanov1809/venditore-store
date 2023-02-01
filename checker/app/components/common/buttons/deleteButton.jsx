import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete, itemId, name }) => {
  return (
    <>
      <button
        className="btn btn-white text-danger ms-3"
        onClick={() => onDelete(itemId, name)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  );
};

DeleteButton.propTypes = {
  itemId: PropTypes.string,
  onDelete: PropTypes.func,
  name: PropTypes.string
};

export default DeleteButton;
