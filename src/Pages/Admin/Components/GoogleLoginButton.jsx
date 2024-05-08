import React from 'react';

const GoogleLoginButton = ({ onLoginClick }) => {
  return (
    <div>
      <p style={{ padding: "25%" }}>
        <img src="/media/empty.png" alt="" />
      </p>
      <button
        onClick={onLoginClick}
        className="btn flex-1 py-2"
        style={{
          background: "#E2545E",
          color: "white",
          alignItems: "center",
          marginLeft: "25%",
        }}
      >
        Connect With Gmail
      </button>
    </div>
  );
};

export default GoogleLoginButton;
