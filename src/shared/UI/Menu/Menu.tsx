import Dropdown from "../Dropdown/Dropdown";
import usePopover from "../../hooks/usePopover";
import ss from "./Menu.module.scss";
import type { IProgram } from "../../../data/programList";
import { Link, useNavigate } from "react-router-dom";
import Bubble, { BubbleButton } from "../Bubble/Bubble";
import type React from "react";

const Menu = ({ data }: { data: IProgram }) => {
  const navigate = useNavigate();
  const {
    isOpen,
    toClose,
    toOpen,
    onMouseLeaveHandler,
    onHoverHandler,
    wrapperRef,
    canHover,
  } = usePopover();
  return (
    <div
      className={ss.menu}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={wrapperRef}
    >
      {/* <BubbleButton
        className={`${ss.dropdownButton}`}
        isActive={data.key === activeSelection.programKey}
        onClick={() => {
          if (isOpen) {
            toClose();
          } else if (!canHover) {
            toOpen();
          }
          setActiveSelection({ programKey: data.key, clientKey: null });
        }}
      > */}

      <BubbleButton
        className={`${ss.dropdownButton}`}
        isActive={data.key === location.pathname.split("/")[1]}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (!(location.pathname === `/${data.key}`)) {
            navigate(`/${data.key}`);
          }
          if (isOpen) {
            toClose();
          } else if (!canHover) {
            toOpen();
          }
        }}
      >
        <p className={ss.menuLabel}>{data.label}</p>
      </BubbleButton>

      {/* </BubbleButton> */}
      {data.innerList ? (
        <Dropdown
          dropdownList={data.innerList}
          onClick={(client) => {
            navigate(`${data.key}/${client.key}`);
            // setActiveSelection({ programKey: data.key, clientKey: client.key });
            toClose();
          }}
          isOpen={isOpen}
          // activeItemKey={activeSelection.clientKey}
        />
      ) : null}
    </div>
  );
};

export default Menu;
