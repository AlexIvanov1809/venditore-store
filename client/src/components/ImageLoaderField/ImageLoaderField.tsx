import React, { useState } from "react";
import { ImageLoaderFieldProps } from "./ImageLoaderField.props";

const ImageLoaderField = ({
  mainImagePath,
  type,
  getChange,
  remove,
  error,
  ...props
}: ImageLoaderFieldProps) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      setImgUrl(reader.result);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files[0]) {
      return;
    }

    const file = target.files[0];

    getChange(file, type);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImgUrl("../../../img/noPhoto/noImg.jpg");
    getChange("", type);
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

export default ImageLoaderField;
