import React, { useState, useEffect } from "react";
import Helpers from "./../../Config/Helpers";
import axios from "axios";
import BtnSpinner from "./../../Components/BtnSpinner";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = Helpers.apiUrl;

  const validate = () => {
    if (!inputs.name) {
      Helpers.toast("error", "Name is required.");
      return false;
    } else if (inputs.name.length > 255) {
      Helpers.toast("error", "Name can't be longer than 255 characters.");
      return false;
    }

    if (!inputs.email) {
      Helpers.toast("error", "Email is required.");
      return false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(inputs.email)) {
        Helpers.toast("error", "Invalid email format.");
        return false;
      } else if (inputs.email.length > 255) {
        Helpers.toast("error", "Email can't be longer than 255 characters.");
        return false;
      }
    }

    if (!inputs.password) {
      Helpers.toast("error", "Password is required.");
      return false;
    } else if (inputs.password.length < 3) {
      Helpers.toast("error", "Password must be at least 3 characters.");
      return false;
    } else if (inputs.password.length > 8) {
      Helpers.toast("error", "Password can't be longer than 8 characters.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    document.title = "Register - Crownsync AI";
    document.body.style.backgroundImage = "url('media/auth/bg10.jpg')";

    const themeChangeHandler = () => {
      if (document.body.dataset.bsTheme === "dark") {
        document.body.style.backgroundImage =
          "url('/path/to/your/assets/media/auth/bg10-dark.jpg')";
      } else {
        document.body.style.backgroundImage =
          "url('/path/to/your/assets/media/auth/bg10.jpg')";
      }
    };

    document.body.addEventListener("themeChange", themeChangeHandler);

    return () => {
      document.body.removeEventListener("themeChange", themeChangeHandler);
      document.title = "Crownsync Ai";
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}register`, inputs, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Helpers.setItem("user", response.data.user, true);
        Helpers.setItem("token", response.data.token);
        navigate("/user/dashboard");
        Helpers.toast("success", "Registration successful");
      } else {
        Helpers.toast("error", "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.status === 422) {
        Helpers.toast("error", error.response.data.errors.join(", "));
      } else if (error.response) {
        Helpers.toast("error", error.response.data.message || "Invalid request");
      } else {
        Helpers.toast("error", "Network error or server unavailable");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="d-flex flex-lg-row-fluid">
        <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
          <img
            className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
            src="media/auth/signup.png"
            alt=""
          />

          <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">
            Elevating Email Efficiency
          </h1>
          <div className="text-gray-600 fs-base text-center fw-semibold">
            Empower your inbox with,{" "}
            <a href="#" className="opacity-75-hover text-primary me-1">
              Crownsync's lightning-fast Gmail
            </a>{" "}
            management solution for seamless <br /> sending and responsive
            <a href="#" className="opacity-75-hover text-primary me-1">
              {" "}
              message handling
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
                noValidate
                id="kt_sign_up_form"
                data-kt-redirect-url="media/auth/CROWNSYNCAI.png"
                action="#"
                onSubmit={handleRegister}
              >
                <Link to="https://crownsync.ai/">
                  <img
                    className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
                    src="media/auth/CROWNSYNCAI.png"
                    alt=""
                  />
                </Link>
                <div className="separator separator-content my-14">
                  <span className="w-125px text-gray-500 fs-7 fw-bold text-center">
                    Register
                  </span>
                </div>

                <div className="fv-row mb-8">
                 
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={inputs.name}
                    placeholder="Name"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="fv-row mb-8">
                 
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                  />
                </div>

                <div className="fv-row mb-8" data-kt-password-meter="true">
                  <div className="mb-1">
                    <div className="position-relative mb-3">
                      
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid mb-10">
                  <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn"
                    style={{ background: "#E2555E", color: "white" }}
                    disabled={isLoading}
                  >
                    <span className="indicator-label">Sign up</span>

                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>

                <div className="text-gray-500 text-center fw-semibold fs-6">
                  Already have an Account?{" "}
                  <Link to="/" style={{ color: "#E2555E" }}>
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
