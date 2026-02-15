import Menu from "../Menu/Menu";
import logoTahs from "/logo-tahs.png";
import logoLab from "/logo-lab.png";
import Capsule from "../UI/Capsule/Capsule";
import burgerStyles from "../UI/Burger/Burger.module.scss";
import Burger from "../UI/Burger/Burger";
import styles from "./Header.module.scss";
import { useProgramContext } from "../Context/AppContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import PROGRAM_LIST from "../../data/programList";

const Header = () => {
  const { activeSelection } = useProgramContext();
  const isMobileDisplay = useMediaQuery(450);
  return (
    <header className={`${styles.header} container`}>
      <div className={styles.headerContent}>
        <HeaderTop calculatorLabel={activeSelection.program.label} />
        <HeaderContent isMobileDisplay={isMobileDisplay} />
      </div>
    </header>
  );
};

const HeaderTop = ({ calculatorLabel }) => {
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
      <Capsule
        tag="h1"
        className={`${styles.headerTitle}`}
      >
        {calculatorLabel}
        {/* Калькулятор расчёта доз удобрений */}
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

const HeaderContent = ({ isMobileDisplay }) => {
  return isMobileDisplay ? (
    <Burger isMobileDisplay={isMobileDisplay} />
  ) : (
    <HeaderNav isMobileDisplay={isMobileDisplay} />
  );
};

const HeaderNav = ({ isMobileDisplay, isBurgerOpen }) => {
  return (
    <nav
      className={`${isMobileDisplay ? burgerStyles.burgerNav : ""} ${isBurgerOpen ? burgerStyles.burgerNavOpen : ""}`}
    >
      <ul className={styles.navList}>
        {PROGRAM_LIST.map((program) => {
          return (
            <NavItem
              item={program}
              key={program.key}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const NavItem = ({ item }) => {
  const { changeActiveProgram, activeSelection } = useProgramContext();

  return (
    <li className={styles.navItem}>
      {item?.innerList ? (
        <Menu programData={item} />
      ) : (
        <Capsule.Button
          isActive={item.key === activeSelection.program.key}
          onClickHandler={() => {
            changeActiveProgram(item.key, item.label);
          }}
        >
          {item.label}
        </Capsule.Button>
      )}
    </li>
  );
};

Header.HeaderNav = HeaderNav;
Header.HeaderTop = HeaderTop;
Header.HeaderContent = HeaderContent;

export default Header;
