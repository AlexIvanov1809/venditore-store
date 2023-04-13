import { SortTypes } from '@/types/productTypes';
import { SortProps } from '@/types/uiTypes';

export default function wayOfSortingItems(type: keyof SortTypes, state: SortProps): SortProps {
  if (state.type === type && state.sort === 'asc') {
    return { type, sort: 'desc' };
  }
  if (state.type === type && state.sort === 'desc') {
    return { type, sort: 'asc' };
  }
  if (state.type !== type) {
    return { type, sort: 'asc' };
  }

  return { type, sort: 'asc' };
}
