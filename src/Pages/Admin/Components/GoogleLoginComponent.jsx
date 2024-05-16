import React, { useState } from 'react';
import axios from 'axios';
import Helpers from '../../../Config/Helpers';

const GoogleLoginComponent = () => {
  const [isGoogle, setIsGoogle] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Helpers.apiUrl}refreshEmails`, Helpers.authHeaders);
      if (response.status === 200 && response.data.data) {
        setIsGoogle(response.data.data);
        setUserNotFound(false);
        console.log(response.data);
      } else {
        setIsGoogle(null);
        setUserNotFound(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle user not found
        setUserNotFound(true);
        setIsGoogle(null);
      } else {
        // Handle other errors
        console.error("Error fetching details:", error);
      }
    } finally {
      setIsLoading(false);
      window.location.href = '/user/dashboard'; 
    }
  };

  const loginWithGoogle = async () => {
    await fetchDetail(); // Fetch data when the button is clicked
    window.location.href = '/user/dashboard'; // Correct way to navigate
  };

  return (
    <div>
      <div
        className={`icon-wrapper rounded p-3 border border-gray-300 ml-2 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        title="Refresh mail"
        onClick={!isLoading ? loginWithGoogle : null}
        disabled={isLoading}
      >
        {isLoading ? (
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: "15px", color: "#AEAEAE" }}
          ></i>
        ) : (
          <i
            className="fa-light fa-refresh"
            style={{ fontSize: "15px", color: "#AEAEAE" }}
          ></i>
        )}
      </div>
      
      {userNotFound && <div>User not found</div>}
    </div>
  );
};

export default GoogleLoginComponent;
