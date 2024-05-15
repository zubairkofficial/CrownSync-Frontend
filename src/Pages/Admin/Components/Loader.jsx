import React from 'react';

const Loader = ({ style }) => {
  const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const combinedStyle = { ...defaultStyle, ...style };

  return (
    <div style={combinedStyle}>
      <div style={{
        border: '8px solid #f3f3f3', /* Light grey */
        borderTop: '8px solid #ff69b4', /* Pink */
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite' // Reduced animation time for faster spinning
      }}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
