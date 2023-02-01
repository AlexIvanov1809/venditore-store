import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import { validator } from "../../../utils/validator";
import CheckBoxField from "../../common/form/checkBoxField";
import { getTeaTypesList } from "../../../store/teaItems/teaType";
import { createNewTeaItem } from "../../../store/teaItems/teaItems";
import { getTeaPackagesList } from "../../../store/teaItems/teaPackages";
import { getTeaBrandsList } from "../../../store/teaItems/teaBrands";
import TextAreaField from "../../common/form/textAreaField";
import ImageLoaderField from "../../common/form/imageLoaderField";
import imageLoader from "../../../utils/imageLoader";

const CreateTeaItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    brand: "",
    images: {},
    package: "",
    type: "",
    description: "",
    name: "",
    weight: "",
    recipe: "",
    price: "",
    active: true
  });
  const [errors, setErrors] = useState({});

  const brands = useSelector(getTeaBrandsList());
  const teaPackages = useSelector(getTeaPackagesList());
  const teaTypes = useSelector(getTeaTypesList());
  const weight = [
    { _id: 0, value: 50 },
    { _id: 1, value: 75 },
    { _id: 2, value: 100 },
    { _id: 3, value: 125 },
    { _id: 4, value: 150 },
    { _id: 5, value: "шт" }
  ];

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleGetImage = (file, type) => {
    setData((prevState) => ({ ...prevState, images: { [type]: file } }));
  };
  const validatorConfig = {
    brand: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    type: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    package: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    name: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    description: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    weight: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    price: {
      isRequired: { message: "Поле необходимое для заполнения" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
  };

  const clearForm = () => {
    setData({
      brand: "",
      images: {},
      package: "",
      type: "",
      description: "",
      name: "",
      price: "",
      recipe: "",
      weight: "",
      active: true
    });
  };

  const back = () => {
    navigate(-1);
    clearForm();
  };

  const isValid = Object.keys(errors).length === 0 && data.images?.tea;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImage = await imageLoader(data.images);
    data.images = uploadedImage;
    dispatch(createNewTeaItem(data, back));
  };
  if (!brands) {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container  position-relative mt-5 mb-5">
          <button
            className="btn btn-primary position-absolute t-2"
            style={{ left: "10%" }}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
          <div className="d-flex align-items-center justify-content-center">
            <div className="shadow p-4" style={{ maxWidth: "450px" }}>
              <label className="fw-700 fs-3 mb-2">Создать новую карточку</label>
              <form onSubmit={handleSubmit}>
                <ImageLoaderField
                  mainImagePath="img/noFoto/noImg.jpg"
                  type="tea"
                  onChange={handleGetImage}
                  error={!data.images?.tea}
                />
                <SelectField
                  label="Выберите Бренд"
                  value={data.brand}
                  defaultOption=""
                  name="brand"
                  options={brands}
                  onChange={handleChange}
                  error={errors.brand}
                />
                <SelectField
                  label="Выберите Вид"
                  value={data.type}
                  defaultOption=""
                  name="type"
                  options={teaTypes}
                  onChange={handleChange}
                  error={errors.type}
                />
                <SelectField
                  label="Выберите Упаковку"
                  value={data.package}
                  defaultOption=""
                  name="package"
                  options={teaPackages}
                  onChange={handleChange}
                  error={errors.package}
                />
                <TextForm
                  label="Введите Название"
                  name="name"
                  type="text"
                  value={data.name || ""}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextAreaField
                  label="Введите описание"
                  name="description"
                  value={data.description || ""}
                  onChange={handleChange}
                  error={errors.description}
                />
                <SelectField
                  label="Выберите вес или шт"
                  value={data.weight}
                  defaultOption=""
                  name="weight"
                  options={weight}
                  onChange={handleChange}
                  error={errors.weight}
                />
                <TextForm
                  className="w-25"
                  label="Цена за кг."
                  name="price"
                  type="text"
                  value={data.price || ""}
                  onChange={handleChange}
                  error={errors.price}
                />
                <CheckBoxField
                  named="active"
                  value={data.active}
                  onChange={handleChange}
                >
                  Активность
                </CheckBoxField>

                <button
                  disabled={!isValid}
                  className="btn btn-primary ms-2 mb-2 h-25"
                >
                  Создать
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CreateTeaItem;
