import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import fileService from "../../../service/file.service";
import {
  coffeeItemRemove,
  getCoffeeItemById
} from "../../../store/coffeeItems/coffeeItems";
import Scale from "../../common/scale";
import timeChanger from "../../../utils/time";

const CoffeeAdminCard = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coffeeItem = useSelector(getCoffeeItemById(itemId));
  const created = timeChanger(coffeeItem ? coffeeItem.createdAt : null);
  const updated = timeChanger(coffeeItem ? coffeeItem.updatedAt : null);
  const [acception, setAcception] = useState(false);

  const handleChange = () => {
    setAcception(!acception);
  };
  const back = () => {
    navigate("/adminPanel/coffee");
  };

  const handleDelete = async () => {
    for (const key in coffeeItem.images) {
      if (coffeeItem.images[key]) {
        const { content } = await fileService.remove(coffeeItem.images[key]);
        console.log(content.message);
      }
    }
    dispatch(coffeeItemRemove(coffeeItem._id, back()));
  };

  if (!coffeeItem) {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <div
          className="d-flex justify-content-center mt-2"
          style={{ maxWidth: "650px" }}
        >
          <button
            className="btn btn-primary"
            style={{ height: "50px" }}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
          <div
            className="div  w-75  text-center shadow p-2 ms-5"
            style={{ width: "550px" }}
          >
            <div className="text-start mb-4 ms-5">
              <p>
                <b>Создан: </b>
                {created[0]} {created[1]}
              </p>
              <p>
                <b>Изменен: </b>
                {updated[0]} {updated[1]}
              </p>
            </div>
            <h4>{coffeeItem.brand}</h4>
            <p>{coffeeItem.preparationMethod}</p>
            <h2>{coffeeItem.name}</h2>
            <div className="d-flex justify-content-evenly">
              {coffeeItem.images.quarter && (
                <div className="w-25">
                  <img
                    className="w-100"
                    src={"../../../" + coffeeItem.images.quarter.htmlPath}
                    alt=""
                  />
                </div>
              )}
              {coffeeItem.images.kg && (
                <div className="w-25">
                  <img
                    className="w-100"
                    src={"../../../" + coffeeItem.images.kg.htmlPath}
                    alt=""
                  />
                </div>
              )}
              {coffeeItem.images.drip && (
                <div className="w-25">
                  <img
                    className="w-100"
                    src={"../../../" + coffeeItem.images.drip.htmlPath}
                    alt=""
                  />
                </div>
              )}
            </div>
            <p>{coffeeItem.method}</p>

            <p>{coffeeItem.kind}</p>

            <p className="text-start px-5">{coffeeItem.description}</p>

            <div className="d-flex justify-content-evenly">
              <Scale value={coffeeItem.acidity} name="Кислотность" />
              <Scale value={coffeeItem.density} name="Плотность" />
            </div>
            <div className="d-flex justify-content-evenly mt-4">
              {coffeeItem.price.quarter && (
                <span>
                  {" "}
                  250 г: <b>{coffeeItem.price.quarter} &#8381;</b>
                </span>
              )}
              {coffeeItem.price.kg && (
                <span>
                  {" "}
                  1000 г: <b>{coffeeItem.price.kg} &#8381;</b>
                </span>
              )}
              {coffeeItem.price.drip && (
                <span>
                  {" "}
                  шт: <b>{coffeeItem.price.drip} &#8381;</b>
                </span>
              )}
            </div>
            <div className="mt-4 text-end">
              <Link
                className="me-4"
                to={`/adminPanel/coffee/${coffeeItem._id}/edit`}
              >
                <span className="btn btn-primary">Изменить</span>
              </Link>
              <div className="d-flex align-items-center justify-content-end mt-3">
                <span className="text-danger me-3">
                  <b>Чтобы удалить поставь галочку</b>
                </span>
                <input
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  type="checkbox"
                  name="accept"
                  id="accept"
                  onChange={handleChange}
                />
                <button
                  disabled={!acception}
                  onClick={handleDelete}
                  className="btn btn-danger mx-4"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CoffeeAdminCard;
