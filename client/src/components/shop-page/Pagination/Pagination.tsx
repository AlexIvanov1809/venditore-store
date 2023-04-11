import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import styles from './Pagination.module.css';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  className: string;
}

const Pagination = observer(({ className }: Props) => {
  const { products } = useRootStore();
  const pageCount = Math.ceil(products.totalCount / products.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={cn(className, styles.pagination)}>
      {pages.length > 1 &&
        pages.map((p, i) => (
          <div key={i} data-active={products.page === p} onClick={() => products.setPage(p)}>
            {p}
          </div>
        ))}
    </div>
  );
});

export default Pagination;
