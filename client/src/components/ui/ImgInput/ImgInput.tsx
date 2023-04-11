import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './imgInput.module.css';
import noPic from '../../../assets/noImg.jpg';
import ImgInputProps from './ImgInput.props';
import config from '../../../config/config.json';

function ImgInput({ name, index, onChange, remove, error, picName }: ImgInputProps) {
  const [imgUrl, setImgUrl] = useState<string>(noPic);
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result as string);
  };

  const className = cn(styles.img, { [styles.img_error]: error });

  useEffect(() => {
    if (picName) {
      setImgUrl(config.apiURL + picName);
    }
  }, [picName]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0];

      onChange(index, file);
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImgUrl(noPic);
    onChange(index, '');
  };

  return (
    <div className={styles.img_container}>
      <div className={className}>
        <label htmlFor={name}>
          <img width={120} src={imgUrl} alt="No one" className="img-fluid" />
        </label>
        <input
          type="file"
          id={name}
          className="d-none"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.jpeg,.webp,"
        />
        {remove && (
          <div className={styles.img_btn} role="button" onClick={handleRemoveImage}>
            X
          </div>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ImgInput;
