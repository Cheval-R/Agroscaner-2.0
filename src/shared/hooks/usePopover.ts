import { useEffect, useRef, useState } from 'react';

import { useDeviceType } from './useDeviceType';

const usePopover = (whenClose?: () => void) => {
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMenuHoveredRef = useRef<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const caps = useDeviceType();

  useEffect(() => {
    const clickOutOfSelect = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        event.target instanceof Node &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        whenClose?.();
      }
    };
    document.addEventListener('pointerdown', clickOutOfSelect);
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      document.removeEventListener('pointerdown', clickOutOfSelect);
    };
  }, [whenClose]);

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
    canHover: caps.canHover,
  };
};

export default usePopover;
