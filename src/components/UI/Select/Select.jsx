import { useEffect, useRef, useState } from "react";
import { useProgramContext } from "../../Context/AppContext";
import Capsule from "../Capsule/Capsule";
import styles from "./Select.module.scss";

const Select = ({ mainLabel, mainId, optionsList }) => {
  const [selectValue, setSelectValue] = useState(mainId && "none");
  const [selectLabel, setSelectLabel] = useState(mainLabel && "Нет");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { isMobileDisplay } = useProgramContext();

  const isSelectHoveredRef = useRef(false);
  const timerIdRef = useRef(null);
  const selectWrapperRef = useRef(null);

  useEffect(() => {
    const clickOutOfSelect = (event) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("pointerdown", clickOutOfSelect);
    return () => {
      document.removeEventListener("pointerdown", clickOutOfSelect);
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const onDropdownToggleHandler = () => {
    console.log("onDropdownToggleHandler");
    setIsSelectOpen((prev) => !prev);
  };

  const onHoverHandler = () => {
    isSelectHoveredRef.current = true;
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsSelectOpen(true);
  };

  const onMouseLeaveHandler = () => {
    isSelectHoveredRef.current = false;
    timerIdRef.current = setTimeout(() => {
      if (!isSelectHoveredRef.current) {
        setIsSelectOpen(false);
      }
    }, 100);
  };

  const changeOption = (option) => {
    setSelectValue(option.value);
    setSelectLabel(option.label);
    setIsSelectOpen(false);
  };

  return (
    <div
      className={styles.select}
      onMouseEnter={isMobileDisplay ? undefined : onHoverHandler}
      onMouseLeave={isMobileDisplay ? undefined : onMouseLeaveHandler}
      ref={selectWrapperRef}
    >
      <Capsule.Button
        className={styles.selectLabelButton}
        id={selectValue}
        onClickHandler={isMobileDisplay ? onDropdownToggleHandler : undefined}
      >
        {selectLabel}
      </Capsule.Button>
      <ul
        className={`${styles.selectOptionsList} ${isSelectOpen ? styles.IsOpen : ""}`}
      >
        {optionsList.map((option) => {
          return (
            <li
              className={styles.option}
              key={option.value}
              id={option.value}
            >
              <Capsule.Button onClickHandler={() => changeOption(option)}>
                {option.label}
              </Capsule.Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
