import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageLoaderField = ({ mainImagePath, type, onChange, remove, error }) => {
  const [imgUrl, setImgUrl] = useState();
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result);
  };

  const handleChange = ({ target }) => {
    if (!target.files[0]) {
      return;
    }

    const file = target.files[0];

    onChange(file, type);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImgUrl("../../../img/noFoto/noImg.jpg");
    onChange("", type);
  };

  return (
    <div className="container mt-4 mb-4">
      <div
        className={
          "card p-1 position-relative m-auto" + (error ? " border-danger" : "")
        }
        style={{ maxWidth: "200px", maxHeight: "200px" }}
      >
        <label htmlFor={type}>
          <img
            src={!imgUrl ? "../../" + mainImagePath : imgUrl}
            alt="No photo"
            className="img-fluid"
          />
        </label>
        <input
          type="file"
          id={type}
          className="d-none"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.jpeg,.webp,"
        />
        {remove && (
          <div
            role="button"
            onClick={handleRemoveImage}
            className="position-absolute top-0 end-0 m-1 px-2 bg-danger text-white text-center rounded"
          >
            x
          </div>
        )}
      </div>
      {error && (
        <p className="text-danger">
          Поле необходимое для заполнения вместе с ценой
        </p>
      )}
    </div>
  );
};

ImageLoaderField.propTypes = {
  mainImagePath: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  remove: PropTypes.bool,
  error: PropTypes.bool
};

export default ImageLoaderField;
