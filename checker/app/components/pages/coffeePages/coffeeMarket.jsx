import React, { useState, useEffect } from "react";
import CoffeeCardItem from "../../ui/coffeeCardItem";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import { useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
} from "../../../store/coffeeItems/coffeeItems";
import CoffeeSideBar from "../../common/coffeeSidebar";
import itemFilter from "../../../utils/itemFilter";

const CoffeeMarket = ({ handleOrder }) => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
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
  }, [selectedItems]);

  const handleCurrentPageSet = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSelectedItems = (items) => {
    setSelectedItems(items);
  };

  function searchItems(data) {
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
      <div className="w-100">
        <input
          className="form-control m-auto mb-2"
          style={{ width: "300px" }}
          type="text"
          name="searchQuery"
          placeholder="Поиск товаров"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
      </div>
      <div className="row">
        <div className="col-md-auto">
          <CoffeeSideBar onSelect={handleSelectedItems} />
        </div>
        <div className="col">
          {!coffeeItemsLoading ? (
            <div className="m-auto text-center">
              <div className="w-100 d-flex flex-wrap justify-content-center">
                {itemsOnPage.map((item) => (
                  <CoffeeCardItem
                    key={item._id}
                    coffeeItem={item}
                    onOrder={handleOrder}
                  />
                ))}
                <div className="w-100">
                  <Pagination
                    itemsQty={itemsQty}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handleCurrentPageSet}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center w-100 mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

CoffeeMarket.propTypes = {
  handleOrder: PropTypes.func,
};

export default CoffeeMarket;
