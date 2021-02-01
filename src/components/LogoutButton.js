import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      type="button"
      className="btn btn-danger btn-block mr-1"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      登出
    </button>
  );
};

export default LogoutButton;