import React from 'react';
import Helpers from '../../../Config/Helpers';
const GoogleLoginComponent = () => {

   
  const loginWithGoogle = () => {
    const backendURL = Helpers.backendUrl;
    window.location.href = `${backendURL}auth/redirect`;
  };

  return (
    <div
      className="icon-wrapper rounded p-3 border border-gray-300 ml-2"
      style={{
        cursor: "pointer",
      }}
      title="Connect With Gmail"
      onClick={loginWithGoogle}
    >
      <i
        className="fa-light fa-refresh"
        style={{ fontSize: "15px", color: "#AEAEAE" }}
      ></i>
    </div>
  );
};

export default GoogleLoginComponent;
