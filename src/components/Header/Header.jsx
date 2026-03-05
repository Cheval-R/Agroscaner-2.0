import Menu from "../Menu/Menu";
import logoTahs from "/logo-tahs.png";
import logoLab from "/logo-lab.png";
import Burger from "../UI/Burger/Burger";
import ss from "./Header.module.scss";
import { useProgramContext } from "../Context/AppContext";
import PROGRAM_LIST from "../../data/programList";
import Bubble, { BubbleButton, BubbleLink } from "../UI/Bubble/Bubble";
import useDropdown from "../../hooks/useDropdown";

const Header = () => {
  return (
    <header className={`${ss.header} container`}>
      <div className={ss.headerContent}>
        <HeaderTop />
        <HeaderContent />
      </div>
    </header>
  );
};

const HeaderTop = () => {
  const { activeSelection } = useProgramContext();

  return (
    <div className={ss.headerTop}>
      <BubbleLink
        href="#!"
        className={ss.tahsLogo}
      >
        <img
          src={logoTahs}
          alt="Логотип компании"
        />
      </BubbleLink>
      <Bubble
        tag="h1"
        className={`${ss.headerTitle}`}
      >
        {activeSelection.programKey}
        {/* Калькулятор расчёта доз удобрений */}
      </Bubble>
      <BubbleLink
        href="#!"
        className={ss.labLogo}
      >
        <img
          src={logoLab}
          alt="логотип лаборатории"
        />
      </BubbleLink>
    </div>
  );
};

const HeaderContent = () => {
  const { isOpen, toClose, toOpen, wrapperRef } = useDropdown();
  const { isMobileDisplay } = useProgramContext();
  const burgerToggleHandler = () => {
    isOpen ? toClose() : toOpen();
  };
  return isMobileDisplay ? (
    <div
      className={ss.burgerWrapper}
      ref={wrapperRef}
    >
      <Burger
        isOpen={isOpen}
        onClick={burgerToggleHandler}
      />
      <HeaderNav
        isBurgerOpen={isOpen}
        isBurgerOn={isMobileDisplay}
      />
    </div>
  ) : (
    <HeaderNav />
  );
};

const HeaderNav = ({ isBurgerOpen, isBurgerOn }) => {
  return (
    <nav
      className={`${isBurgerOn ? ss.burgerNav : ""} ${isBurgerOpen ? ss.burgerNavOpen : ""}`}
    >
      <ul className={ss.navList}>
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
  const { setActiveSelection, activeSelection } = useProgramContext();

  return (
    <li className={ss.navItem}>
      {item?.innerList ? (
        <Menu data={item} />
      ) : (
        <BubbleButton
          isActive={item.key === activeSelection.programKey}
          onClick={() => {
            setActiveSelection({ programKey: item.key, clientKey: null });
          }}
        >
          {item.label}
        </BubbleButton>
      )}
    </li>
  );
};

Header.HeaderNav = HeaderNav;
Header.HeaderTop = HeaderTop;
Header.HeaderContent = HeaderContent;

export default Header;
