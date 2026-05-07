import { useEffect, useState } from "react";

export function useDeviceType() {
  const [caps, setCaps] = useState({
    canHover: false,
    isCoarsePointer: false,
    hasTouch: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarseMq = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setCaps({
        canHover: hoverMq.matches,
        isCoarsePointer: coarseMq.matches,
        hasTouch: navigator.maxTouchPoints > 0,
      });
    };

    update();
    hoverMq.addEventListener("change", update);
    coarseMq.addEventListener("change", update);

    return () => {
      hoverMq.removeEventListener("change", update);
      coarseMq.removeEventListener("change", update);
    };
  }, []);

  return caps;
}
