import React, { useState, useEffect } from "react";
import { paginate } from "../../../helpers/pagination";
import itemFilter from "../../../helpers/itemFilter";
import { Pagination, TeaCard, TeaSidebar } from "../../../components";
import styles from "./TeaMarket.module.css";
import { ITeaItem } from "../../../store/models/ITeaItem";
import { useAppSelector } from "../../../hooks/redux";
import {
  getTeaItemsList,
  getTeaItemsLoadingStatus,
} from "../../../store/teaItems/teaItems";
import { TeaMarketProps } from "./TeaMarket.props";

export interface SelectedItems {
  [key: string]: string[] | [];
}

const TeaMarket = ({ handleOrder, ...props }: TeaMarketProps): JSX.Element => {
  const page = "coffee";
  const [teaAssortment, setTeaAssortment] = useState<ITeaItem[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<ITeaItem[] | []>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    brand: [],
    type: [],
    package: [],
  });
  const pageSize = 9;
  const teaItems = useAppSelector(getTeaItemsList());
  const coffeeItemsLoading = useAppSelector(getTeaItemsLoadingStatus());

  useEffect(() => {
    if (teaItems) {
      const activeTeaItems = teaItems.filter((i) => i.active);
      setTeaAssortment(activeTeaItems);
    }
  }, [teaItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    setCurrentPage(1);
    const filtered = itemFilter(selectedItems, teaAssortment) as ITeaItem[];
    setFilter(filtered);
  }, [selectedItems, teaAssortment]);

  const handleCurrentPageSet = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearchQuery = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
  };

  const handleSelectedItems = (items: SelectedItems) => {
    setSelectedItems(items);
  };

  function searchItems(data: ITeaItem[]) {
    const filteredData = searchQuery
      ? data.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
        )
      : data;

    return filteredData;
  }

  const filteredItems = searchItems(filter);

  const itemsQty = filteredItems.length;
  const itemsOnPage = paginate(
    filteredItems,
    currentPage,
    pageSize,
  ) as ITeaItem[];

  return (
    <div className={styles.market} {...props}>
      <div className={styles.search}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Поиск товаров"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
      </div>
      {coffeeItemsLoading ? (
        "loading..."
      ) : (
        <>
          <TeaSidebar
            className={styles.sidebar}
            getSelect={handleSelectedItems}
          />

          <div className={styles.cardContainer}>
            {itemsOnPage.map((item) => (
              <TeaCard key={item._id} teaItem={item} />
            ))}
          </div>
          <Pagination
            className={styles.pagination}
            itemsQty={itemsQty}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handleCurrentPageSet}
          />
        </>
      )}
    </div>
  );
};

export default TeaMarket;
