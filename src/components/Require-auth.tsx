
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children:JSX.Element }) {
  const { currentUser } = useContext(AuthContext)
  let location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={ { from: location } } replace />;
  }

  return children;
}

export default RequireAuth
