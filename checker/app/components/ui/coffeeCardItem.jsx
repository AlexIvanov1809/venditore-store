import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemImage from "./itemImage";
import Scale from "../common/scale";
import PriceItem from "./priceItem";
import BuyButton from "../common/buttons/buyButton";
import SelectField from "../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import {
  editItemBasket,
  getStore,
  storeAdding
} from "../../store/consumerBasket";
import localStorageSevice from "../../service/localStorage.service";

const CoffeeCardItem = ({ coffeeItem, onOrder }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [bought, setBought] = useState(false);
  const [bean, setBean] = useState({ name: "beans", value: "в зернах" });
  const beans = [
    { _id: 1, value: "для чашки" },
    { _id: 2, value: "для фильтра" },
    { _id: 3, value: "для эспрессо" }
  ];
  useEffect(() => {
    if (!coffeeItem.price.quarter) {
      if (!coffeeItem.price.kg) {
        if (!coffeeItem.price.drip) {
          setName("");
        } else {
          setName("drip");
        }
      } else {
        setName("kg");
      }
    } else {
      setName("quarter");
    }
  }, []);
  const basket = useSelector(getStore());
  useEffect(() => {
    if (basket.length > 0) {
      localStorageSevice.setBasketItems(basket);
    }
    basket.forEach((i) => {
      if (i._id.split(".")[0] === coffeeItem._id) {
        return setBought(true);
      }
    });
  }, [basket]);

  const HandleChangeImg = (itemName) => {
    setName(itemName);
  };

  const handleChange = (item) => {
    setBean(item);
  };

  const handleSubmit = (item) => {
    let same = false;
    let weight;
    switch (name) {
      case "quarter":
        weight = "250 г.";
        break;
      case "kg":
        weight = "1 кг.";
        break;
      case "drip":
        weight = "дрип пакет";
        break;
    }
    const order = {
      _id: coffeeItem._id + "." + name + bean.value,
      [bean.name]: bean.value,
      name: coffeeItem.name,
      brand: coffeeItem.brand,
      quantity: item,
      price: coffeeItem.price[name],
      weight
    };
    basket.map((i) => {
      if (i._id === order._id) {
        same = true;
        const newQuantity = order.quantity + i.quantity;
        order.quantity = newQuantity;
      }
      return i;
    });
    if (!same) {
      dispatch(storeAdding(order));
    } else {
      dispatch(editItemBasket(order));
    }
  };
  return (
    <>
      <div
        className="m-4 d-flex flex-column justify-content-between align-items-stretch shadow p-4"
        style={{ width: "370px" }}
      >
        <div>
          <h5 className="text-uppercase">{coffeeItem.brand}</h5>
          <p>{coffeeItem.preparationMethod}</p>
          <h4 className="text-uppercase">{coffeeItem.name}</h4>
          <p>{coffeeItem.method}</p>

          <ItemImage
            images={coffeeItem.images}
            item={name}
            visibility={coffeeItem.price}
          />
          <p>{coffeeItem.kind}</p>

          <p className="" style={{ textAlign: "justify" }}>
            {coffeeItem.description}
          </p>
        </div>
        <div>
          <div className="d-flex justify-content-evenly">
            <Scale value={coffeeItem.acidity} name="Кислотность" />
            <Scale value={coffeeItem.density} name="Плотность" />
          </div>
          <div className="w-50">
            <SelectField
              label=""
              value={bean.value}
              defaultOption="в зернах"
              name="beans"
              options={beans}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <PriceItem item={coffeeItem} onChange={HandleChangeImg} />
            <BuyButton
              bought={bought}
              onOrder={onOrder}
              onChange={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

CoffeeCardItem.propTypes = {
  coffeeItem: PropTypes.object,
  onOrder: PropTypes.func
};

export default CoffeeCardItem;
