import Bubble, { BubbleButton } from "../Bubble/Bubble";
import ss from "./Dropdown.module.scss";

const Dropdown = ({ dropdownList, isOpen, onClick, activeItemKey }) => {
  return (
    <Bubble
      tag={"ul"}
      size="sm"
      className={`${ss.dropdown} ${isOpen ? ss.isOpen : ""}`}
    >
      {dropdownList.length > 0 ? (
        dropdownList.map((item) => {
          return (
            <li key={item.key}>
              <BubbleButton
                id={item.key}
                className={ss.item}
                onClick={() => onClick(item.key)}
                isActive={item.key === activeItemKey}
                size={"sm"}
              >
                {item.label}
              </BubbleButton>
            </li>
          );
        })
      ) : (
        <li>No Data</li>
      )}
    </Bubble>
  );
};

export default Dropdown;
