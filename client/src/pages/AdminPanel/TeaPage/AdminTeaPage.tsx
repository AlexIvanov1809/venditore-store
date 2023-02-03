import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { TableItem } from "../../../modules/Table/TeaTable/TeaTable.props";
import sortedItems from "../../../helpers/sortForTable";
import {
  getTeaItemsList,
  getTeaItemsLoadingStatus,
} from "../../../store/teaItems/teaItems";
import { ITeaItem } from "../../../models/ITeaItem";
import TeaTable from "../../../modules/Table/TeaTable/TeaTable";

const AdminTeaPage = () => {
  const teaItemsLoading = useAppSelector(getTeaItemsLoadingStatus());
  const teaItems = useAppSelector(getTeaItemsList());
  const [sorted, setSortedItems] = useState<ITeaItem[] | null>(teaItems);
  const [sortBy, setSortBy] = useState<TableItem>({
    path: "brand",
    order: "asc",
  });

  const handleSort = (item: TableItem) => {
    console.log(item);
    setSortBy(item);
  };
  useEffect(() => {
    if (teaItems) {
      const path = sortBy.path as keyof ITeaItem;

      const sortedTeaItems = sortedItems(teaItems, path, sortBy.order);
      setSortedItems(sortedTeaItems);
    }
  }, [teaItems, sortBy]);

  return (
    <main>
      {teaItemsLoading ? (
        "...Loading"
      ) : (
        <TeaTable teaItems={sorted} onSort={handleSort} selectedSort={sortBy} />
      )}
    </main>
  );
};

export default AdminTeaPage;
