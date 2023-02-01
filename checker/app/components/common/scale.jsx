import React from "react";
import PropTypes from "prop-types";

const Scale = ({ value, name }) => {
  return (
    <div>
      <span>{name}</span>
      <div className="scale">
        <div className="scale-inside" style={{ width: value * 10 + "%" }}></div>
      </div>
    </div>
  );
};
Scale.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string
};
export default Scale;
