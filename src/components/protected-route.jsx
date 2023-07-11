import { Navigate, useLocation } from "react-router-dom";
import { IS_AUTH } from "../services/actions/user";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, auth }) => {
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

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  authHandler: PropTypes.bool,
};