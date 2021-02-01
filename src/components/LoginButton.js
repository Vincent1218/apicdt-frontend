import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="button"
      className="btn btn-secondary mr-1"
      onClick={() => loginWithRedirect()}
    >
      登入/注册
    </button>
  );
};

export default LoginButton;