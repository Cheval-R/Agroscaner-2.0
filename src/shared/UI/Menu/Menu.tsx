import { useProgramContext } from "../../../app/providers/AppContext";
import { BubbleButton } from "../Bubble/Bubble";
import Dropdown from "../Dropdown/Dropdown";
import usePopover from "../../hooks/usePopover";
import ss from "./Menu.module.scss";
import type { IProgram } from "../../../data/programList";

const Menu = ({ data }: { data: IProgram }) => {
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
      {data.innerList ? (
        <Dropdown
          dropdownList={data.innerList}
          onClick={(client) => {
            setActiveSelection({ programKey: data.key, clientKey: client.key });
            toClose();
          }}
          isOpen={isOpen}
          activeItemKey={activeSelection.clientKey}
        />
      ) : null}
    </div>
  );
};

export default Menu;
