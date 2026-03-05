import { useDeviceType } from "../../hooks/useDeviceType.js";
import { useProgramContext } from "../Context/AppContext";
import { BubbleButton } from "../UI/Bubble/Bubble";
import Dropdown from "../UI/Dropdown/Dropdown";
import useDropdown from "./../../hooks/useDropdown.js";
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
  } = useDropdown();
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
          } else {
            toOpen();
          }
          setActiveSelection({ programKey: data.key, clientKey: null });
        }}
      >
        <p className={ss.menuLabel}>{data.label}</p>
      </BubbleButton>
      <Dropdown
        dropdownList={data.innerList}
        onClick={(clientKey) => {
          setActiveSelection({ programKey: data.key, clientKey });
          toClose();
        }}
        isOpen={isOpen}
        activeItemKey={activeSelection.clientKey}
      />
    </div>
  );
};

export default Menu;
