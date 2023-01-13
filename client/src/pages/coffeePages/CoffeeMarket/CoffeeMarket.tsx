import React, { useState, useEffect } from "react";
import { paginate } from "../../../helpers/pagination";
import { useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
} from "../../../store/coffeeItems/coffeeItems";
import itemFilter from "../../../helpers/itemFilter";
import { ICoffeeItem } from "../../../store/models/ICoffeeItem";
import { CoffeeCard, Pagination } from "../../../components/";
import styles from "./CoffeeMarket.module.css";

interface SelectedItems {
  brand: string[] | [];
  country: string[] | [];
  method: string[] | [];
  kind: string[] | [];
}

const CoffeeMarket = (): JSX.Element => {
  const [coffeeAssortment, setCoffeeAssortment] = useState<ICoffeeItem[] | []>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<ICoffeeItem[] | []>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    brand: [],
    country: [],
    method: [],
    kind: [],
  });
  const pageSize = 9;
  const coffeeItems = useSelector(getCoffeeItemsList());
  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());

  useEffect(() => {
    if (coffeeItems) {
      const activeCoffeeItems = coffeeItems.filter((i) => i.active);
      setCoffeeAssortment(activeCoffeeItems);
    }
  }, [coffeeItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    setCurrentPage(1);
    const filtered = itemFilter(selectedItems, coffeeAssortment);
    setFilter(filtered);
  }, [selectedItems, coffeeAssortment]);

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

  function searchItems(data: ICoffeeItem[]) {
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
  const itemsOnPage = paginate(filteredItems, currentPage, pageSize);

  return (
    <>
      <div>
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
        <div>
          <div className={styles.cardContainer}>
            {itemsOnPage.map((item) => (
              <CoffeeCard key={item._id} coffeeItem={item} />
            ))}
          </div>
          <Pagination
            itemsQty={itemsQty}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handleCurrentPageSet}
          />
        </div>
      )}
    </>
  );
};

export default CoffeeMarket;
