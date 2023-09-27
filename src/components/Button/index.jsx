import React from "react";

const Button = ({ children, onClick }) => {
  return <button className="font-semibold py-4 bg-white rounded-lg border-none outline-none w-full" onClick={onClick}>{children}</button>;
};

export default Button;
