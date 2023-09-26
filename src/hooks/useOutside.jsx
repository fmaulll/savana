import { useEffect } from "react";

export const useOutside = (ref, callback) => {
  useEffect(() => {
    // event when click outside of element
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    // bind the event listener
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};
