import { Navigate, useLocation } from "react-router-dom";
import { IS_AUTH } from "../services/actions/user";
import { FC } from "react";

export type TProtectedRoute = {
  element: any;
  auth: boolean;
};

export const ProtectedRouteElement: FC<TProtectedRoute> = ({ element, auth }) => {
  const location = useLocation();
  const isUserAuthed = localStorage.getItem(IS_AUTH);

  if (!isUserAuthed && !auth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isUserAuthed && auth) {
    return <Navigate to="/" replace />;
  }

  return element;
};