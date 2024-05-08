// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./Pages/Auth/Login";
// import Register from "./Pages/Auth/Register";
// import Home from "./Pages/User/Home";
// import Template from "./Pages/User/Template";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Dashboard from "./Pages/Admin/Dashboard";
import Models from "./Pages/Admin/Models";
import Queries from "./Pages/Admin/Queries";
import Newtemplate from "./Pages/Admin/Newtemplate";
import Newmodel from "./Pages/Admin/Newmodel";
import Newqueries from "./Pages/Admin/Newqueries";
import TemplateUpdate from "./Pages/Admin/TemplateUpdate";
import ModelUpdate from "./Pages/Admin/ModelUpdate";
import Products from "./Pages/Admin/Products";
import Newproduct from "./Pages/Admin/Newproduct";
import Productupdate from "./Pages/Admin/Productupdate";
import Queryupdate from "./Pages/Admin/Queryupdate";
import Store from "./Pages/User/Store";
import Location from "./Pages/User/Location";
import CreateTemplate from "./Pages/User/CreateTemplate";
import TemplateList from "./Pages/User/TemplateList";
import UpdateTemplate from "./Pages/User/UpdateTemplate";
import ScopSettings from "./Pages/User/ScopSettings";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route,
} from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/User/Home";
import Template from "./Pages/User/Template";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./Pages/Admin/Dashboard";
import Helpers from "./Config/Helpers";
import Addteam from "./Pages/User/Addteam";
import SentMails from "./Pages/User/SentMails";
import Profile from "./Pages/User/Profile";
function App() {
  // const clientId =
  //   "371366179768-olq6fq6do1lg8eqcuv99qjev930k19lm.apps.googleusercontent.com";
  // const clientId =
  // "341429096489-06ui4vadr34mvdf28e27e0fktvarjlbh.apps.googleusercontent.com";
  const clientId =
    "341429096489-e24lk8sq54ku9blm9o68v558pqces2mo.apps.googleusercontent.com";

  const Auth = ({ children, isAuth = true, isAdmin = false }) => {
    let user = Helpers.getItem("user", true);
    let token = Helpers.getItem("token");
    let loginTime = Helpers.getItem("loginTimestamp");
    let currentTime = new Date().getTime();
    let minutesPassed = Math.floor((currentTime - loginTime) / (1000 * 60));

    // Check for session expiration
    if (loginTime && minutesPassed > 120) {
      localStorage.clear();
      Helpers.toast("error", "Session expired. Login again to continue");
      return <Navigate to="/" />;
    }
    // For protected routes
    else if (isAuth) {
      if (!user || !token) {
        Helpers.toast("error", "Please login to continue");
        return <Navigate to="/" />;
      }

      // Ensure only admins can access admin routes
      if (isAdmin && user.type !== "Admin") {
        Helpers.toast("success", "Welcome To CrownSync.");
        return <Navigate to="/user/dashboard" />;
      }

      // Ensure admins cannot access user routes
      if (!isAdmin && user.type === "Admin") {
        Helpers.toast(
          "error",
          "Access denied. Admins cannot access user routes."
        );
        return <Navigate to="/admin/dashboard" />;
      }

      return children;
    }
    // For non-protected routes like /login
    else {
      if (user && token) {
        if (user.type === "Admin") {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/user/dashboard" />;
        }
      }
      return children;
    }
  };


  return (
    <>
      <GoogleOAuthProvider clientId="341429096489-e24lk8sq54ku9blm9o68v558pqces2mo.apps.googleusercontent.com">
        <div className="nk-app-root" data-sidebar-collapse="lg">
          {/* <RouterProvider router={router} /> */}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Auth isAuth={false}>
                    <Login />
                  </Auth>
                }
              />
              <Route
                path="/register"
                element={
                  <Auth isAuth={false}>
                    <Register />
                  </Auth>
                }
              />
              <Route
                path="/user/dashboard"
                element={
                  <Auth>
                    <Home />
                  </Auth>
                }
              />
              <Route
                path="/user/addusers"
                element={
                  <Auth>
                    <Addteam />
                  </Auth>
                }
              />
              <Route
                path="/user/sentmails"
                element={
                  <Auth>
                    <SentMails />
                  </Auth>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <Auth>
                    <Profile />
                  </Auth>
                }
              />
              <Route
                path="/user/dashboard/:messageId"
                element={
                  <Auth>
                    <Home />
                  </Auth>
                }
              />
              <Route
                path="/user/store"
                element={
                  <Auth>
                    <Store />
                  </Auth>
                }
              />
              <Route
                path="/user/location"
                element={
                  <Auth>
                    <Location />
                  </Auth>
                }
              />
              <Route
                path="/user/templates"
                element={
                  <Auth>
                    <TemplateList />
                  </Auth>
                }
              />
               <Route
                path="/user/scop-settings"
                element={
                  <Auth>
                    <ScopSettings />
                  </Auth>
                }
              />
              <Route
                path="/user/create-template"
                element={
                  <Auth>
                    <CreateTemplate />
                  </Auth>
                }
              />
              <Route
                path="/user/templates/update/:templateId"
                element={
                  <Auth>
                    <UpdateTemplate />
                  </Auth>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <Auth isAdmin={true}>
                    <Dashboard />
                  </Auth>
                }
              />
              <Route
                path="/admin/newtemplate"
                element={
                  <Auth isAdmin={true}>
                    <Newtemplate />
                  </Auth>
                }
              />
              <Route
                path="admin/newmodel"
                element={
                  <Auth isAdmin={true}>
                    <Newmodel />
                  </Auth>
                }
              />
              <Route
                path="admin/newqueries"
                element={
                  <Auth isAdmin={true}>
                    <Newqueries />
                  </Auth>
                }
              />
              <Route
                path="admin/models"
                element={
                  <Auth isAdmin={true}>
                    <Models />
                  </Auth>
                }
              />
              <Route
                path="admin/products"
                element={
                  <Auth isAdmin={true}>
                    <Products />
                  </Auth>
                }
              />
              <Route
                path="admin/newproduct"
                element={
                  <Auth isAdmin={true}>
                    <Newproduct />
                  </Auth>
                }
              />
              <Route
                path="admin/queries"
                element={
                  <Auth isAdmin={true}>
                    <Queries />
                  </Auth>
                }
              />
              <Route
                path="admin/templates/update/:templateId"
                element={
                  <Auth isAdmin={true}>
                    <TemplateUpdate />
                  </Auth>
                }
              />
              <Route
                path="admin/models/update/:modeleId"
                element={
                  <Auth isAdmin={true}>
                    <ModelUpdate />
                  </Auth>
                }
              />
              <Route
                path="admin/product/update/:productId"
                element={
                  <Auth isAdmin={true}>
                    <Productupdate />
                  </Auth>
                }
              />
              <Route
                path="admin/query/update/:queryId"
                element={
                  <Auth isAdmin={true}>
                    <Queryupdate />
                  </Auth>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
