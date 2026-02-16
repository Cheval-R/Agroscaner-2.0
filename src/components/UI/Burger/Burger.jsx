import { useState } from "react";
import styles from "./Burger.module.scss";
import Header from "../../Header/Header";
import Capsule from "../Capsule/Capsule";
import { useProgramContext } from "../../Context/AppContext";

const Burger = () => {
  const { isMobileDisplay } = useProgramContext();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const burgerToggleHandler = () => {
    setIsBurgerOpen((prev) => !prev);
  };
  return (
    <div className={styles.burgerWrapper}>
      <Capsule.Button
        isBox={true}
        className={styles.burgerButton}
        onClickHandler={burgerToggleHandler}
      >
        <span
          className={`${styles.burger} ${isBurgerOpen ? styles.burgerActive : ""}`}
        ></span>
      </Capsule.Button>
      <Header.HeaderNav isBurgerOpen={isBurgerOpen} />
    </div>
  );
};

export default Burger;
