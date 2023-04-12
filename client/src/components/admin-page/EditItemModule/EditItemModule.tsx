import React, { useEffect, useState } from 'react';
import { IProductForEdit, IProductPrice, INewProduct } from '@/types/productTypes';
import { ErrorValidation, FnOnChange } from '@/types/uiTypes';
import styles from './EditItemModule.module.css';
import { Button, TextAreaField, CheckBox, TextInput, ImgInput, SelectField } from '../../ui';
import AddPriceValue from '../AddPriceValue/AddPriceValue';
import httpService from '@/http/productAPI';
import { makeFormDataFile, imgUploader, removedPriceIds, validator, imgAndPriceValidator } from '@/utils';
import { LEVEL, DEFAULT, VALIDATOR_CONFIG } from '@/constants/consts';
import EditItemModuleProps from './EditItemModule.props';
import { useRootStore } from '@/context/StoreContext';

function EditItemModule({ product, onHide, updated }: EditItemModuleProps) {
  const { products } = useRootStore();
  const [data, setData] = useState(product || DEFAULT);
  const [img, setImg] = useState<(string | File)[]>(['', '', '']);
  const [price, setPrice] = useState<IProductPrice[]>(product?.price || [{ id: Date.now(), weight: '', value: '' }]);
  const [removedPrice, setRemovedPrice] = useState(false);
  const [errors, setErrors] = useState<ErrorValidation>({});

  useEffect(() => {
    if (product) {
      product.image.forEach((image) => {
        setImg((img) => img.map((i, ind) => (ind === image.row ? image.name : i)));
      });
    }
  }, [product]);

  useEffect(() => {
    validate();
  }, [data, price, img]);

  const validate = () => {
    const errors = {
      ...validator(data, VALIDATOR_CONFIG),
      ...imgAndPriceValidator(price, 'price'),
      ...imgAndPriceValidator(img, 'image')
    };
    setErrors(errors as ErrorValidation);
  };

  const changeHandle: FnOnChange = ({ name, value }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const changePrice: FnOnChange = ({ name, value }, id) => {
    setPrice(price.map((p) => (p.id === id ? { ...p, [name]: value } : p)));
  };

  const changeImgHandle = (index: number, file: File | string): void => {
    setImg((img) => img.map((i, ind) => (ind === index ? file : i)));
  };

  const addPrice = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPrice([...price, { id: Date.now(), weight: '', value: '' }]);
  };

  const removePrice = (e: React.MouseEvent<Element, MouseEvent>, id: number): void => {
    e.preventDefault();
    setPrice(price.filter((p) => p.id !== id));
    setRemovedPrice(true);
  };

  const submitHandle = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const filteredPrice = price.filter((p) => p.weight && p.value);
      if (product) {
        if (removedPrice) {
          const removedPriceId = removedPriceIds(price, product.price);
          removedPriceId.forEach((i) =>
            httpService
              .removePriceProduct(i)
              .then((data) => console.log(data))
              .catch((e) => console.log(e))
          );
        }
        imgUploader(img, product);
        const prod = { ...data, price: JSON.stringify(filteredPrice) } as IProductForEdit;
        httpService
          .editProduct(prod)
          .then(() => {
            onHide(false);
            updated(true);
          })
          .catch((e) => console.log(e.response.data));
      } else {
        const items = { ...data, price: JSON.stringify(filteredPrice) } as INewProduct;
        const formData = makeFormDataFile(items, img);
        httpService
          .createProduct(formData)
          .then(() => {
            onHide(false);
            updated(true);
          })
          .catch((e) => console.log(e.message));
      }
    }
  };
  return (
    <div className={styles.edit_module}>
      <div className={styles.edit_container}>
        <h3>{product ? 'Редактировать' : 'Создать'}</h3>
        <form onSubmit={submitHandle}>
          <div className={styles.edit_items}>
            <div className={styles.edit_img}>
              {img.length > 0 &&
                img.map((item, index) => (
                  <ImgInput
                    key={index}
                    name={`img${index}`}
                    index={index}
                    onChange={changeImgHandle}
                    remove
                    picName={item}
                    error={errors.image}
                  />
                ))}
            </div>
            <SelectField
              value={data.typeId}
              name="typeId"
              label="Вид товара"
              options={products.types}
              onChange={changeHandle}
              error={errors.typeId}
            />
            <SelectField
              value={data.brandId}
              name="brandId"
              label="Бренд"
              options={products.brands}
              onChange={changeHandle}
              error={errors.brandId}
            />
            <SelectField
              value={data.countryId}
              name="countryId"
              label="Страна"
              options={products.countries}
              onChange={changeHandle}
            />
            <TextInput
              label="Сорт или название"
              name="sortName"
              value={data.sortName}
              onChange={changeHandle}
              error={errors.sortName}
            />
            <SelectField
              value={data.manufacturingMethodId}
              name="manufacturingMethodId"
              label="Метод производства"
              options={products.manufacturingMethods}
              onChange={changeHandle}
            />
            <SelectField
              value={data.packageTypeId}
              name="packageTypeId"
              label="Вид упаковки"
              options={products.packageTypes}
              onChange={changeHandle}
            />
            <SelectField
              value={data.teaTypeId}
              name="teaTypeId"
              label="Тип чая"
              options={products.teaTypes}
              onChange={changeHandle}
            />
            <SelectField
              value={data.makingMethodId}
              name="makingMethodId"
              label="Метод приготовления"
              options={products.makingMethods}
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
            <div>
              <TextAreaField
                label="Короткое описание"
                name="shortDescription"
                value={data.shortDescription}
                onChange={changeHandle}
                error={errors.shortDescription}
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
              <Button appearance="primary" onClick={addPrice} disabled={price.length > 2}>
                Добавить цену
              </Button>
              {price.map((p) => (
                <AddPriceValue
                  key={p.id}
                  price={p}
                  onChange={changePrice}
                  removePrice={removePrice}
                  className={styles.edit_price}
                  error={errors.price}
                />
              ))}
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={() => onHide()} appearance="danger">
              Закрыть
            </Button>
            <Button appearance="primary" type="submit">
              {product ? 'Редактировать' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemModule;
