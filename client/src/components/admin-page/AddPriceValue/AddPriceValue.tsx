import cn from 'classnames';
import { SelectField, TextInput, Button } from '../../ui';
import AddPriceValueProps from './AddPriceValue.props';
import { WEIGHT } from '@/constants/adminPageConstants';
import { FnOnChange } from '@/types/uiTypes';

function AddPriceValue({ price, className, onChange, removePrice, error }: AddPriceValueProps) {
  const priceClassName = cn(className, { error });

  const handleChange: FnOnChange = ({ name, value }) => {
    onChange({ name, value, id: price.id });
  };
  return (
    <>
      <div className={priceClassName}>
        <SelectField value={price.weight} name="weight" label="Вес" options={WEIGHT} onChange={handleChange} />
        <TextInput name="value" value={price.value.toString()} onChange={handleChange} label="Цена" />
        <Button appearance="primary" onClick={(e) => removePrice(e, price.id)}>
          Удалить
        </Button>
      </div>
      {error && <span className="error">{error}</span>}
    </>
  );
}

export default AddPriceValue;
