import Menu from "../../../shared/UI/Menu/Menu";
import logoTahs from "../../../shared/assets/logo-tahs.png";
import logoLab from "../../../shared/assets/logo-lab.png";
import Burger from "../../../shared/UI/Burger/Burger";
import ss from "./Header.module.scss";
import { useProgramContext } from "../../providers/AppContext";
import PROGRAM_LIST, { type IProgram } from "../../../data/programList";
import Bubble, { BubbleButton, BubbleLink, BubbleRouterLink } from "../../../shared/UI/Bubble/Bubble";
import type { ProgramKey } from "../../types/global.types";

import usePopover from "../../../shared/hooks/usePopover";
import { useLocation, useNavigate } from "react-router-dom";

const isProgramKey = (value: string): value is ProgramKey => {
  return PROGRAM_LIST.some((p) => p.key === value);
};

const Header = () => {
  return (
    <header className={`${ss.header} section`}>
      <section className="container">
        <div className={ss.headerContent}>
          <HeaderTop />
          <HeaderContent />
        </div>
      </section>
    </header>
  );
};

const HeaderTop = () => {
  const { screens } = useProgramContext();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const programKey = isProgramKey(path) ? path : undefined;

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
        {programKey ? screens[programKey].label : "Ошибка"}
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
        isMobileDisplay={isMobileDisplay}
      />
    </div>
  ) : (
    <HeaderNav />
  );
};

const HeaderNav = ({ isBurgerOpen, isMobileDisplay }: { isBurgerOpen?: boolean; isMobileDisplay?: boolean }) => {
  return (
    <nav className={`${isMobileDisplay ? ss.burgerNav : ""} ${isBurgerOpen ? ss.burgerNavOpen : ""}`}>
      <ul className={ss.navList}>
        {PROGRAM_LIST.map((program) => {
          return (
            <NavItem
              key={program.key}
              item={program}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const NavItem = ({ item }: { item: IProgram }) => {
  return (
    <li className={ss.navItem}>
      {item?.innerList ? <Menu data={item} /> : <BubbleRouterLink to={`${item.key}`}>{item.label}</BubbleRouterLink>}
    </li>
  );
};

Header.HeaderNav = HeaderNav;
Header.HeaderTop = HeaderTop;
Header.HeaderContent = HeaderContent;

export default Header;
