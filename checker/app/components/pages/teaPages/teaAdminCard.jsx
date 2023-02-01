import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import fileService from "../../../service/file.service";
import {
  getTeaItemById,
  teaItemRemove
} from "../../../store/teaItems/teaItems";
import currentPrice from "../../../utils/currentPrice";
import timeChanger from "../../../utils/time";

const TeaAdminCard = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currenTeaItem = useSelector(getTeaItemById(itemId));
  const created = timeChanger(currenTeaItem ? currenTeaItem.createdAt : null);
  const updated = timeChanger(currenTeaItem ? currenTeaItem.updatedAt : null);
  const price = currenTeaItem ? currentPrice(currenTeaItem) : null;
  const [acception, setAcception] = useState(false);

  const handleChange = () => {
    setAcception(!acception);
  };
  const back = () => {
    navigate("/adminPanel/tea");
  };
  const handleDelete = async () => {
    for (const key in currenTeaItem.images) {
      if (currenTeaItem.images[key]) {
        const { content } = await fileService.remove(currenTeaItem.images[key]);
        console.log(content.message);
      }
    }
    dispatch(teaItemRemove(currenTeaItem._id, back()));
  };
  if (!currenTeaItem) {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mt-5">
        <button
          className="btn btn-primary"
          style={{ height: "50px" }}
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
        <div
          className="div  w-75  text-center shadow p-2 ms-5"
          style={{ maxWidth: "450px" }}
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
          <span>
            Вид упаковки: <b>{currenTeaItem.package}</b>
          </span>
          <h4>{currenTeaItem.brand}</h4>
          <p>{currenTeaItem.type}</p>
          <img
            src={"../../../" + currenTeaItem.images.tea.htmlPath}
            className="d-block w-50 mx-auto"
            alt="Tea"
          />
          <h2>{currenTeaItem.name}</h2>
          <p className="text-start px-5 mt-4">{currenTeaItem.description}</p>
          {currenTeaItem.recipe && (
            <span className="px-5 mt-4 mb-4">{currenTeaItem.recipe}</span>
          )}
          <div className="mb-4">
            <span className="me-3">
              Еденица измерения:{" "}
              <b>
                {currenTeaItem.weight === "шт"
                  ? currenTeaItem.weight
                  : currenTeaItem.weight + " г"}
              </b>
            </span>
            <span>
              Цена за шт: <b>{price} &#8381;</b>
            </span>
          </div>
          {currenTeaItem.weight !== "шт" ? (
            <span>
              Цена за кг: <b>{currenTeaItem.price} &#8381;</b>
            </span>
          ) : (
            ""
          )}

          <div className="mt-4 text-end">
            <Link
              className="me-4"
              to={`/adminPanel/tea/${currenTeaItem._id}/edit`}
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
    );
  }
};

export default TeaAdminCard;
