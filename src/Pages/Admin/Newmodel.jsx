import React from "react";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { useNavigate } from "react-router-dom";
function Newmodel() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      slug,
    };
    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${baseUrl}collect-create`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Data submitted successfully");
        navigate("admin/models");
        // alert("Data Stored Successfully")

        // Handle success
      } else {
        console.log("Received non-200 response:", response.status);
        Helpers.toast("success", "Data Stored Successfully");
        navigate("/admin/models");
        window.location.reload();
        // Handle unexpected response
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error here
    }
  };
  return (
    <div>
      <div className="nk-main">
        <Sidebar />
        <div className="nk-wrap">
          <div class="nk-content">
            <div class="container-xl">
              <div class="nk-content-inner">
                <div class="nk-content-body">
                  <div class="nk-block-head nk-page-head">
                    <div class="nk-block-head-between">
                      <div class="nk-block-head-content">
                        <h2 class="display-6">Add new Collection</h2>
                      </div>
                    </div>
                  </div>
                  <div class="card shadown-none">
                    <form onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="row g-3 gx-gs">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText1"
                                class="form-label"
                              >
                                Enter Name
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Collection Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText1"
                                class="form-label"
                              >
                                Enter Slug
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Slug"
                                  value={slug}
                                  onChange={(e) => setSlug(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6">
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
                                >
                                  Add New
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newmodel;
