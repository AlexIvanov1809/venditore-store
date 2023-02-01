import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckBoxField from "./form/checkBoxField";

const GroupList = ({ value, name, onFilter, items, reset }) => {
  const [choose, setChoose] = useState({});
  const [filtredItems, setFiltredItems] = useState(false);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const itemValues = [];
    items && items.forEach((i) => itemValues.push({ [i.value]: false }));
    itemValues.forEach((i) =>
      setChoose((prevState) => ({
        ...prevState,
        [Object.keys(i)[0]]: Object.values(i)[0]
      }))
    );
  }, [reset]);
  useEffect(() => {
    const selected = Object.keys(choose).filter((i) => choose[i]);
    onFilter({ [name]: selected });
    setLoad(true);
  }, [filtredItems]);

  const handleClick = () => {
    setActive(!active);
  };

  const handleChange = (target) => {
    setChoose((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setFiltredItems(!filtredItems);
  };

  return (
    <>
      <div className="dropdown">
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
            items.map((i) => (
              <li key={i._id} className="dropdown-item">
                <CheckBoxField
                  named={i.value}
                  value={choose[i.value]}
                  onChange={handleChange}
                >
                  {i.value}
                </CheckBoxField>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

GroupList.propTypes = {
  onFilter: PropTypes.func,
  items: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  reset: PropTypes.bool
};
export default GroupList;
