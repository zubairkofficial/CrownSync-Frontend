import React from "react";
import Sidebar from "./Components/Sidebar";
import { Link,useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";
import { useEffect, useState } from "react";
function Models() {
  const navigate = useNavigate();

  const handleUpdate = (modeleId) => {
    navigate(`/admin/models/update/${modeleId}`);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollection] = useState(null);

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

        console.log("response",response.data.data)

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

  const handleDelete = async (templateId) => {
    if (window.confirm("Are you sure you want to delete this Collection?")) {
      const baseUrl = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `${baseUrl}collects/${templateId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Collection deleted successfully");
          // Optionally, refresh your templates list here
          window.location.reload();
          // navigate('admin/models')
        }
      } catch (error) {
        console.error("An error occurred during deletion:", error);
        // Handle the error appropriately
      }
    }
  };
  return (
    <div className="nk-main">
      <Sidebar />
      <div className="nk-wrap">
        <div class="nk-content">
          <div class="container-xl">
            <div class="nk-content-inner">
              <div class="nk-content-body">
                <div class="nk-block-head nk-page-head">
                  <div class="nk-block-head-between">
                    <div class="nk-block-head-content"></div>
                  </div>
                </div>
                <div class="nk-block">
                  <div class="row g-gs"></div>
                </div>
                <div class="nk-block-head">
                  <div class="nk-block-head-between">
                    <div class="nk-block-head-content">
                      <h2 class="display-6">Recent Collections</h2>
                    </div>
                    <div class="nk-block-head-content">
                      <Link to="/admin/newmodel" class="btn " style={{background:"#3F3EED",color:"white"}}>
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="nk-block">
                  <div class="card">
                  <table class="table table-middle mb-0">
                      <thead class="table-light">
                        <tr>
                          <th class="tb-col">
                            <h6 class="overline-title">Id</h6>
                          </th>
                          <th class="tb-col tb-col-sm">
                            <h6 class="overline-title">Name</h6>
                          </th>
                          <th class="tb-col tb-col-md">
                            <h6 class="overline-title">Slug</h6>
                          </th>
                          <th class="tb-col tb-col-md">
                            <h6 class="overline-title">Action</h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {collections &&
                              collections.map((collection, index) => (
                        <tr key={collection.id || index}>
                          <td class="tb-col">
                            <div class="caption-text">
                            {collection.id}
                            </div>
                          </td>
                          <td class="tb-col">
                            <div class="caption-text">
                              {collection.name}
                            </div>
                          </td>
                          
                          <td class="tb-col">
                            <div class="caption-text">
                              {collection.slug}
                            </div>
                          </td>
                          
                          <td class="tb-col">
                                <div
                                  className="action-icons"
                                  style={{ fontSize: "20px" }}
                                >
                                  {/* <em
                                    class="icon ni ni-edit"
                                    onClick={() => handleUpdate(collection.id)}
                                    style={{cursor: 'pointer'}}
                                  ></em> */}
                                  <i class="fa-regular fa-pen-to-square" onClick={() => handleUpdate(collection.id)}
                                    style={{cursor: 'pointer',paddingRight:"6%"}}></i>
                                    <i className="fa-light fa-trash-can" onClick={() => handleDelete(collection.id)}
                                    style={{cursor: 'pointer'}}></i>
                                  {/* <em
                                    class="icon ni ni-clock"
                                    onClick={() => handleDelete(collection.id)}
                                    style={{cursor: 'pointer'}}
                                  ></em> */}
                                </div>
                              </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Models;
