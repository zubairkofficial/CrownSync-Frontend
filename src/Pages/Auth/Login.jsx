import React, { useState,useEffect } from 'react';
import Helpers from './../../Config/Helpers';
import axios from 'axios';
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import BtnSpinner from "./../../Components/BtnSpinner";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  useEffect(() => {
    document.title = "Login - Crownsync AI";
    // Optionally, set meta description or any other head elements here
    return () => {
      // This is where you can reset or change the title when the component unmounts if necessary
      document.title = "Crownsync Ai";
    };
  }, []);
    const [inputs, setInputs] = useState({});
    const [googleLoading, setGoogleLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = Helpers.apiUrl;
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/userinfo.email https://mail.google.com/',
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setGoogleLoading(true);
            try {
                let data = { token: tokenResponse.access_token };
                // Adding await here to wait for the request to complete
                const response = await axios.post(`${baseUrl}auth/google`, data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    Helpers.setItem("user", response.data.user, true);
                    Helpers.setItem("token", response.data.token);
                    console.log(response.data.user);

                    // window.location.href = "/user/dashboard";
                    navigate("/user/dashboard")
                } else {
                    // It's more common to handle non-200 responses in the catch block
                    console.log("Received non-200 response:", response.status);
                }
            } catch (error) {
                setIsLoading(false);
                setGoogleLoading(false);
                // Improved error handling
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Error data:", error.response.data);
                    console.error("Error status:", error.response.status);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error message:", error.message);
                }
            }
        },
        onError: error => {
            // Handle error
            console.error("Login with Google error:", error);
            setIsLoading(false);
            setGoogleLoading(false);
        }
    });


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}login`, inputs, {
                headers: {
                    'Accept': 'application/json', // Corrected header value capitalization
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                // console.log(response.data);
                localStorage.setItem('token', response.data.token); // Assuming the token is in response.data.token
                Helpers.setItem('user', response.data.user, true)

                const ttoken = localStorage.setItem('token', response.data.token);
                // console.log(ttoken, response.data.user);
                // console.log("userrrr", response.data.user);
                // window.location.href = '/user/dashboard';
                navigate("/admin/dashboard")
                // Helpers.toast('success', 'Login successfully'); // Assuming Helpers.toast is a valid method
            } else {
                // This else block might not be necessary if using catch for error handling
                Helpers.toast('warning', 'An unexpected error occurred');
            }
        } catch (error) {
            // It's a good practice to handle errors in catch block
            console.error('Login error:', error);
            if (error.response) {
                // Server responded with a status code that falls out of the range of 2xx
                Helpers.toast('error', error.response.data.message || 'Failed to login'); // Display error message from server if available
            } else {
                // Something happened in setting up the request that triggered an Error
                Helpers.toast('error', 'Login failed due to network error or server unavailability');
            }
        }
    };
    useEffect(() => {
        // Set the initial background image when the component mounts
        document.body.style.backgroundImage = "url('media/auth/bg10.jpg')";
    
        // Listen for changes to the theme and update the background image
        const themeChangeHandler = () => {
          if (document.body.dataset.bsTheme === 'dark') {
            document.body.style.backgroundImage = "url('/path/to/your/assets/media/auth/bg10-dark.jpg')";
          } else {
            document.body.style.backgroundImage = "url('/path/to/your/assets/media/auth/bg10.jpg')";
          }
        };
    
        // Example: Assuming there's an event you can listen to for theme changes
        document.body.addEventListener('themeChange', themeChangeHandler);
    
        // Cleanup function to remove the event listener
        return () => {
          document.body.removeEventListener('themeChange', themeChangeHandler);
        };
      }, []);

    return (
        // <div className="nk-app-root " data-sidebar-collapse="lg">
        //     <div className="nk-main">
        //         <div className="nk-wrap has-shape flex-column">
        //             <div className="nk-shape bg-shape-blur-a start-0 top-0"></div>
        //             <div className="nk-shape bg-shape-blur-b end-0 bottom-0"></div>
        //             <div className="text-center pt-5">
        //                 <Link to="#!" className="logo-link"></Link>
        //             </div>
        //             <div className="container p-2 p-sm-4">
        //                 <div className="row justify-content-center">
        //                     <div className="col-md-7 col-lg-5 col-xl-5 col-xxl-4">
        //                         <div className="nk-block">
        //                             <div className="nk-block-head text-center mb-4 pb-2">
        //                                 <div className="nk-block-head-content">
        //                                     <h1 className="nk-block-title mb-1">
        //                                         Log into Your Account
        //                                     </h1>
        //                                     <p className="small">
        //                                         Sign in to your account to customize your content
        //                                         generation settings and view your history.
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                             <form onSubmit={handleLogin}>
        //                                 <div className="row gy-3">
        //                                     <div className="col-12">
        //                                         <div className="form-group">
        //                                             <label className="form-label" htmlFor="email">
        //                                                 Email Address
        //                                             </label>
        //                                             <div className="form-control-wrap">
        //                                                 <input
        //                                                     className="form-control"
        //                                                     type="email"
        //                                                     name="email"
        //                                                     placeholder="Enter email address"
        //                                                     value={inputs.email}
        //                                                     onChange={handleChange}

        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="col-12">
        //                                         <div className="form-group">
        //                                             <label className="form-label" htmlFor="password">
        //                                                 Password
        //                                             </label>
        //                                             <div className="form-control-wrap">
        //                                                 <Link
        //                                                     href="#!"
        //                                                     className="password-toggle form-control-icon end"
        //                                                     title="Toggle show/hide password"
        //                                                 >
        //                                                     <em className="icon ni ni-eye inactive"></em>
        //                                                     <em className="icon ni ni-eye-off active"></em>
        //                                                 </Link>
        //                                                 <input
        //                                                     className="form-control"
        //                                                     type="password"
        //                                                     id="password"
        //                                                     name="password"
        //                                                     placeholder="Enter password"
        //                                                     value={inputs.password}
        //                                                     onChange={handleChange}
        //                                                     required
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="col-12">
        //                                         <Link className="link small" to="register">
        //                                             Dont Have Account?
        //                                         </Link>
        //                                     </div>
        //                                     <div className="col-12">
        //                                         <div className="d-grid">
        //                                             <button className="btn btn-primary" type="submit">
        //                                                 Login
        //                                             </button>
        //                                             <button disabled={isLoading} onClick={loginWithGoogle} className="btn-auth btn  btn-danger mt-3">{googleLoading ? <BtnSpinner /> : <img src="/app/google.png" className="auth-icon" alt="" />} {googleLoading ? 'Please wait...' : 'Continue with Google'}</button>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-lg-row-fluid">
          <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
            <img
              className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
              src="media/auth/login.png"
              alt=""
            />
            {/* <img
              className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
              src="media/auth/agency-dark.png"
              alt=""
            /> */}

            <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">
            Elevating Email Efficiency
            </h1>
            <div className="text-gray-600 fs-base text-center fw-semibold">
            Empower your inbox with,{" "}
              <a href="#" className="opacity-75-hover text-primary me-1">
              Crownsync's lightning-fast Gmail
              </a>
              management solution for seamless <br /> sending and responsive
              <a href="#" className="opacity-75-hover text-primary me-1">
              {" "}message handling
              </a>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
          <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
            <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
              <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                <form
                  className="form w-100"
                  noValidate="novalidate"
                  id="kt_sign_in_form"
                  data-kt-redirect-url="/metronic8/demo52/index.html"
                  action="#"
                  onSubmit={handleLogin}
                >
                  <div className="text-center mb-11">
                    {/* <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1> */}

                  </div>

                  <div className="row g-3 mb-9">
                    <div className="col-md-6">
                      
                    </div>
                    <div className="col-md-6">
                      
                    </div>
                  </div>
                  <Link to='https://crownsync.ai/'>
                  <img
              className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
              src="media/auth/CROWNSYNCAI.png"
              alt=""
            />
                  </Link>

                  <div className="separator separator-content my-14">
                    <span className="w-125px text-gray-500 fs-7 fw-bold text-center">
                    Sign In
                    </span>
                  </div>
                  <div className="fv-row mb-8">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      autoComplete="off"
                      className="form-control bg-transparent"
                      value={inputs.email}
                               onChange={handleChange}
                    />
                  </div>

                  <div className="fv-row mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="off"
                      className="form-control bg-transparent"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                    <div></div>

                    {/* <a href="#" className="link-primary">
                      Forgot Password ?
                    </a> */}
                  </div>
                  <div className="d-grid mb-10">
                    <button
                      type="submit"
                      // id="kt_sign_in_submit"
                      className="btn "
                      style={{background:"#E2555E",color:"white"}}
                    >
                      <span className="indicator-label" >Sign In</span>
                       {/* <button className="btn btn-primary" type="submit">
                                               Login
                                          </button> */}

                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>

                  <div className="text-gray-500 text-center fw-semibold fs-6">
                    Not a Member yet? {" "}
                    <Link to="/register" style={{color:"#E2555E"}}>
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>

              {/* <div className=" d-flex flex-stack">
                <div className="me-10">
                  <button
                    className="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-start"
                    data-kt-menu-offset="0px, 0px"
                  >
                    <img
                      data-kt-element="current-lang-flag"
                      className="w-20px h-20px rounded me-3"
                      src="media/flags/united-states.svg"
                      alt=""
                    />
                    <span data-kt-element="current-lang-name" className="me-1">
                      English
                    </span>
                    <i className="ki-outline ki-down fs-5 text-muted rotate-180 m-0"></i>{" "}
                  </button>

                  <div
                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7"
                    data-kt-menu="true"
                    id="kt_auth_lang_menu"
                  >
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link d-flex px-5"
                        data-kt-lang="English"
                      >
                        <span className="symbol symbol-20px me-4">
                          <img
                            data-kt-element="lang-flag"
                            className="rounded-1"
                            src="media/flags/united-states.svg"
                            alt=""
                          />
                        </span>
                        <span data-kt-element="lang-name">English</span>
                      </a>
                    </div>
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link d-flex px-5"
                        data-kt-lang="Spanish"
                      >
                        <span className="symbol symbol-20px me-4">
                          <img
                            data-kt-element="lang-flag"
                            className="rounded-1"
                            src="media/flags/spain.svg"
                            alt=""
                          />
                        </span>
                        <span data-kt-element="lang-name">Spanish</span>
                      </a>
                    </div>
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link d-flex px-5"
                        data-kt-lang="German"
                      >
                        <span className="symbol symbol-20px me-4">
                          <img
                            data-kt-element="lang-flag"
                            className="rounded-1"
                            src="media/flags/germany.svg"
                            alt=""
                          />
                        </span>
                        <span data-kt-element="lang-name">German</span>
                      </a>
                    </div>
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link d-flex px-5"
                        data-kt-lang="Japanese"
                      >
                        <span className="symbol symbol-20px me-4">
                          <img
                            data-kt-element="lang-flag"
                            className="rounded-1"
                            src="media/flags/japan.svg"
                            alt=""
                          />
                        </span>
                        <span data-kt-element="lang-name">Japanese</span>
                      </a>
                    </div>
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link d-flex px-5"
                        data-kt-lang="French"
                      >
                        <span className="symbol symbol-20px me-4">
                          <img
                            data-kt-element="lang-flag"
                            className="rounded-1"
                            src="media/flags/france.svg"
                            alt=""
                          />
                        </span>
                        <span data-kt-element="lang-name">French</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex fw-semibold text-primary fs-base gap-5">
                  <a href="pages/team.html" target="_blank">
                    Terms
                  </a>

                  <a href="pages/pricing/column.html" target="_blank">
                    Plans
                  </a>

                  <a href="pages/contact.html" target="_blank">
                    Contact Us
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
}
