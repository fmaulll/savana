import React, { useRef } from "react";
import { useOutside } from "../../hooks/useOutside";

const OutsideWrapper = ({ children, callback }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, callback);

  return <div ref={wrapperRef}>{children}</div>;
};
export default OutsideWrapper;