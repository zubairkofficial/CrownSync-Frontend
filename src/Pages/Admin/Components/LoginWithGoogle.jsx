import React from 'react';
import Helpers from '../../../Config/Helpers';
import axios from 'axios';

const LoginWithGoogle = () => {
    const responseGoogle = async (response) => {
        console.log("Token from Google:", response.credential);
        await sendTokenToBackend(response.credential);
    };

    const sendTokenToBackend = async (googleToken) => {
        const apiURL = Helpers.apiUrl;
        try {
            const response = await axios.post(`${apiURL}/auth/google`, { usertoken: googleToken }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log("Success:", response.data);
            } else {
                console.log("Response received:", response.data);
            }
        } catch (error) {
            if (error.response) {
                console.error("HTTP error fetching details:", error.response.data);
            } else if (error.details) {
                console.error("Google login error:", error.details);
            } else {
                console.error("Error fetching details:", error.message);
            }
        }
    };

    return (
        <></>
        // <GoogleLogin
        //     clientId="341429096489-e24lk8sq54ku9blm9o68v558pqces2mo.apps.googleusercontent.com"
        //     onSuccess={responseGoogle}
        //     onFailure={responseGoogle}
        // />
    );
};

export default LoginWithGoogle;
