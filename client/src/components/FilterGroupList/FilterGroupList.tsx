import React, { useEffect, useState } from "react";
import { FilterGroupListProps } from "./FilterGroupList.props";
import styles from "./FilterGroupList.module.css";
import { CheckBoxField } from "../../ui";

export interface IHandleChange {
  name: string;
  value: boolean;
}

interface IVal {
  [key: IHandleChange["name"]]: boolean;
}

const FilterGroupList = ({
  value,
  name,
  onFilter,
  items,
  reset,
  className,
  ...props
}: FilterGroupListProps): JSX.Element => {
  const [choose, setChoose] = useState<IVal>({});
  const [filteredItems, setFilteredItems] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    const itemValues: IVal[] = [];
    items && items.forEach((i) => itemValues.push({ [i.value]: false }));
    itemValues.forEach((i) =>
      setChoose((prevState) => ({
        ...prevState,
        [Object.keys(i)[0]]: Object.values(i)[0],
      })),
    );
  }, [reset]);
  useEffect(() => {
    const selected = Object.keys(choose).filter((i) => choose[i]);
    onFilter({ [name]: selected });
    setLoad(true);
  }, [filteredItems]);

  const handleClick = () => {
    setActive(!active);
  };

  const handleChange = (target: IHandleChange) => {
    setChoose((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setFilteredItems(!filteredItems);
  };
  return (
    <div {...props}>
      <button
        className="btn btn-primary dropdown-toggle mb-2 w-100"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={handleClick}
      >
        {value}
      </button>
      <ul className={active ? "dropdown-menu-active" : "dropdown-menu"}>
        {load &&
          items &&
          items.map((i) => (
            <li key={i._id} className="dropdown-item">
              <CheckBoxField
                name={i.value}
                value={choose[i.value]}
                getChange={handleChange}
              >
                {i.value}
              </CheckBoxField>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterGroupList;
