import Menu from "../../../shared/UI/Menu/Menu";
import logoTahs from "../../../shared/assets/logo-tahs.png";
import logoLab from "../../../shared/assets/logo-lab.png";
import Burger from "../../../shared/UI/Burger/Burger";
import ss from "./Header.module.scss";
import { useProgramContext } from "../../providers/AppContext";
import PROGRAM_LIST from "../../../data/programList";
import Bubble, {
  BubbleButton,
  BubbleLink,
} from "../../../shared/UI/Bubble/Bubble";

import usePopover from "../../../shared/hooks/usePopover";

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
  const { activeSelection, screens } = useProgramContext();

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
        {screens[activeSelection.programKey].label ?? "Ошибка"}
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
  const { isOpen, toClose, toOpen, wrapperRef } = usePopover();
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
