import { useEffect, type MutableRefObject } from "react";

export const useAutoScroll = function <T extends HTMLElement = HTMLElement>(
  element: MutableRefObject<T>,
  offset = 20,
) {
  useEffect(() => {
    const autoScroll = () => {
      element.current.scrollLeft -= offset;
      console.log(element.current.scrollLeft);
    };
    const timer = window.setInterval(autoScroll, 200);

    return () => window.clearInterval(timer);
  }, []);
};
