import React from 'react'
import Sidebar from "./Components/Sidebar";
import { useParams,useNavigate  } from "react-router-dom";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Helpers from "../../Config/Helpers";
function ModelUpdate() {
    const { modeleId } = useParams();
    const [templateDetails, setTemplateDetails] = useState({
        name: "", // Set initial state as an empty string instead of undefined or null
        slug: "",
      });
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchTemplateDetails = async () => {
            try {
              const response = await axios.get(`${Helpers.apiUrl}collects/${modeleId}`, Helpers.authHeaders);
              const data = response.data.data;
              console.log(response.data)
              setTemplateDetails({
                name: data.name || "",
                slug: data.slug || "",
              });
            } catch (error) {
              console.error("Failed to fetch template details", error);
            }
          };
          
  
      fetchTemplateDetails();
    }, [modeleId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTemplateDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${Helpers.apiUrl}collects/${modeleId}`, templateDetails, Helpers.authHeaders);
        if (response.status === 200 || response.status === 204) {
          Helpers.toast("success",'Collection updated successfully');
          // navigate('/admin/models'); // Update with actual path
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to update template", error);
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
                        <h2 class="display-6">Update Collection</h2>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="card shadown-none">
                      <div class="card-body">
                        <div class="row g-3 gx-gs">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Name
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Name"
                                  name="name"
                                  value={templateDetails.name}
                                  onChange={handleChange}
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
                                Update Slug
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Slug"
                                  name="slug"
                                  value={templateDetails.slug}
                                  onChange={handleChange}
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
                                  type="submit"
                                  style={{background:"#3F3EED",color:"white"}}
                                >
                                  Update 
                                </button>
                              </div>
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
  )
}

export default ModelUpdate