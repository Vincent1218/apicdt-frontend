import React from "react";
import './css/Loading.css'
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." width="10%" />
  </div>
);

export default Loading;
