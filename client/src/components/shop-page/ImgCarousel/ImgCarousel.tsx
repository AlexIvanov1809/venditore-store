import { useState } from "react";
import cn from "classnames";
import { IProductImage } from "@/types/productType";
import styles from "./ImgCarousel.module.css";
import config from "../../../config/config.json";

interface Props {
  images: IProductImage[];
}

function ImgCarousel({ images }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = () => {
    setImgIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const next = () => {
    setImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };
  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_main}>
        <div className={styles.carousel_container} style={{ transform: `translateX(-${imgIndex * 200}px)` }}>
          {images && images.map((i) => <img key={i.id} width={200} src={config.apiURL + i.name} alt="item" />)}
        </div>
      </div>
      {images.length > imgIndex && imgIndex !== 0 && (
        <button className={cn(styles.carousel_btn, styles.btn_prev)} onClick={prev}>
          {"<"}
        </button>
      )}
      {images.length > imgIndex && imgIndex !== images.length - 1 && (
        <button className={cn(styles.carousel_btn, styles.btn_next)} onClick={next}>
          {">"}
        </button>
      )}
    </div>
  );
}

export default ImgCarousel;
