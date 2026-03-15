import styles from "./Select.module.scss";
import { BubbleInput } from "../Bubble/Bubble";
import Dropdown from "../Dropdown/Dropdown";
import usePopover from "../../hooks/usePopover";

const Select = ({ optionsList, value, legend, onChange, onOptionSelect }) => {
  const { isOpen, toClose, toOpen, wrapperRef } = usePopover();

  const clearQuery =
    typeof value === "string" ? value.trim().toLowerCase() : "";

  const filteredOptions =
    clearQuery.length > 0
      ? optionsList.filter((option) =>
          option.label.toLowerCase().includes(clearQuery),
        )
      : null;

  return (
    <div
      className={styles.select}
      ref={wrapperRef}
    >
      <BubbleInput
        value={value}
        onFocus={toOpen}
        onChange={onChange}
        legend={legend}
      />
      <Dropdown
        dropdownList={filteredOptions ?? optionsList}
        isOpen={isOpen}
        onClick={(option) => {
          onOptionSelect(option);
          toClose();
        }}
      />
    </div>
  );
};

export default Select;
