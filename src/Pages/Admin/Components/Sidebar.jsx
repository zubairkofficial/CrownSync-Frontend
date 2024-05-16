import React from "react";
import { Link } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  // const logout = () => {
  //   localStorage.removeItem("token"); // Remove token from local storage
  //   localStorage.removeItem("user"); // Remove token from local storage
  //   // window.location.href = "/"; // Redirect to the home page
  //   navigate("/")
  // };
  const logout = async () => {
    const token = localStorage.getItem("token");  
    // Immediately clear client-side authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    if (!token) {
      // If no token, just navigate to login
      navigate("/");
      return;
    }
  
    try {
      const response = await axios.post(`${Helpers.apiUrl}logout`, Helpers.authHeaders);  
      if (response.status === 200) {
        navigate("/");
      } else {
        Helpers.toast("warning", response.data.message);
      }
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };
  

  // const logout = async () => {
  //   const token = localStorage.getItem("token"); // Retrieve token from local storage
  //   const baseUrl = Helpers.apiUrl;
    
  //   try {
  //     // Send a POST request to logout endpoint with the token
  //     const response = await axios.post(`${baseUrl}logout`, {}, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`, // Set Authorization header with the token
  //       },
  //     });

  //     if (response.status === 200) {
  //       // If logout is successful, redirect to the home page
  //       // window.location.href = "/";
  //       navigate('/login')
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
    <div className="nk-sidebar nk-sidebar-fixed" id="sidebar">
      <div className="nk-compact-toggle">
        <button className="btn btn-xs btn-outline-light btn-icon compact-toggle text-light bg-white rounded-3">
          <em className="icon off ni ni-chevron-left"></em>
          <em className="icon on ni ni-chevron-right"></em>
        </button>
      </div>
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <Link herf="X" className="logo-link">
            {/* <div className="logo-wrap">
              <img
                className="logo-img logo-light"
                src="/images/logo.png"
                alt=""
              />
              <img
                className="logo-img logo-dark"
                src="/images/logo-dark.png"
                alt=""
              />
              <img
                className="logo-img logo-icon"
                src="/images/logo-icon.png"
                alt=""
              />
            </div> */}
            <h2>Dashboard</h2>
          </Link>
        </div>
      </div>
      <div className="nk-sidebar-element nk-sidebar-body">
        <div className="nk-sidebar-content h-100" data-simplebar>
          <div className="nk-sidebar-menu">
            <ul className="nk-menu">
              <li className="nk-menu-item">
                <Link to="/admin/dashboard" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-dashboard-fill"></em>
                  </span>
                  <span className="nk-menu-text">Templates</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/admin/models" className="nk-menu-link">
                  <span className="nk-menu-icon">
                  <em className="icon ni ni-edit"></em>
                  </span>
                  <span className="nk-menu-text">Add Collection</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/admin/products" className="nk-menu-link">
                  <span className="nk-menu-icon">
                  <em className="icon ni ni-folder-list"></em>
                  </span>
                  <span className="nk-menu-text">Add Model</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/admin/queries" className="nk-menu-link">
                  <span className="nk-menu-icon">
                  <em className="icon ni ni-layers"></em>
                  </span>
                  <span className="nk-menu-text">Queries</span>
                </Link>
              </li>

              {/* <li className="nk-menu-item ">
                                <Link to="#" onClick={logout} className="nk-menu-link nk-menu-toggle">
                                    <span className="nk-menu-icon"><em className="icon ni ni-signin"></em></span><span className="nk-menu-text">SignOut</span>
                                </Link>

                            </li> */}

              {/* <li className="nk-menu-item">
                                <Link href="#" className="nk-menu-link">
                                    <span className="nk-menu-icon is-alt"><em className="icon ni ni-block-over"></em></span><span className="nk-menu-text">Toasts</span>
                                </Link>
                            </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="nk-sidebar-element nk-sidebar-footer">
        <div className="nk-sidebar-footer-extended pt-3">
          <div className="border border-light rounded-3">
            <div className="px-3 py-2 bg-white border-bottom border-light rounded-top-3">
              {/* <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <h6 className="lead-text">Free Plan</h6>
                                <Link className="link link-primary" href="pricing-plans.html"><em className="ni ni-spark-fill icon text-warning"></em><span>Upgrade</span></Link>
                            </div> */}
              {/* <div className="progress progress-md"><div className="progress-bar" data-progress="25%"></div></div>
                            <h6 className="lead-text mt-2">1,360 <span className="text-light">words left</span></h6> */}
            </div>
            {/* <Link
              className="d-flex px-3 py-2 bg-primary bg-opacity-10 rounded-bottom-3"
              href="#"
            > */}
              <div className="media-group d-block">
                {/* <div className="media media-sm media-middle media-circle text-bg-primary">
                  <img src="/images/avatar/a.png" />
                </div> */}
                <div className="">
                <button
                  
                  onClick={logout}
                  className="btn rounded-pill d-block" style={{background:"#3F3EED",color:"white" ,width:"100%"}}
                >
                  <h6 className="fs-6 mb-0" style={{background:"#3F3EED",color:"white"}} >Sign Out</h6>
                </button>
                  {/* <span className="text-light fs-7">shawn@websbd.com</span> */}
                </div>
                {/* <em className="icon ni ni-chevron-right ms-auto ps-1"></em> */}
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
