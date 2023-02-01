import React from "react";
import PropTypes from "prop-types";

const Price = ({ price }) => {
  return (
    <>
      {price ? (
        <div className="d-flex justify-content-evenly">
          {price.quarter ? (
            <div>
              <h6>250г</h6>
              <p>{price.quarter}</p>
            </div>
          ) : (
            ""
          )}
          {price.kg ? (
            <div className="mx-2">
              <h6>1000г</h6>
              <p>{price.kg}</p>
            </div>
          ) : (
            ""
          )}
          {price.drip ? (
            <div>
              <h6>шт</h6>
              <p>{price.drip}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

Price.propTypes = {
  price: PropTypes.object
};

export default Price;
