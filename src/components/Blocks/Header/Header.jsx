import Menu from "../../Menu/Menu";
import logoTahs from "/logo-tahs.png";
import logoLab from "/logo-lab.png";
import Capsule from "../../UI/Capsule/Capsule";
import burgerStyles from "../../UI/Burger/Burger.module.scss";
import Burger from "../../UI/Burger/Burger";
import { useState } from "react";
import styles from "./Header.module.scss";
import capsuleStyle from "./../../UI/Capsule/Capsule.module.scss";

const Header = ({
  programList,
  activeProgram,
  changeActiveProgram,
  changeActiveClient,
}) => {
  console.log("sadasd", activeProgram);

  const [isTightDisplay, setIsTightDisplay] = useState(
    window.matchMedia("(max-width: 450px)").matches,
  );
  window
    .matchMedia("(max-width: 450px)")
    .addEventListener("change", (event) => {
      setIsTightDisplay(event.matches);
    });
  return (
    <header className="header">
      <div className="container">
        <div className={styles.content}>
          <HeaderTop />
          <HeaderContent
            isTightDisplay={isTightDisplay}
            programList={programList}
            activeProgram={activeProgram}
            changeActiveProgram={changeActiveProgram}
            changeActiveClient={changeActiveClient}
          />
        </div>
      </div>
    </header>
  );
};

const HeaderTop = () => {
  return (
    <div className={styles.headerTop}>
      <Capsule.Link
        href="#!"
        className={styles.tahsLogo}
      >
        <img
          src={logoTahs}
          alt="Логотип компании"
        />
      </Capsule.Link>
      <Capsule>
        <h1 className={`${styles.headerTitle}`}>
          Калькулятор расчёта доз удобрений
        </h1>
      </Capsule>
      <Capsule.Link
        href="#!"
        className={styles.labLogo}
      >
        <img
          src={logoLab}
          alt="логотип лаборатории"
        />
      </Capsule.Link>
    </div>
  );
};

const HeaderContent = ({
  isTightDisplay,
  programList,
  activeProgram,
  changeActiveProgram,
  changeActiveClient,
}) => {
  return isTightDisplay ? (
    <Burger
      isTightDisplay={isTightDisplay}
      programList={programList}
      activeProgram={activeProgram}
      changeActiveProgram={changeActiveProgram}
      changeActiveClient={changeActiveClient}
    />
  ) : (
    <HeaderNav
      isTightDisplay={isTightDisplay}
      programList={programList}
      activeProgram={activeProgram}
      changeActiveProgram={changeActiveProgram}
      changeActiveClient={changeActiveClient}
    />
  );
};

const HeaderNav = ({
  isTightDisplay,
  isBurgerOpen,
  programList,
  activeProgram,
  changeActiveProgram,
  changeActiveClient,
}) => {
  return (
    <nav
      className={`${isTightDisplay ? `${burgerStyles.burgerNav} ${isBurgerOpen ? burgerStyles.burgerNavOpen : null}` : null}`}
    >
      <ul className={styles.navList}>
        {programList.map((program) => {
          return (
            <li
              className={styles.navItem}
              key={program.key}
            >
              {program?.innerList ? (
                <Menu
                  itemList={program.innerList}
                  programData={program}
                  label={program.label}
                  isActive={program.key === activeProgram.programKey}
                  activeProgram={activeProgram}
                  changeActiveProgram={changeActiveProgram}
                  changeActiveClient={changeActiveClient}
                />
              ) : (
                <Capsule.Button
                  isActive={program.key === activeProgram.programKey}
                  onClickHandler={() => {
                    changeActiveProgram(program.key);
                  }}
                >
                  {program.label}
                </Capsule.Button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Header.HeaderNav = HeaderNav;
Header.HeaderTop = HeaderTop;
Header.HeaderContent = HeaderContent;

export default Header;
