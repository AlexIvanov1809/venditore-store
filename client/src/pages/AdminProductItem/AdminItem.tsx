import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IProduct } from "@/types/productType";
import styles from "./AdminItem.module.css";
import httpService from "../../http/productAPI";
import { EditItemModule, DeleteBtn } from "../../components/admin-page";
import { Loader, Button, Scale } from "../../components/ui";

import { ADMIN_ROUTE, ENTITY_TYPES } from "../../utils/consts";
import { Context } from "../../main";
import config from "../../config/config.json";

const AdminItem = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<null | IProduct>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if ((products && products.products) || !Array.isArray(products.products) || updated) {
      ENTITY_TYPES.forEach((prop) => {
        httpService.fetchEntityItems(prop.endpoint).then((data) => {
          products[prop.setter](data);
        });
      });
      if (id) {
        httpService
          .fetchOneProduct(id)
          .then((data) => products.setProducts(data))
          .finally(() => {
            if (products.products && !Array.isArray(products.products)) {
              setItem(products.products);
              setIsLoading(false);
              setUpdated(false);
            }
          });
      }
    } else {
      const data = products.products.filter((item) => item.id === parseInt(id || ""));
      setItem(data[0]);
      setIsLoading(false);
    }
  }, [products, updated, id]);

  const removeHandle = (id: string | number) => {
    setIsLoading(true);
    httpService
      .removeProduct(id)
      .then((d) => {
        console.log(d);
        navigate(ADMIN_ROUTE);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const editHandle = () => {
    setEditing(!editing);
  };

  if (isLoading || !item) {
    return <Loader />;
  }

  return (
    <div className={styles.main_item}>
      <Button appearance="primary" onClick={() => navigate(ADMIN_ROUTE)}>
        Back
      </Button>
      <div className={styles.item_container}>
        <div>
          <h3>{item.type?.name}</h3>
          <h4>{item.brand?.name}</h4>
          <h4>{item.tea_type?.name}</h4>
          <h4>
            {item.country?.name} {item.sortName}
          </h4>
        </div>
        <div>
          {item.image.map((i) => (
            <img key={i.id} width={120} src={config.apiURL + i.name} alt="item" />
          ))}
        </div>
        <span>{item.making_method?.name}</span>
        <span>{item.manufacturing_method?.name}</span>
        {item.acidity && item.density && (
          <div className={styles.item_scale}>
            <Scale value={item.acidity} name="Кислотность" />
            <Scale value={item.density} name="Плотность" />
          </div>
        )}
        <span>{item.package_type?.name}</span>
        <p>{item.shortDescription}</p>
        <p>{item.description}</p>
        {item.price.map((p) => (
          <div key={p.id}>
            <div>{p.weight}</div>
            <div>{p.value} &#8381;</div>
          </div>
        ))}
        <div>{item.active ? "true" : "false"}</div>
        <div className={styles.item_buttons}>
          <DeleteBtn onDelete={removeHandle} id={id || ""} />
          <Button appearance="primary" onClick={editHandle} icon="Edit" />
        </div>
      </div>
      {editing && <EditItemModule product={item} updated={setUpdated} onHide={editHandle} />}
    </div>
  );
});

export default AdminItem;
