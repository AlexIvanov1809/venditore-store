import React, { useState, useEffect } from "react";
import { PriceForTableProps } from "./PriceForTable.props";
import styles from "./PriceForTable.module.css";
import cn from "classnames";

const PriceForTable = ({ price }: PriceForTableProps): JSX.Element => {
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

export default PriceForTable;
