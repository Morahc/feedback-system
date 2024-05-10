import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";

export const PrivateRoutes: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
