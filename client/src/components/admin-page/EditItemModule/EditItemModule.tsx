import React, { useEffect, useState } from 'react';
import { IProductPrice } from '@/types/productTypes';
import { FnOnChange } from '@/types/uiTypes';
import httpService from '@/http/productAPI';
import { makeFormDataFile, imgUploader, imageValidator, normalizedPricesData, priceValidator } from './helpers/';
import { VALIDATOR_CONFIG } from '@/constants/configConstants';
import { useRootStore } from '@/context/StoreContext';
import styles from './EditItemModule.module.scss';
import { Button, TextAreaField, CheckBox, TextInput, ImgInput, SelectField } from '../../ui';
import AddPriceValue from '../AddPriceValue/AddPriceValue';
import EditItemModuleProps from './EditItemModule.props';
import { DEFAULT, LEVEL } from '@/constants/adminPageConstants';
import useValidation from '@/hooks/useValidation';
import makeErrorMsg from '../utils/makeErrorMsg';

function EditItemModule({ product, onHide, onUpdated }: EditItemModuleProps) {
  const { products, adminErrors } = useRootStore();
  function initialState() {
    return product?.prices || [{ id: Date.now(), weight: '', value: '' }];
  }

  const [data, setData] = useState(product || DEFAULT);
  const [img, setImg] = useState<(string | File)[]>(['', '', '']);
  const [prices, setPrices] = useState<IProductPrice[]>(initialState);
  const brandErrors = useValidation(data.brandId, VALIDATOR_CONFIG.required);
  const typeErrors = useValidation(data.typeId, VALIDATOR_CONFIG.required);
  const sortNameErrors = useValidation(data.sortName, VALIDATOR_CONFIG.required);
  const shortDescErrors = useValidation(data.shortDescription, VALIDATOR_CONFIG.required);
  const priceError = priceValidator(prices);
  const imageError = imageValidator(img);

  useEffect(() => {
    if (product) {
      product.images.forEach((image) => {
        setImg((prev) => prev.map((i, ind) => (ind === image.row ? image.name : i)));
      });
    }
  }, [product]);

  const validate = () => {
    return !!brandErrors || !!typeErrors || !!sortNameErrors || !!shortDescErrors || !!priceError || !!imageError;
  };

  const changeHandle: FnOnChange = ({ name, value }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const changePrice: FnOnChange = ({ name, value, id }) => {
    setPrices(prices.map((p) => (p.id === id ? { ...p, [name]: value } : p)));
  };

  const changeImgHandle = (index: number, file: File | string): void => {
    setImg((imgs) => imgs.map((i, ind) => (ind === index ? file : i)));
  };

  const addPrice = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPrices([...prices, { id: Date.now(), weight: '', value: '' }]);
  };

  const removePrice = (e: React.MouseEvent<Element, MouseEvent>, id: number): void => {
    e.preventDefault();
    setPrices(prices.filter((p) => p.id !== id));
  };

  const submitHandle = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredPrice = prices.filter((p) => p.weight && p.value);
    if (product) {
      const normalizedPrices = normalizedPricesData(filteredPrice, product.prices);

      try {
        await imgUploader(img, product);
        const prod = { ...data, prices: JSON.stringify(normalizedPrices) };
        await httpService.editProduct(prod);
        onHide(false);
        onUpdated(true);
      } catch (e: any) {
        const errorMsg = makeErrorMsg(e);
        adminErrors.setError(errorMsg);
      }
      return;
    }

    try {
      const items = { ...data, prices: JSON.stringify(filteredPrice) };
      const formData = makeFormDataFile(items, img);
      await httpService.createProduct(formData);
      onHide(false);
      onUpdated(true);
    } catch (e: any) {
      const errorMsg = makeErrorMsg(e);
      adminErrors.setError(errorMsg);
    }
  };

  return (
    <div className={styles.edit_module}>
      <div className={styles.edit_container}>
        <h3>{product ? 'Редактировать' : 'Создать'}</h3>
        <form onSubmit={submitHandle}>
          <div className={styles.edit_items}>
            <div className={styles.edit_img}>
              {img.map((picName, index) => (
                <ImgInput
                  key={index}
                  name={`img${index}`}
                  index={index}
                  onChange={changeImgHandle}
                  picName={picName}
                  error={imageError}
                />
              ))}
            </div>
            <div className={styles.edit_item}>
              <SelectField
                value={data.typeId}
                name="typeId"
                label="Вид товара"
                options={products.types}
                onChange={changeHandle}
                error={typeErrors}
              />
              <SelectField
                value={data.brandId}
                name="brandId"
                label="Бренд"
                options={products.brands}
                onChange={changeHandle}
                error={brandErrors}
              />
              <SelectField
                value={data.countryId}
                name="countryId"
                label="Страна"
                options={products.countries}
                onChange={changeHandle}
              />
            </div>
            <div className={styles.edit_item}>
              <SelectField
                value={data.makingMethodId}
                name="makingMethodId"
                label="Метод приготовления"
                options={products.makingMethods}
                onChange={changeHandle}
              />
              <TextInput
                label="Сорт или название"
                name="sortName"
                value={data.sortName}
                onChange={changeHandle}
                error={sortNameErrors}
              />
            </div>
            <div className={styles.edit_item}>
              <SelectField
                value={data.manufacturingMethodId}
                name="manufacturingMethodId"
                label="Особенности кофе"
                options={products.manufacturingMethods}
                onChange={changeHandle}
              />
              <SelectField
                value={data.acidity}
                name="acidity"
                label="Кислотность"
                options={LEVEL}
                onChange={changeHandle}
              />
              <SelectField
                value={data.density}
                name="density"
                label="Плотность"
                options={LEVEL}
                onChange={changeHandle}
              />
            </div>
            <div className={styles.edit_item}>
              <SelectField
                value={data.teaTypeId}
                name="teaTypeId"
                label="Тип чая"
                options={products.teaTypes}
                onChange={changeHandle}
              />
              <SelectField
                value={data.packageTypeId}
                name="packageTypeId"
                label="Вид упаковки"
                options={products.packageTypes}
                onChange={changeHandle}
              />
            </div>
            <div className={styles.s}>
              <TextAreaField
                label="Короткое описание"
                name="shortDescription"
                value={data.shortDescription}
                onChange={changeHandle}
                error={shortDescErrors}
              />
              <TextAreaField
                label="Полное описание"
                name="description"
                value={data.description}
                onChange={changeHandle}
              />
            </div>
            <CheckBox name="active" value={data.active} onChange={changeHandle}>
              Активность
            </CheckBox>
            <div>
              <Button appearance="primary" onClick={addPrice} disabled={prices.length > 2}>
                Добавить цену
              </Button>
              {prices.map((price) => (
                <AddPriceValue
                  key={price.id}
                  price={price}
                  onChange={changePrice}
                  removePrice={removePrice}
                  className={styles.edit_price}
                  error={priceError}
                />
              ))}
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={() => onHide()} appearance="danger">
              Закрыть
            </Button>
            <Button disabled={validate()} appearance="primary" type="submit">
              {product ? 'Редактировать' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemModule;
