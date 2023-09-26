import React, { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LayoutContext } from "../context/LayoutContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(LayoutContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Fragment>{children}</Fragment>;
};

export const NonProtectedRoute = ({ children }) => {
  const { user } = useContext(LayoutContext);
  if (user) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <Fragment>{children}</Fragment>;
};