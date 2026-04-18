import type React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import usePopover from '../../hooks/usePopover';
import { BubbleButton } from '../Bubble/Bubble';
import Dropdown from '../Dropdown/Dropdown';
import ss from './Menu.module.scss';
import type { Identifiers, ProgramKey } from '../../../app/types/global.types';

const Menu = ({
  programKey,
  label,
  optionsList,
}: {
  label: string;
  programKey: ProgramKey;
  optionsList: Identifiers[];
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, toClose, toOpen, onMouseLeaveHandler, onHoverHandler, wrapperRef, canHover } =
    usePopover();
  return (
    <div
      className={ss.menu}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={wrapperRef}
    >
      <BubbleButton
        className={`${ss.dropdownButton}`}
        isActive={programKey === location.pathname.split('/')[1]}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (!(location.pathname === `/${programKey}`)) {
            navigate(`/${programKey}`);
          }
          if (isOpen) {
            toClose();
          } else if (!canHover) {
            toOpen();
          }
        }}
      >
        <p className={ss.menuLabel}>{label}</p>
      </BubbleButton>

      <Dropdown
        dropdownList={optionsList}
        onClick={(client) => {
          navigate(`${programKey}/${client.key}`);
          toClose();
        }}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Menu;
