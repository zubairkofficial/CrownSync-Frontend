import React from 'react'
import Sidebar from "./Components/Sidebar";
import { useParams,useNavigate  } from "react-router-dom";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Helpers from "../../Config/Helpers";

function Productupdate() {
    const { productId } = useParams();
    const [templateDetails, setTemplateDetails] = useState({
        name: "", // Set initial state as an empty string instead of undefined or null
        slug: "",
        collection_id : "",
        price: "",
        stock : "",
        location : "",
        store : ""
      });
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchTemplateDetails = async () => {
            const baseUrl = Helpers.apiUrl;
            const token = localStorage.getItem("token");
            try {
              const response = await axios.get(`${baseUrl}rolex_models/${productId}`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              const data = response.data.data;
              console.log(response.data)
              setTemplateDetails({
                name: data.name || "",
                slug: data.slug || "",
                collection_id: data.collection_id || "",
                price: data.price || "",
                stock: data.stock || "",
                location: data.location || "",
                store: data.store || "",
              });
            } catch (error) {
              console.error("Failed to fetch template details", error);
            }
          };
          
  
      fetchTemplateDetails();
    }, [productId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTemplateDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const baseUrl = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(`${baseUrl}rolex_models/${productId}`, templateDetails, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 || response.status === 204) {
          Helpers.toast("success",'Product updated successfully');
          navigate('/admin/products'); // Update with actual path
        }
      } catch (error) {
        console.error("Failed to update Product", error);
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
                        <h2 class="display-6">Update Model</h2>
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
                                Update Collection Id
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Greetings"
                                  name="greetings"
                                  value={templateDetails.collection_id}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
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
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Price
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Price"
                                  name="price"
                                  value={templateDetails.price}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Stock
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Links"
                                  name="stock"
                                  value={templateDetails.stock}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Store
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Links"
                                  name="store"
                                  value={templateDetails.store}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Location
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Links"
                                  name="location"
                                  value={templateDetails.location}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText2"
                                class="form-label"
                              >
                                Update Image
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="file"
                                  class="form-control"
                                  id="exampleFormControlInputText2"
                                  placeholder="Enter Links"
                                  // name="location"
                                  // value={templateDetails.location}
                                  // onChange={handleChange}
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
                                  className="btn " style={{background:"#3F3EED",color:"white"}}
                                  type="submit"
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

export default Productupdate