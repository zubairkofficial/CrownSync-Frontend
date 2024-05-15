import React from "react";
import { Link } from "react-router-dom";
import Helpers from "../Config/Helpers";
import axios from "axios";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [inputs, setInputs] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [mails, setMails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const baseUrl = Helpers.apiUrl;
  // const loginWithGoogle = useGoogleLogin({
  //   scope:
  //     "https://www.googleapis.com/auth/userinfo.email https://mail.google.com/",
  //   onSuccess: async (tokenResponse) => {
  //     setIsLoading(true);
  //     // setGoogleLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");
  //       console.log("Tokeeenene", token);
  //       console.log("google", tokenResponse.access_token);
  //       let data = { usertoken: tokenResponse.access_token, token: token };
  //       // let data = { usertoken : tokenResponse.access_token };
  //       // let data = { usertoken : token };
  //       // Adding await here to wait for the request to complete
  //       const response = await axios.post(`${baseUrl}auth/google`, data, {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         // Helpers.setItem("user", response.data.user, true);
  //         // Helpers.setItem("token", response.data.token);
  //         console.log(response.data.user);

  //         // window.location.href = "/user/dashboard";
  //         // navigate("/user/dashboard");
  //         window.location.reload();
  //       } else {
  //         // It's more common to handle non-200 responses in the catch block
  //         console.log("Received non-200 response:", response.status);
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       setGoogleLoading(false);
  //       // Improved error handling
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.error("Error data:", error.response.data);
  //         console.error("Error status:", error.response.status);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error("No response received:", error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error("Error message:", error.message);
  //       }
  //     }
  //   },
  //   onError: (error) => {
  //     // Handle error
  //     console.error("Login with Google error:", error);
  //     setIsLoading(false);
  //     setGoogleLoading(false);
  //   },
  // });
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const url = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}profile`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // console.log("API Response:", response.data.data.profile);
          setProfile(response.data.data);
        } else {
          console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchDetail();
  }, []);
  const navigate = useNavigate();
  const logout = async () => {
    const token = localStorage.getItem("token");
    const baseUrl = Helpers.apiUrl;

    // Immediately clear client-side authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (!token) {
      // If no token, just navigate to login
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/");
      } else {
        Helpers.toast("warning", response.data.message);
      }
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };
  const [isActive, setIsActive] = useState(false);

  // const logout = () => {
  //   localStorage.removeItem("token"); // Remove token from local storage
  //   localStorage.removeItem("user"); // Remove token from local storage
  //   // window.location.href = "/"; // Redirect to the home page
  //   navigate("/login")
  // };
  // const logout = async () => {
  //   const token = localStorage.getItem("token"); // Retrieve token from local storage
  //   const baseUrl = Helpers.apiUrl;

  //   try {
  //     // Send a POST request to logout endpoint with an empty object and the token
  //     const response = await axios.post(`${baseUrl}logout`, {}, {
  //       headers: {
  //         Accept: "application/json",
  //         'Content-Type': 'application/json', // Ensure Content-Type is set for JSON
  //         Authorization: `Bearer ${token}`, // Set Authorization header with the token
  //       },
  //     });

  //     if (response.status === 200) {
  //       // If logout is successful, redirect to the home page
  //       navigate("/login")
  //     } else {
  //       // If logout fails, show a warning message
  //       Helpers.toast("warning", response.data.message);
  //     }
  //   } catch (error) {
  //     // If an error occurs during logout process, show an error message
  //     Helpers.toast("error", error.message);
  //   }
  // };

  return (
    // <div className="nk-sidebar nk-sidebar-fixed" id="sidebar">
    //   <div className="nk-compact-toggle">
    //     <button className="btn btn-xs btn-outline-light btn-icon compact-toggle text-light bg-white rounded-3">
    //       <em className="icon off ni ni-chevron-left"></em>
    //       <em className="icon on ni ni-chevron-right"></em>
    //     </button>
    //   </div>
    //   <div className="nk-sidebar-element nk-sidebar-head">
    //     <div className="nk-sidebar-brand">
    //       <h1>Crown</h1>
    //       {/* <Link herf="X" className="logo-link">
    //                     <div className="logo-wrap">
    //                         <img className="logo-img logo-light" src="/images/logo.png"  alt="" />
    //                         <img className="logo-img logo-dark" src="/images/logo-dark.png"alt="" />
    //                         <img className="logo-img logo-icon" src="/images/logo-icon.png"  alt="" />
    //                     </div>
    //                 </Link> */}
    //     </div>
    //   </div>
    //   <div className="nk-sidebar-element nk-sidebar-body">
    //     <div className="nk-sidebar-content h-100" data-simplebar>
    //       <div className="nk-sidebar-menu">
    //         <ul className="nk-menu">
    //           <li className="nk-menu-item">
    //             <Link to="/user/dashboard" className="nk-menu-link">
    //               <span className="nk-menu-icon">
    //                 <em className="icon ni ni-dashboard-fill"></em>
    //               </span>
    //               <span className="nk-menu-text">Dashboard</span>
    //             </Link>
    //           </li>
    //           {/* <li className="nk-menu-item has-sub">
    //                             <Link href="#" className="nk-menu-link nk-menu-toggle">
    //                                 <span className="nk-menu-icon"><em className="icon ni ni-folder-list"></em></span><span className="nk-menu-text">Documents</span>
    //                             </Link>
    //                             <ul className="nk-menu-sub">
    //                                 <li className="nk-menu-item">
    //                                     <Link href="document-saved.html" className="nk-menu-link"><span className="nk-menu-text">Saved</span></Link>
    //                                 </li>
    //                                 <li className="nk-menu-item">
    //                                     <Link href="document-drafts.html" className="nk-menu-link"><span className="nk-menu-text">Drafts</span></Link>
    //                                 </li>
    //                             </ul>
    //                         </li>
    //                         <li className="nk-menu-item has-sub">
    //                             <Link href="#" className="nk-menu-link nk-menu-toggle">
    //                                 <span className="nk-menu-icon"><em className="icon ni ni-edit"></em></span><span className="nk-menu-text">Editor</span>
    //                             </Link>
    //                             <ul className="nk-menu-sub">
    //                                 <li className="nk-menu-item">
    //                                     <Link href="document-editor.html" className="nk-menu-link"><span className="nk-menu-text">New</span></Link>
    //                                 </li>
    //                                 <li className="nk-menu-item">
    //                                     <Link href="document-editor-generate.html" className="nk-menu-link"><span className="nk-menu-text">Generate</span></Link>
    //                                 </li>
    //                                 <li className="nk-menu-item">
    //                                     <Link href="document-editor-edit.html" className="nk-menu-link"><span className="nk-menu-text">Edit</span></Link>
    //                                 </li>
    //                             </ul>
    //                         </li> */}

    //           {/* <li className="nk-menu-item ">
    //                             <Link to="#" onClick={logout} className="nk-menu-link nk-menu-toggle">
    //                                 <span className="nk-menu-icon"><em className="icon ni ni-signin"></em></span><span className="nk-menu-text">SignOut</span>
    //                             </Link>

    //                         </li> */}

    //           {/* <li className="nk-menu-item">
    //                             <Link href="#" className="nk-menu-link">
    //                                 <span className="nk-menu-icon is-alt"><em className="icon ni ni-block-over"></em></span><span className="nk-menu-text">Toasts</span>
    //                             </Link>
    //                         </li> */}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="nk-sidebar-element nk-sidebar-footer">
    //     <div className="nk-sidebar-footer-extended pt-3">
    //       <div className="border border-light rounded-3">
    //         <div className="px-3 py-2 bg-white border-bottom border-light rounded-top-3">
    //           {/* <div className="d-flex flex-wrap align-items-center justify-content-between">
    //                             <h6 className="lead-text">Free Plan</h6>
    //                             <Link className="link link-primary" href="pricing-plans.html"><em className="ni ni-spark-fill icon text-warning"></em><span>Upgrade</span></Link>
    //                         </div> */}
    //           {/* <div className="progress progress-md"><div className="progress-bar" data-progress="25%"></div></div>
    //                         <h6 className="lead-text mt-2">1,360 <span className="text-light">words left</span></h6> */}
    //         </div>
    //         {/* <Link
    //           className="d-flex px-3 py-2 bg-primary bg-opacity-10 rounded-bottom-3"
    //           href="#"
    //         > */}
    //           <div className="media-group">
    //             <div className="media media-sm media-middle media-circle text-bg-primary">
    //               <img src="/images/avatar/a.png" />
    //             </div>
    //             <div className="media-text ">
    //               <button

    //                 onClick={logout}
    //                 className="btn btn-md btn-primary rounded-pill color-white"
    //               >
    //                 <h6 className="fs-6 mb-0" style={{color:"white"}}>Sign Out</h6>
    //               </button>

    //               {/* <span className="text-light fs-7">shawn@websbd.com</span> */}
    //             </div>
    //             <em className="icon ni ni-chevron-right ms-auto ps-1"></em>
    //           </div>
    //         {/* </Link> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <aside className="flex h-100 w-20 flex-col items-center  border-gray-200 bg-white pt-5 z-10">
      <div className="flex h-[4.5rem] w-full items-center justify-center  border-gray-200 p-2">
        {/* <Link to='/user/dashboard'> */}
        <img
          src="/media/logo.png"
          style={{ borderRadius: "10px", width: "75%" }}
        />
        {/* </Link> */}
      </div>
      <nav className="flex flex-1 flex-col gap-y-4 pt-10">
        <Link
          to="/user/dashboard"
          className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
          style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
        >
          <i className="fa-light fa-envelope-dot" style={{ fontSize: "20px" }}></i>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Inbox <span className="text-gray-400"></span>
            </div>
          </div>
        </Link>
        <Link
          to="/user/sentmails"
          className="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50"
        >
          <i
            className="fa-light fa-paper-plane"
            style={{ fontSize: "20px", color: "#BBBBBB" }}
          ></i>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Sent Mails <span className="text-gray-400"></span>
            </div>
          </div>
        </Link>
        <Link
          to="/user/Setting"
          className="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50"
        >
            <i className="fa-light fa-gear" style={{ fontSize: "20px" }}></i>
            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
              <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-white"></div>
                </div>
                Setting <span className="text-gray-400"></span>
              </div>
            </div>
        </Link>
        
        {/* <div className="relative">
          <button
            className="group relative rounded-xl p-2 hover:bg-gray-50 w-full flex justify-between"
            onClick={() => setToggle(!toggle)}
          >
            <i className="fa-light fa-gear" style={{ fontSize: "20px" }}></i>
            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
              <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-white"></div>
                </div>
                Settings <span className="text-gray-400"></span>
              </div>
            </div>
            <i className={`fa-light ${toggle ? 'fa-chevron-up' : 'fa-chevron-down'}  `}
              style={{ fontSize: "14px",paddingLeft:"10px" }}
            ></i>
          </button>
          {toggle && (
            <div className="flex flex-col gap-y-2 mt-2 pl-4">              
              <Link
                to="/user/collection"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-list" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Collections <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/model"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-list" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Model <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/addusers"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-users-medical" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Add Users <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/store"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-shop" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Stores <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/location"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-globe" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Locations <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/scope-settings"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-gear" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Scope Settings <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user/templates"
                className="group relative rounded-xl  p-2 text-blue-600 hover:bg-gray-50"
                style={{ color: isActive ? "#E2545E" : "#BBBBBB" }}
              >
                <i className="fa-light fa-building" style={{ fontSize: "20px" }}></i>
                <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                  <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
                    <div className="absolute inset-0 -left-1 flex items-center">
                      <div className="h-2 w-2 rotate-45 bg-white"></div>
                    </div>
                    Templates <span className="text-gray-400"></span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div> */}
        
      </nav>

      <div className="flex flex-col items-center gap-y-4 py-10">
        {/* <button
          className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={loginWithGoogle}
        >
          <i
            className="fa-light fa-user-plus"
            style={{ fontSize: "20px", color: "#BBBBBB", cursor: "pointer" }}
          ></i>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Connect with Gmail <span className="text-gray-400"></span>
            </div>
          </div>
        </button> */}
        <Link to="/user/profile">
          <button className="mt-2 rounded-full bg-gray-100 group relative ">
          {profile && profile.profile ? (
  <img
    className="rounded-full"
    src={`${Helpers.basePath}/assets/${profile.profile}`}
    alt="User Profile"    
    style={{ width: "40px", height: "40px" }}
  />
) : (
  <img
    className=" rounded-full"
    src="/media/user.png"
    alt="Default Avatar"
    style={{ width: "40px", height: "40px" }}
  />
)}

          </button>
        </Link>
        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950 drop-shadow-lg">
            <div className="absolute inset-0 -left-1 flex items-center">
              <div className="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Profile <span className="text-gray-400"></span>
          </div>
        </div>
        <button
          className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={logout}
        >
          <i
            className="fa-light fa-right-from-bracket"
            style={{ fontSize: "20px", color: "#BBBBBB", cursor: "pointer" }}
          ></i>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm text-gray-950 font-semibold drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Logout <span className="text-gray-400"></span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
