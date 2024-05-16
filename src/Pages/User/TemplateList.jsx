import { useEffect, useState } from "react";
import Sidebar from '../../Components/Sidebar'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from '../../Config/Helpers';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TemplateList = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplate] = useState(null);

  const handleUpdate = (templateId) => {
    navigate(`/user/templates/update/${templateId}`);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Helpers.apiUrl}admin/mail_templates`, Helpers.authHeaders);
      if (response.status === 200) {
        setTemplate(response.data.data);
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
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  useEffect(() => {
    if (activeTab === 'TemplateList') {   
        fetchData();
    }
}, [activeTab]);
  const handleDelete = async (templateId) => {
    try {
      const response = await axios.delete(`${Helpers.apiUrl}admin/mail_templates/${templateId}`, Helpers.authHeaders);
      if (response.status === 200) {
        console.log("Template deleted successfully");
        toast.dismiss();
        Helpers.toast("success", "Data Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("An error occurred during deletion:", error);
      toast.dismiss();
      Helpers.toast("error", "An error occurred during deletion");
    }
  };


  return (
    <div className="flex">

      <div className="container p-8 " style={{
          borderRadius: "20px",
          background: "#F9F9F9",
          marginTop: "2%",
        }}>
        <div className="row w-full">
          <div className="nk-block-head-content flex justify-between items-center w-full p-4">
            <div className="flex items-center">
              <h2 className="display-6">User's Template</h2>
            </div>

            <div>
              <Link
                to="/user/create-template"
                className="btn btn-sm"
                style={{ background: "#E2545E", color: "white" }}
              >
                Add New
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
        <div className="nk-block">
          <div className="card p-2">
            <table className="table table-middle mb-0 p-2">
              <thead className="table-light p-2">
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
              <tbody className=" p-2">
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

                      {/* <td className="tb-col">
                        <div className="caption-text">
                          {template.heading.split(" ")
                            .slice(0, 7)
                            .join(" ")}{".."}
                        </div>
                      </td> */}
                      <td className="tb-col">
                        <div className="caption-text">
                          {template.heading && typeof template.heading === 'string'
                            ? `${template.heading.split(" ").slice(0, 7).join(" ")}..`
                            : ""}
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
                          style={{ fontSize: "20px", cursor: 'pointer', padding: "3%" }}
                        // style={{cursor: 'pointer'}}
                        >
                          {/* <em
                                    className="icon ni ni-edit"
                                    onClick={() => handleUpdate(template.id)}
                                    style={{cursor: 'pointer'}}
                                  ></em> */}
                          <i className="fa-regular fa-pen-to-square" onClick={() => handleUpdate(template.id)}
                            style={{ cursor: 'pointer', paddingRight: "6%" }}></i>
                          <i className="fa-regular fa-trash-can" onClick={() => handleDelete(template.id)}
                            style={{ cursor: 'pointer' }}></i>
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
  )
};

export default TemplateList;
