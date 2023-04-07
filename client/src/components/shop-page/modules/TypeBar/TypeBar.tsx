import { useContext } from "react";
import cn from "classnames";
import styles from "./TypeBar.module.css";
import { Context } from "../../../../main";

interface Props {
  className: string;
}

function TypeBar({ className }: Props) {
  const { products } = useContext(Context);
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => (
        <div
          className={styles.item}
          key={type?.id}
          onClick={() => products.setSelectedType(type?.id ? type.id : "")}
          data-active={type?.id === products.selectedType}
        >
          {type?.name}
        </div>
      ))}
    </div>
  );
}

export default TypeBar;
