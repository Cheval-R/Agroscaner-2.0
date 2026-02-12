import { useRef, useState } from "react";
import Capsule from "../UI/Capsule/Capsule";
import style from "./Menu.module.scss";

const Menu = ({
  programData,
  activeProgram,
  changeActiveProgram,
  changeActiveClient,
}) => {
  const isMenuHoveredRef = useRef(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const onHoverHandler = () => {
    isMenuHoveredRef.current = true;
    setIsDropdownOpened(true);
  };

  const onMouseLeaveHandler = () => {
    isMenuHoveredRef.current = false;
    setTimeout(() => {
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
        isActive={programData.key === activeProgram.programKey}
        onClickHandler={() => {
          changeActiveProgram(programData.key);
        }}
      >
        <MenuLabel>{programData.label}</MenuLabel>
      </Capsule.Button>
      <MenuDropdown
        dropdownList={programData.innerList}
        activeClient={activeProgram.clientKey}
        changeActiveClient={changeActiveClient}
      />
    </div>
  );
};

const MenuLabel = ({ children }) => {
  return <p className={style.menuLabel}>{children}</p>;
};

const MenuDropdown = ({ dropdownList, activeClient, changeActiveClient }) => {
  return (
    <ul className={style.menuDropdown}>
      {dropdownList.map((item) => {
        return (
          <li key={item.key}>
            <Capsule.Button
              className={style.menuItem}
              isActive={item.key === activeClient}
              onClickHandler={() => {
                changeActiveClient(item.key);
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

Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;

export default Menu;
