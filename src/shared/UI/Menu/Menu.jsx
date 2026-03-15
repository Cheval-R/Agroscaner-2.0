import { useProgramContext } from "../../../app/providers/AppContext.jsx";
import { BubbleButton } from "../Bubble/Bubble.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import usePopover from "../../hooks/usePopover.js";
import ss from "./Menu.module.scss";

const Menu = ({ data }) => {
  const { activeSelection, setActiveSelection } = useProgramContext();
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
      <BubbleButton
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
      >
        <p className={ss.menuLabel}>{data.label}</p>
      </BubbleButton>
      <Dropdown
        dropdownList={data.innerList}
        onClick={(client) => {
          setActiveSelection({ programKey: data.key, clientKey: client.key });
          toClose();
        }}
        isOpen={isOpen}
        activeItemKey={activeSelection.clientKey}
      />
    </div>
  );
};

export default Menu;
