import React from "react";
import Sidebar from "./Components/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Helpers from "../../Config/Helpers";
import axios from "axios";
import { useEffect, useState } from "react";
function Dashboard() {
  const navigate = useNavigate();

  const handleUpdate = (templateId) => {
    navigate(`/admin/templates/update/${templateId}`);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        // const data = {}; // Your request payload
        // Retrieve token if needed
        // console.log("token", token);
        const response = await axios.get(`${baseUrl}admin/mail_templates`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("response", response.data.data);

        if (response.status === 200) {
          // console.log(response.data.user);
          // Assuming you want to store the emails in state
          setTemplate(response.data.data);

          // Redirect or perform further actions
          // console.log(response.data);
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
    if (window.confirm("Are you sure you want to delete this template?")) {
      const baseUrl = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `${baseUrl}admin/mail_templates/${templateId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Template deleted successfully");
          // Optionally, refresh your templates list here
          window.location.reload();
          // navigate('admin/dashboard')
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
        <div className="nk-content">
          <div className="container-xl">
            <div className="nk-content-inner">
              <div className="nk-content-body">
                <div className="nk-block-head nk-page-head">
                  <div className="nk-block-head-between">
                    <div className="nk-block-head-content">
                      {/* <h2 className="display-6">Welcome Admin!</h2> */}
                    </div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="row g-gs"></div>
                </div>
                <div className="nk-block-head">
                  <div className="nk-block-head-between">
                    <div className="nk-block-head-content">
                      <h2 className="display-6">Recent Templates</h2>
                    </div>
                    <div className="nk-block-head-content">
                      <Link to="/admin/newtemplate" className="btn" style={{background:"#3F3EED",color:"white"}}>
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="card">
                    <table className="table table-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="tb-col">
                            <h6 className="overline-title">Id</h6>
                          </th>
                          <th className="tb-col tb-col-sm">
                            <h6 className="overline-title">Name</h6>
                          </th>
                          {/* <th className="tb-col tb-col-sm">
                            <h6 className="overline-title">Greetings</h6>
                          </th> */}
                          <th className="tb-col tb-col-md">
                            <h6 className="overline-title">Headings</h6>
                          </th>
                          {/* <th className="tb-col tb-col-md">
                            <h6 className="overline-title">Footer</h6>
                          </th> */}
                          {/* <th className="tb-col tb-col-md">
                            <h6 className="overline-title">Links</h6>
                          </th> */}
                          <th className="tb-col tb-col-md">
                            <h6 className="overline-title">Action</h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {templates &&
                          templates.map((template, index) => (
                            <tr key={template.id || index}>
                              <td className="tb-col">
                                <div className="caption-text">{template.id}</div>
                              </td>
                              <td className="tb-col">
                                <div className="caption-text">
                                  {template.template_name}
                                </div>
                              </td>
                              {/* <td className="tb-col">
                                <div className="caption-text">
                                  {template.greetings}
                                </div>
                              </td> */}

                              <td className="tb-col">
                                <div className="caption-text">
                                  {template.heading.split(" ")
                                    .slice(0, 7)
                                    .join(" ")}{".."}
                                </div>
                              </td>

                              {/* <td className="tb-col">
                                <div className="caption-text">
                                  {template.footer.split(" ")
                                    .slice(0, 7)
                                    .join(" ")}{".."}
                                </div>
                              </td> */}

                              {/* <td className="tb-col">
                                <div className="caption-text">{template.links.split(" ")
                                    .slice(0, 7)
                                    .join(" ")}</div>
                              </td> */}

                              <td className="tb-col">
                                <div
                                  className="action-icons"
                                  style={{ fontSize: "20px",cursor: 'pointer' , padding:"3%" }}
                                  // style={{cursor: 'pointer'}}
                                >
                                  {/* <em
                                    className="icon ni ni-edit"
                                    onClick={() => handleUpdate(template.id)}
                                    style={{cursor: 'pointer'}}
                                  ></em> */}
                                  <i className="fa-regular fa-pen-to-square" onClick={() => handleUpdate(template.id)}
                                    style={{cursor: 'pointer' , paddingRight:"6%"}}></i>
                                  <i className="fa-regular fa-trash-can"  onClick={() => handleDelete(template.id)}
                                    style={{cursor: 'pointer' }}></i>
                                  {/* <em
                                    className="icon ni ni-clock"
                                    onClick={() => handleDelete(template.id)}
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

export default Dashboard;
