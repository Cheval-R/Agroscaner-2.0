import { useEffect, useState } from "react";

export function useMediaQuery(query: number) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${query}px)`);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);
  return matches;
}
