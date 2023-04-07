import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { FilterTypes } from "@/types/productType";
import { FilterFn } from "@/types/uiTypes";
import styles from "./Aside.module.css";
import { Button } from "../../../ui";
import { ShopFilterList } from "../..";
import { Context } from "../../../../main";
import { ENTITY_TYPES } from "../../../../utils/consts";

interface Props {
  className: string;
}

const Aside = observer(({ className }: Props) => {
  const { products } = useContext(Context);
  const [data, setData] = useState<null | FilterTypes>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    ENTITY_TYPES.forEach((t) => {
      if (t.endpoint !== "Type") {
        setData((prev) => ({ ...prev, [t.filter]: [] }));
      }
    });
  }, [refresh]);

  const sendRequest = () => {
    if (data) {
      ENTITY_TYPES.forEach((t) => {
        if (t.setSelected !== "setSelectedType") {
          const select = data[t.filter]?.join("-");
          products[t.setSelected](select || "");
        }
      });
    }
  };

  const onChange: FilterFn = (filterType, item) => {
    setData((prev) => ({ ...prev, [filterType]: item }));
  };
  return (
    <aside className={cn(className, styles.item_container)}>
      {ENTITY_TYPES.map(
        (type) =>
          type.endpoint !== "Type" &&
          products[type.getter].length > 1 && (
            <ShopFilterList
              refresh={refresh}
              key={type.id}
              list={type.getter}
              label={type.label}
              filterType={type.filter}
              onChange={onChange}
            />
          )
      )}
      <Button appearance="danger" onClick={() => setRefresh(!refresh)}>
        Сбросить
      </Button>
      <Button appearance="primary" onClick={sendRequest}>
        Применить
      </Button>
    </aside>
  );
});

export default Aside;
