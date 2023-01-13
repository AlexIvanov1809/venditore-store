import React from "react";
import { PaginationProps } from "./Pagination.props";
import styles from "./Pagination.module.css";
import cn from "classnames";

const Pagination = ({
  itemsQty,
  pageSize,
  currentPage,
  onPageChange,
  className,
  ...props
}: PaginationProps): JSX.Element | null => {
  const pageCount = Math.ceil(itemsQty / pageSize);
  if (pageCount === 1) return null;

  const paginationStyle = cn(styles.paginationContainer, className);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={paginationStyle} {...props}>
      <nav className={styles.paginationNav}>
        <ul className={styles.pagination}>
          {pages.map((page) => (
            <li className={styles.pageItem} key={"page_" + page}>
              <button
                className={cn(styles.pageLink, {
                  [styles.active]: page === currentPage,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
