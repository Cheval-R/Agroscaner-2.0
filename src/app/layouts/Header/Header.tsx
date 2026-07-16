import { useLocation } from 'react-router-dom';

import { PROGRAM_LIST } from '../../../data/programList';
import { Clients } from '../../../modules/Minerals/data/clientsData';
import logoLab from '../../../shared/assets/logo-lab.png';
import logoTahs from '../../../shared/assets/logo-tahs.png';
import usePopover from '../../../shared/hooks/usePopover';
import Bubble, { BubbleLink, BubbleRouterLink } from '../../../shared/UI/Bubble/Bubble';
import Burger from '../../../shared/UI/Burger/Burger';
import Menu from '../../../shared/UI/Menu/Menu';
import { useProgramContext } from '../../providers/AppContext';
import type { Identifiers } from '../../types/global.types';
import ss from './Header.module.scss';

const getProgramLabel = (value: string): string => {
  const program = PROGRAM_LIST.find((p) => p.key === value);
  if (!program) return 'Расчёт минеральных удобрений';
  return program.label;
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
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const programLabel = getProgramLabel(path);

  return (
    <div className={ss.headerTop}>
      <BubbleLink
        href="https://tatagrohimservis.ru/"
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
        {programLabel}
        {/* Калькулятор расчёта доз удобрений */}
      </Bubble>
      <BubbleLink
        href="https://tatagrohimservis.ru/uslugi/laboratorija/"
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
    if (isOpen) toClose();
    else toOpen();
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
const HeaderNav = ({
  isBurgerOpen,
  isMobileDisplay,
}: {
  isBurgerOpen?: boolean;
  isMobileDisplay?: boolean;
}) => {
  const clientList: Identifiers[] = Clients.map((client) => {
    return { key: client.key, label: client.label };
  });
  return (
    <nav
      className={`${isMobileDisplay ? ss.burgerNav : ''} ${isBurgerOpen ? ss.burgerNavOpen : ''}`}
    >
      <ul className={ss.navList}>
        <li className={ss.navItem}>
          <Menu
            programKey="mineral-fertilizer-calculator"
            label="Расчёт минеральных удобрений"
            optionsList={clientList}
          />
        </li>
        <li className={ss.navItem}>
          <BubbleRouterLink to={'corn-silage-harvest-calculator'}>
            Расчёт сроков уборки кукурузы
          </BubbleRouterLink>
        </li>
        {/*<li className={ss.navItem}>*/}
        {/*  <BubbleRouterLink to={'nitrogen-feeding-calculator'}>*/}
        {/*    Расчёт азотной подкормки*/}
        {/*  </BubbleRouterLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
};

Header.HeaderNav = HeaderNav;
Header.HeaderTop = HeaderTop;
Header.HeaderContent = HeaderContent;

export default Header;
