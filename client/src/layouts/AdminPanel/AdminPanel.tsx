import React, { useState } from "react";
import AdminCoffeePage from "../../pages/AdminPanel/CoffeePage/AdminCoffeePage";
import AdminTeaPage from "../../pages/AdminPanel/TeaPage/AdminTeaPage";
import styles from "./AdminPanel.module.css";

const AdminPanel = (): JSX.Element => {
  const [page, setPage] = useState("coffee");
  return (
    <main className={styles.main}>
      <button onClick={() => setPage("coffee")}>coffee</button>
      <button onClick={() => setPage("tea")}>tea</button>
      {page === "coffee" ? <AdminCoffeePage /> : <AdminTeaPage />}
    </main>
  );
};

export default AdminPanel;
