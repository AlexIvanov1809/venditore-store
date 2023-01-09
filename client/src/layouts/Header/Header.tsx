import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as LogoIcon } from "./logo.svg";

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logo} role="button" to="/">
          <LogoIcon />
        </Link>
        <ul>
          <li role="button">
            <Link aria-current="page" to="/market/coffee">
              магазин
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
