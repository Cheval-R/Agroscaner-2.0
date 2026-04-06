import type { Identifiers } from "../../../app/types/global.types";

import Bubble, { BubbleButton } from "../Bubble/Bubble";
import ss from "./Dropdown.module.scss";

interface Props {
  dropdownList: Identifiers[];
  isOpen: boolean;
  onClick: (item: Identifiers) => void;
  activeItemKey: string | null;
}

const Dropdown = ({ dropdownList, isOpen, onClick, activeItemKey }: Props) => {
  return (
    <Bubble
      tag={"ul"}
      bubbleSize="sm"
      className={`${ss.dropdown} ${isOpen ? ss.isOpen : ""}`}
    >
      {dropdownList.length > 0 ? (
        dropdownList.map((item) => {
          return (
            <li key={item.key}>
              <BubbleButton
                className={ss.item}
                onClick={() => onClick(item)}
                isActive={item.key === activeItemKey}
                bubbleSize={"sm"}
              >
                {item.label}
              </BubbleButton>
            </li>
          );
        })
      ) : (
        <li>Не найдено</li>
      )}
    </Bubble>
  );
};

export default Dropdown;
