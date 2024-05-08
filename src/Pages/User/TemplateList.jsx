import { useEffect, useState } from "react";
import Sidebar from '../../Components/Sidebar'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from '../../Config/Helpers';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TemplateList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplate] = useState(null);

  const handleUpdate = (templateId) => {
    navigate(`/user/templates/update/${templateId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        const response = await axios.get(`${baseUrl}admin/mail_templates`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleDelete = async (templateId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this template?</p>
        <button onClick={() => confirmDelete(templateId)} style={{ marginRight: '20px', color: 'red' }}>OK</button>
        <button onClick={() => toast.dismiss()} style={{ marginRight: '20px', color: 'blue' }}>Cancel</button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
        transition: Slide,
      }
    );
  };

  const confirmDelete = async (templateId) => {
    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${baseUrl}admin/mail_templates/${templateId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div className="flex h-screen bg-[#ebe9e9]">
      <Sidebar />
      <div className="container bg-white p-8 shadow-lg">
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
}
