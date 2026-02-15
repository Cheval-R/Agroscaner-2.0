import { useEffect, useRef, useState } from "react";
import Capsule from "../UI/Capsule/Capsule";
import style from "./Menu.module.scss";
import { useProgramContext } from "../Context/AppContext";

const Menu = ({ programData }) => {
  const { activeSelection, changeActiveProgram } = useProgramContext();
  const isMenuHoveredRef = useRef(false);
  const timerIdRef = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
    };
  }, []);

  const onHoverHandler = () => {
    isMenuHoveredRef.current = true;
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsDropdownOpened(true);
  };

  const onMouseLeaveHandler = () => {
    isMenuHoveredRef.current = false;
    timerIdRef.current = setTimeout(() => {
      if (!isMenuHoveredRef.current) {
        setIsDropdownOpened(false);
      }
    }, 100);
  };

  return (
    <div
      className="menu"
      onMouseEnter={onHoverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Capsule.Button
        className={`${style.dropdownButton} ${isDropdownOpened ? style.dropdownOpen : ""}`}
        isActive={programData.key === activeSelection.program.key}
        onClickHandler={() => {
          changeActiveProgram(programData.key, programData.label);
        }}
      >
        <p className={style.menuLabel}>{programData.label}</p>
      </Capsule.Button>
      <MenuDropdown dropdown={programData} />
    </div>
  );
};

const MenuDropdown = ({ dropdown }) => {
  console.log(dropdown);

  const { activeSelection, changeActiveClient } = useProgramContext();
  return (
    <ul className={style.menuDropdown}>
      {dropdown.innerList.map((item) => {
        return (
          <li key={item.key}>
            <Capsule.Button
              className={style.menuItem}
              isActive={item.key === activeSelection.client.key}
              onClickHandler={() => {
                changeActiveClient(
                  dropdown.key,
                  dropdown.label,
                  item.key,
                  item.label,
                );
              }}
            >
              {item.label}
            </Capsule.Button>
          </li>
        );
      })}
    </ul>
  );
};

Menu.Dropdown = MenuDropdown;

export default Menu;
