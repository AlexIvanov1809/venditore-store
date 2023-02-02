import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminCoffeePage from "../../pages/AdminPanel/CoffeePage/AdminCoffeePage";
import AdminTeaPage from "../../pages/AdminPanel/TeaPage/AdminTeaPage";
import styles from "./AdminPanel.module.css";

const AdminPanel = (): JSX.Element => {
  const { store } = useParams();
  const [page, setPage] = useState("coffee");
  console.log(store);
  return (
    <main className={styles.main}>
      <Link
        style={{ marginRight: "10px" }}
        role="button"
        to="/adminPanel/coffee"
      >
        coffee
      </Link>
      <Link role="button" to="/adminPanel/tea">
        tea
      </Link>
      {store === "coffee" ? <AdminCoffeePage /> : <AdminTeaPage />}
    </main>
  );
};

export default AdminPanel;
