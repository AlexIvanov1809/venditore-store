import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getBrandsList } from "../../store/brands";
import { getCountriesList } from "../../store/countries";
import { getMethodsList } from "../../store/methods";
import { getKindsList } from "../../store/kinds";

const Converter = ({ id, itemName }) => {
  const items = {
    brand: useSelector(getBrandsList()),
    countries: useSelector(getCountriesList()),
    method: useSelector(getMethodsList()),
    kind: useSelector(getKindsList())
  };
  const data = items[itemName].filter((i) => i._id === id);

  return <p>{data[0].value}</p>;
};
Converter.propTypes = {
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired
};

export default Converter;
