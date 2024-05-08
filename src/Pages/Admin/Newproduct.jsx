import React from "react";
import Sidebar from "./Components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { useNavigate } from "react-router-dom";
function Newproduct() {
  const [collection_id, setCollection] = useState("");

  // const [collections, setCollection] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const navigate = useNavigate();
  // Handle change in selection
  const handleSelectionChange = (event) => {
    setSelectedCollectionId(event.target.value);
    console.log(selectedCollectionId)
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        // const data = {}; // Your request payload
        // Retrieve token if needed
        const token = localStorage.getItem("token");
        console.log("token", token);
        const response = await axios.get(`${baseUrl}collects`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response", response.data.data);

        if (response.status === 200) {
          // console.log(response.data.user);
          // Assuming you want to store the emails in state
          setCollection(response.data.data);

          // Redirect or perform further actions
          console.log(response.data);
        } else {
          console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle error
        if (error.response) {
          // Server responded with a status code outside 2xx range
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          // No response was received to the request
          console.error("No response received:", error.request);
        } else {
          // An error occurred in setting up the request
          console.error("Error message:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [store, setStore] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [benefit, setBenefit] = useState("");
  const [feature, setFeature] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Use FormData to handle file uploads
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("store", store);
    formData.append("link", link);
    formData.append("store", store);
    formData.append("benefits", benefit);
    formData.append("features", feature);
    formData.append("location", location);
    formData.append("collection_id", selectedCollectionId);
    if (image) formData.append("image", image); // Append file if selected

    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${baseUrl}rolex_models`, formData, {
        // Adjust the URL as needed
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          // Don't manually set 'Content-Type' for FormData, let the browser set it
        },
      });

      if (response.status === 200) {
        Helpers.toast("success","Data Stored Successfully");
        navigate('/admin/products')
        // Redirect or perform additional actions here
      } else {
        Helpers.toast("success","Data Stored Successfully");
        navigate('/admin/products')
      }
    } catch (error) {
      console.error("An error occurred:", error.response || error.message);
      // Handle specific error here (e.g., show message to the user)
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
                        <h2 class="display-6">Add new Model</h2>
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
                                Enter Collection
                              </label>
                              {/* <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Collection Id"
                                  value={collection_id}
                                  onChange={(e) =>
                                    setCollection(e.target.value)
                                  }
                                />
                              </div> */}
                              <div class="form-control-wrap">
                                <select
                                  className="form-select"
                                  id="exampleFormControlInputText5"
                                  aria-label="Default select example"
                                  onChange={handleSelectionChange} // Added onChange handler
                                  value={selectedCollectionId} // Controlled component
                                >
                                  <option value="">
                                    Open this select menu
                                  </option>
                                  {collection_id &&
                                    collection_id.map((collection, index) => (
                                      <option
                                        key={collection.id || index}
                                        value={collection.id}
                                      >
                                        {collection.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText1"
                                class="form-label"
                              >
                                Enter Product Name
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Name"
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
                                  placeholder="Enter Product Slug"
                                  value={slug}
                                  onChange={(e) => setSlug(e.target.value)}
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
                                Enter Price
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Price"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
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
                                Enter Stock
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Stock"
                                  value={stock}
                                  onChange={(e) => setStock(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                for="exampleFormControlInputText6"
                                class="form-label"
                              >
                                Select image
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  className="form-control"
                                  type="file"
                                  name="image"
                                  id="exampleFormControlInputText6"
                                  onChange={(e) => setImage(e.target.files[0])} // Adjusted to target files[0]
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
                                Enter Store
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Store"
                                  value={store}
                                  onChange={(e) => setStore(e.target.value)}
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
                                Enter Location
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Location"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
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
                                Enter Link
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Link"
                                  value={link}
                                  onChange={(e) => setLink(e.target.value)}
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
                                Enter Benefits
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Benefits"
                                  value={benefit}
                                  onChange={(e) => setBenefit(e.target.value)}
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
                                Enter Features
                              </label>
                              <div class="form-control-wrap">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInputText1"
                                  placeholder="Enter Product Features"
                                  value={feature}
                                  onChange={(e) => setFeature(e.target.value)}
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
                                <button className="btn " style={{background:"#3F3EED",color:"white"}}>
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

export default Newproduct;
