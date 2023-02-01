import React from "react";
import PropTypes from "prop-types";

const ItemImage = ({ item, images }) => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          {images.quarter && (
            <div
              className={
                "carousel-item" + (item === "quarter" ? +" active" : "")
              }
            >
              <img
                src={`../${images.quarter.htmlPath}`}
                className="d-block mx-auto"
                alt="Coffee 250"
              />
            </div>
          )}
          {images.kg && (
            <div
              className={"carousel-item" + (item === "kg" ? +" active" : "")}
            >
              <img
                src={`../${images.kg.htmlPath}`}
                className="d-block mx-auto"
                alt="Coffee 1000"
              />
            </div>
          )}
          {images.drip && (
            <div
              className={"carousel-item" + (item === "drip" ? +" active" : "")}
            >
              <img
                src={`../${images.drip.htmlPath}`}
                className="d-block mx-auto"
                alt="Coffee drip"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ItemImage.propTypes = {
  item: PropTypes.string,
  images: PropTypes.object
};

export default ItemImage;
