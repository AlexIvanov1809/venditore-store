import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/pagination";
import { useSelector } from "react-redux";
import {
  getTeaItemsList,
  getTeaItemsLoadingStatus
} from "../../../store/teaItems/teaItems";
import TeaCardItem from "../../ui/teaCardItem";
import TeaSideBar from "../../common/teaSidebar";
import itemFilter from "../../../utils/itemFilter";

const TeaMarket = ({ handleOrder }) => {
  const [teaAssortment, setTeaAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    type: [],
    package: []
  });
  const pageSize = 9;
  const teaItems = useSelector(getTeaItemsList());
  const teaItemsLoading = useSelector(getTeaItemsLoadingStatus());

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
    const filtered = itemFilter(selectedItems, teaAssortment);
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
            item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
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
          placeholder="Search..."
          onChange={handleSearchQuery}
          value={searchQuery}
        />
      </div>
      <div className="row">
        <div className="col-md-auto m-2">
          <TeaSideBar onSelect={handleSelectedItems} />
        </div>
        <div className="col">
          {!teaItemsLoading ? (
            <div className="m-auto text-center" style={{ maxWidth: "1200px" }}>
              <div className="w-100 d-flex flex-wrap justify-content-center">
                {itemsOnPage.map((item) => (
                  <TeaCardItem
                    key={item._id}
                    teaItem={item}
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

TeaMarket.propTypes = {
  handleOrder: PropTypes.func
};

export default TeaMarket;
