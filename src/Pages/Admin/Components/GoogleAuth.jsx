// GoogleAuth.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Helpers from '../../../Config/Helpers';

function GoogleAuth() {
    const handleLoginSuccess = async (credentialResponse) => {
        const userToken = credentialResponse.credential;

        const apiurl = Helpers.apiUrl;
        // Call the backend API
        try {
            const response = await axios.post(
                `${apiurl}auth/google`,
                { usertoken: userToken }
            );

            // Handle the response from your backend
            console.log(response.data);

        } catch (error) {
            console.error('Error authenticating with Google:', error.response?.data || error.message);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="341429096489-e24lk8sq54ku9blm9o68v558pqces2mo.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
            />
        </GoogleOAuthProvider>
    );
}

export default GoogleAuth;
