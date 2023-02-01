import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PriceItem = ({ item, onChange }) => {
  const [opacity, setOpacity] = useState({
    quarter: true,
    kg: false,
    drip: false
  });

  useEffect(() => {
    if (item.price.quarter) {
      setOpacity({
        quarter: true,
        kg: false,
        drip: false
      });
    } else if (item.price.kg) {
      setOpacity({
        quarter: false,
        kg: true,
        drip: false
      });
    } else if (item.price.drip) {
      setOpacity({
        quarter: false,
        kg: false,
        drip: true
      });
    }
  }, []);

  const hiddenChecker = (item) => {
    if (!item) {
      return true;
    } else {
      return false;
    }
  };
  const handleOpacity = (item) => {
    onChange(item);
    const trueItem = Object.keys(opacity).find((k) => opacity[k] === true);
    setOpacity({ ...opacity, [trueItem]: false, [item]: true });
  };
  return (
    <>
      <div className="d-flex mt-3">
        <div
          className={
            "prise ms-2 text-center" +
            (opacity.quarter ? "" : " text-black text-opacity-50 ")
          }
          hidden={hiddenChecker(item.price.quarter)}
          onClick={() => handleOpacity("quarter")}
          role="button"
        >
          <h6>250 г.</h6>
          <span>{item.price.quarter} &#8381;</span>
        </div>
        <div
          className={
            "prise mx-2 text-center" +
            (opacity.kg ? "" : " text-black text-opacity-50")
          }
          hidden={hiddenChecker(item.price.kg)}
          onClick={() => handleOpacity("kg")}
          role="button"
        >
          <h6>1000 г.</h6>
          <span>{item.price.kg} &#8381;</span>
        </div>
        <div
          className={
            "prise text-center" +
            (opacity.drip ? "" : " text-black text-opacity-50")
          }
          hidden={hiddenChecker(item.price.drip)}
          onClick={() => handleOpacity("drip")}
          role="button"
        >
          <h6>шт.</h6>
          <span>{item.price.drip} &#8381;</span>
        </div>
      </div>
    </>
  );
};

PriceItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PriceItem;
