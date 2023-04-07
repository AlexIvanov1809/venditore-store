import { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./CardList.module.css";
import { Card } from "../..";
import { Context } from "../../../../main";

interface Props {
  className: string;
}

const CardList = observer(({ className }: Props) => {
  const { products } = useContext(Context);

  return (
    <div className={className}>
      <div className={styles.card_container}>
        {Array.isArray(products.products) &&
          products.products?.length > 0 &&
          products.products.map((item) => item.active && <Card key={item.id} product={item} />)}
      </div>
    </div>
  );
});

export default CardList;
