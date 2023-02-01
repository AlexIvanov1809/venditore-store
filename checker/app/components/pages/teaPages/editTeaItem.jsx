import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import CheckBoxField from "../../common/form/checkBoxField";
import { getTeaTypesList } from "../../../store/teaItems/teaType";
import { editTeaItem, getTeaItemById } from "../../../store/teaItems/teaItems";
import { getTeaPackagesList } from "../../../store/teaItems/teaPackages";
import { getTeaBrandsList } from "../../../store/teaItems/teaBrands";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import ImageLoaderField from "../../common/form/imageLoaderField";
import imageUpdater from "../../../utils/imageUpdater";

const EditTeaItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const brands = useSelector(getTeaBrandsList());
  const teaPackages = useSelector(getTeaPackagesList());
  const teaTypes = useSelector(getTeaTypesList());
  const currenTeaItem = useSelector(getTeaItemById(itemId));
  const weight = [
    { _id: 0, value: 50 },
    { _id: 1, value: 75 },
    { _id: 2, value: 100 },
    { _id: 3, value: 125 },
    { _id: 4, value: 150 },
    { _id: 5, value: "шт" }
  ];
  const [data, setData] = useState();
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    if (currenTeaItem) {
      setData({
        ...currenTeaItem
      });
    }
  }, [currenTeaItem]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleGetImage = (file, type) => {
    setImage((prevState) => ({ ...prevState, [type]: file }));
  };
  const back = () => {
    navigate(-1);
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const update = await imageUpdater(image, data);
      data.images = update;
    }
    dispatch(editTeaItem(data, back));
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
        {data ? (
          <div className="container mb-5 mt-5 position-relative">
            <button
              className="btn btn-primary position-absolute t-2 start-25"
              style={{ left: "10%" }}
              onClick={() => navigate(-1)}
            >
              Назад
            </button>
            <div className="d-flex align-items-center justify-content-center">
              <div className=" shadow p-4" style={{ width: "450px" }}>
                <label className="fw-700 fs-3 mb-2">Изменить карточку</label>
                <form onSubmit={handleSubmit}>
                  <ImageLoaderField
                    mainImagePath={
                      data.images.tea
                        ? "../../../" + data.images.tea.htmlPath
                        : "../img/noFoto/noImg.jpg"
                    }
                    type="tea"
                    onChange={handleGetImage}
                    error={!image && !data.images.tea}
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
                    Изменить
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          "loading.."
        )}
      </>
    );
  }
};

export default EditTeaItem;
