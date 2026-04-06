import styles from "./Select.module.scss";
import { BubbleInput } from "../Bubble/Bubble";
import Dropdown from "../Dropdown/Dropdown";
import usePopover from "../../hooks/usePopover";
import React, { useEffect, useRef, useState } from "react";
import type { Identifiers } from "../../../app/types/global.types";

interface Props {
  optionsList: Identifiers[];
  activeKey: string;
  legend: string;
  selectOption: (optionKey: string) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  errorMessage: string | undefined;
}
const FindActiveOptionLabel = (
  optionsList: Identifiers[],
  activeKey: string,
): string => {
  const activeOption = optionsList.find((option) => option.key === activeKey);
  if (activeOption) {
    return activeOption.label;
  }
  return "";
};
const Select = ({
  optionsList,
  activeKey,
  legend,
  selectOption,
  onBlur,
  errorMessage,
}: Props) => {
  const activeKeyRef = useRef(activeKey);
  let activeOptionLabel: string = FindActiveOptionLabel(optionsList, activeKey);

  const [query, setQuery] = useState(activeOptionLabel);

  const { isOpen, toClose, toOpen, wrapperRef } = usePopover(() => {
    setQuery(
      activeKeyRef.current
        ? FindActiveOptionLabel(optionsList, activeKeyRef.current)
        : "",
    );
  });
  useEffect(() => {
    activeKeyRef.current = activeKey;
    setQuery(activeKey ? FindActiveOptionLabel(optionsList, activeKey) : "");
  }, [activeKey]);
  const clearQuery =
    typeof query === "string" ? query.trim().toLowerCase() : "";

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
        value={query}
        onFocus={toOpen}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onBlur={onBlur}
        legend={legend}
        errorMessage={errorMessage}
      />
      <Dropdown
        activeItemKey={activeKey}
        dropdownList={filteredOptions ?? optionsList}
        isOpen={isOpen}
        onClick={(option: Identifiers) => {
          // setQuery(option.label);
          selectOption(option.key);
          toClose();
        }}
      />
    </div>
  );
};

export default Select;
