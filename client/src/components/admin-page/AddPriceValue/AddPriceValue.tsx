import cn from 'classnames';
import { SelectField, TextInput, Button } from '../../ui';
import { WEIGHT } from '@/constants/consts';
import AddPriceValueProps from './AddPriceValue.props';

function AddPriceValue({ price, className, onChange, removePrice, error }: AddPriceValueProps) {
  const priceClassName = cn(className, { error });
  return (
    <>
      <div className={priceClassName}>
        <SelectField
          id={price.id}
          value={price.weight}
          name="weight"
          label="Вес"
          options={WEIGHT}
          onChange={onChange}
        />
        <TextInput id={price.id} name="value" value={price.value} onChange={onChange} label="Цена" />
        <Button appearance="primary" onClick={(e) => removePrice(e, price.id)}>
          Удалить
        </Button>
      </div>
      {error && <span className="error">{error}</span>}
    </>
  );
}

export default AddPriceValue;
