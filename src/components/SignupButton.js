import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="button"
      className="btn btn-secondary mr-1"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      注册
    </button>
  );
};

export default SignupButton;