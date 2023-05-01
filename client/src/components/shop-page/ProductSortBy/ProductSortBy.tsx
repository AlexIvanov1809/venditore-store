import { useEffect, useState } from 'react';
import { SelectField } from '@/components/ui';
import { FnOnChange } from '@/types/uiTypes';
import { useRootStore } from '@/context/StoreContext';
import styles from './ProductSortBy.module.scss';

const SORT_TYPES = [
  { id: 'ASC', name: 'По возрастанию цены' },
  { id: 'DESC', name: 'По убыванию цены' }
];

function ProductSortBy() {
  const { products } = useRootStore();
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    products.setSelectedSortBy(sortBy);
  }, [sortBy]);

  const handleChange: FnOnChange = ({ value }) => {
    if (typeof value === 'string') {
      setSortBy(value);
    }
  };

  return (
    <div className={styles.sort}>
      <SelectField label="Сортировка" name="productSort" options={SORT_TYPES} value={sortBy} onChange={handleChange} />
    </div>
  );
}

export default ProductSortBy;
