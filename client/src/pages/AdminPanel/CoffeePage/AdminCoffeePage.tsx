import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
} from "../../../store/coffeeItems/coffeeItems";
import { TableItem } from "../../../components/Table/TeaTable/TeaTable.props";
import CoffeeTable from "../../../components/Table/CoffeeTable/coffeeTable";
import sortedItems from "../../../helpers/sortForTable";
import { ICoffeeItem } from "../../../store/models/ICoffeeItem";

const AdminCoffeePage = () => {
  const coffeeItemsLoading = useAppSelector(getCoffeeItemsLoadingStatus());
  const coffeeItems = useAppSelector(getCoffeeItemsList());
  const [sorted, setSortedItems] = useState<ICoffeeItem[] | null>(coffeeItems);
  const [sortBy, setSortBy] = useState<TableItem>({
    path: "brand",
    order: "asc",
  });

  const handleSort = (item: TableItem) => {
    console.log(item);
    setSortBy(item);
  };
  useEffect(() => {
    if (coffeeItems) {
      const path = sortBy.path as keyof ICoffeeItem;

      const sortedCoffeeItems = sortedItems(coffeeItems, path, sortBy.order);
      setSortedItems(sortedCoffeeItems);
    }
  }, [coffeeItems, sortBy]);

  return (
    <main>
      {coffeeItemsLoading ? (
        "...Loading"
      ) : (
        <CoffeeTable
          coffeeItems={sorted}
          onSort={handleSort}
          selectedSort={sortBy}
        />
      )}
    </main>
  );
};

export default AdminCoffeePage;
