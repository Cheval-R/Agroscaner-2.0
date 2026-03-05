import { useEffect, useRef, useState } from "react";
import { useDeviceType } from "./useDeviceType";

const useDropdown = () => {
  const timerIdRef = useRef(null);
  const isMenuHoveredRef = useRef(false);
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const caps = useDeviceType();

  useEffect(() => {
    const clickOutOfSelect = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", clickOutOfSelect);
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      document.removeEventListener("pointerdown", clickOutOfSelect);
    };
  }, []);

  const onHoverHandler = () => {
    if (caps.canHover) {
      isMenuHoveredRef.current = true;
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const onMouseLeaveHandler = () => {
    if (caps.canHover) {
      isMenuHoveredRef.current = false;
      timerIdRef.current = setTimeout(() => {
        if (!isMenuHoveredRef.current) {
          setIsOpen(false);
        }
      }, 100);
    }
  };

  const toClose = () => {
    setIsOpen(false);
  };
  const toOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    toClose,
    toOpen,
    onMouseLeaveHandler,
    onHoverHandler,
    wrapperRef,
  };
};

export default useDropdown;
