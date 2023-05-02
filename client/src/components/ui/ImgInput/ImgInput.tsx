import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import noPic from '@/assets/images/noImg.jpg';
import styles from './imgInput.module.scss';
import ImgInputProps from './ImgInput.props';
import config from '../../../config/config.json';

function ImgInput({ name, index, onChange, error, picName }: ImgInputProps) {
  const [imgSrc, setImgSrc] = useState<string>(noPic);
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgSrc(reader.result as string);
  };

  const className = cn(styles.img, { [styles.img_error]: error });

  useEffect(() => {
    if (picName) {
      setImgSrc(config.apiURL + picName);
    }
  }, [picName]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) {
      return;
    }
    const file = target.files[0];

    onChange(index, file);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImgSrc(noPic);
    onChange(index, '');
  };

  return (
    <div className={styles.img_container}>
      <div className={className}>
        <label htmlFor={name}>
          <img width={120} src={imgSrc} alt="No one" className="img-fluid" />
          <input
            aria-label="Image input"
            type="file"
            id={name}
            className="d-none"
            onChange={handleChange}
            accept="image/*,.png,.jpg,.jpeg,.webp,"
          />
        </label>
        {imgSrc !== noPic && (
          <button type="button" className={styles.img_btn} onClick={handleRemoveImage}>
            X
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ImgInput;
