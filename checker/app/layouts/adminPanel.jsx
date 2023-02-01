import React, { useState } from "react";
import AdminCoffeePage from "../components/pages/coffeePages/adminCoffeePage";
import AdminTeaPage from "../components/pages/teaPages/adminTeaPage";
import { Link, Navigate, useParams } from "react-router-dom";
import localStorageSevice from "../service/localStorage.service";

const AdminPanel = () => {
  const { store } = useParams();
  const userId = localStorageSevice.getUserID();
  const [currentPage, setCurrentPage] = useState(!store ? "coffee" : store);

  const hendleClick = (page) => {
    setCurrentPage(page);
  };
  if (userId) {
    return (
      <div className="container">
        <div className="d-flex text-start">
          <Link
            className={
              "m-2 btn btn-" +
              (currentPage === "coffee" ? "primary" : "secondary")
            }
            role="button"
            onClick={() => hendleClick("coffee")}
            to={"/adminPanel/coffee"}
          >
            Coffee
          </Link>
          <Link
            className={
              "m-2 btn btn-" + (currentPage === "tea" ? "primary" : "secondary")
            }
            role="button"
            onClick={() => hendleClick("tea")}
            to={"/adminPanel/tea"}
          >
            Tea
          </Link>
        </div>
        {currentPage === "coffee" ? <AdminCoffeePage /> : <AdminTeaPage />}
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default AdminPanel;
