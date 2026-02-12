import { act, useState } from "react";
import styles from "./Burger.module.scss";
import Header from "../../Blocks/Header/Header";
import Capsule from "../Capsule/Capsule";

const Burger = ({
  isTightDisplay,
  programList,
  activeProgram,
  changeActiveProgram,
  changeActiveClient,
}) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const burgerToggleHandler = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  return (
    <div className={styles.burgerWrapper}>
      <Capsule.Button
        isBox={true}
        onClickHandler={burgerToggleHandler}
      >
        <span
          className={`${styles.burger} ${isBurgerOpen ? styles.burgerActive : ""}`}
        ></span>
      </Capsule.Button>
      <Header.HeaderNav
        isTightDisplay={isTightDisplay}
        isBurgerOpen={isBurgerOpen}
        activeProgram={activeProgram}
        programList={programList}
        changeActiveProgram={changeActiveProgram}
        changeActiveClient={changeActiveClient}
      />
    </div>
  );
};

export default Burger;
