import React from "react";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { useNavigate } from "react-router-dom";
function Newtemplate() {
  const [greetings, setGreetings] = useState("");
  const [template_name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [footer, setFooter] = useState("");
  const [links, setLinks] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      greetings,
      heading,
      template_name,
      footer,
      links,
    };

    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}admin/mail_templates`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully");
        Helpers.toast("success", "Data Stored Successfully");
        navigate("/admin/dashboard");
        // Handle success
      } else {
        console.log("Received non-200 response:", response.status);
        // Handle unexpected response
        Helpers.toast("success", "Data Stored Successfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Helpers.toast("error", error.response.data.message);
      // Handle error here
    }
  };
  const insertTag = (tag) => {
    // Append the tag within square brackets to the current heading
    setHeading((prevHeading) => `${prevHeading}[${tag}]`);
  };
  return (
    <div>
      <div className="nk-main">
        <Sidebar />
        <div className="nk-wrap">
          <div className="nk-content">
            <div className="container-xl">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  <div className="nk-block-head nk-page-head">
                    <div className="nk-block-head-between">
                      <div className="nk-block-head-content">
                        <h2 className="display-6">Add new Template</h2>
                      </div>
                    </div>
                  </div>
                  {/* <form> */}

                  <div className="row">
                    <div className="card shadown-none col-md-8">
                      <div className="card-body">
                        <div className="row g-3 gx-gs">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="exampleFormControlInputText2"
                                className="form-label"
                              >
                                Add Title
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Name"
                                  name="template_name"
                                  value={template_name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="exampleFormControlInputText2"
                                className="form-label"
                              >
                                Add Greetings
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Greetings"
                                  name="greetings"
                                  value={greetings}
                                  onChange={(e) => setGreetings(e.target.value)}
                                />
                              </div>
                            </div>
                          </div> */}
                          <div className="mb-2">
                            <button
                              onClick={() => insertTag("SenderName")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Sender Name
                            </button>
                            <button
                              onClick={() => insertTag("ReceiverName")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Receiver Name
                            </button>
                            <button
                              onClick={() => insertTag("SenderEmail")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Sender Email
                            </button>
                            <button
                              onClick={() => insertTag("SenderPhone")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Sender Phone
                            </button>
                            <button
                              onClick={() => insertTag("SenderAddress")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Sender Address
                            </button>
                            <button
                              onClick={() => insertTag("Collection")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Collection Name
                            </button>
                            <button
                              onClick={() => insertTag("Model")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Model Name
                            </button>
                            <button
                              onClick={() => insertTag("Link")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Link
                            </button>
                            <button
                              onClick={() => insertTag("Image")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Image
                            </button>
                            <button
                              onClick={() => insertTag("Features")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Features
                            </button>
                            <button
                              onClick={() => insertTag("Benefits")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Benefits
                            </button>
                            <button
                              onClick={() => insertTag("Store")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Store
                            </button>
                            <button
                              onClick={() => insertTag("Location")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Location
                            </button>
                            <button
                              onClick={() => insertTag("Price")}
                              className="btn btn-secondary m-1 flex-1 py-2"
                            >
                              Price
                            </button>
                            <button
                              onClick={() => insertTag("Stock")}
                              className="btn btn-secondary flex-1 py-2"
                            >
                              Stock
                            </button>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="exampleFormControlInputText1"
                                className="form-label"
                              >
                                Add Template
                              </label>
                              <div className="form-control-wrap">
                                <textarea
                                  cols="30"
                                  rows="10"
                                  className="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Body"
                                  name="heading"
                                  value={heading}
                                  onChange={(e) => setHeading(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="exampleFormControlInputText2"
                                className="form-label"
                              >
                                Add Footer
                              </label>
                              <div className="form-control-wrap">
                                <textarea
                                  id=""
                                  cols="20"
                                  rows="10"
                                  className="form-control"
                                  placeholder="Enter Footer"
                                  name="footer"
                                  value={footer}
                                  onChange={(e) => setFooter(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="exampleFormControlInputText2"
                                className="form-label"
                              >
                                Add Links
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Links"
                                  name="links"
                                  value={links}
                                  onChange={(e) => setLinks(e.target.value)}
                                />
                              </div>
                            </div>
                          </div> */}
                          <div className="col-md-12">
                            <div
                              className="form-group"
                              style={{ marginTop: "2%" }}
                            >
                              <div className="form-control-wrap">
                                <button
                                  className="btn "
                                  style={{
                                    background: "#3F3EED",
                                    color: "white",
                                  }}
                                  onClick={handleSubmit}
                                >
                                  Add New
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadown-none col-md-4">
                      <div className="card-body">
                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{
                              border: "1px solid gray",
                              padding: "15px",
                              borderRadius: "5px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              className="form-group"
                              style={{ marginTop: "2%" }}
                            >
                              <div className="form-control-wrap">
                                <p>{template_name}</p>
                                <h3>{greetings}</h3>
                                <p>{heading}</p>
                                <b>
                                  <p>{footer}</p>
                                </b>
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newtemplate;
