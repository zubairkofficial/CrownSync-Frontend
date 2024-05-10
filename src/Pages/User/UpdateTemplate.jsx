import React, { useState, useEffect,useRef  } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
export default function UpdateTemplate() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [templateDetails, setTemplateDetails] = useState({
    heading: "",
    template_name: "",
  });
  useEffect(() => {
    const fetchTemplateDetails = async () => {
      const baseUrl = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseUrl}admin/mail_templates/${templateId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.data) {
          const { data } = response.data;
          setTemplateDetails({
            heading: data.heading || "",
            template_name: data.template_name || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch template details", error);
      }
    };

    fetchTemplateDetails();
  }, [templateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the typo
    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(
            `${baseUrl}admin/mail_templates/${templateId}`,
            templateDetails,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 204) {
            Helpers.toast("success", 'Template updated successfully');
            window.history.back();
        }
    } catch (error) {
        console.error("Failed to update template", error);
        Helpers.toast("error", 'Failed to update template');
    }
};


  const insertTag = (tag) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newHeading =
        templateDetails.heading.slice(0, startPos) + `[${tag}]` + templateDetails.heading.slice(endPos);
      setTemplateDetails((prevState) => ({
        ...prevState,
        heading: newHeading,
      }));
      setTimeout(() => {
        textarea.setSelectionRange(startPos + `[${tag}]`.length, startPos + `[${tag}]`.length);
      }, 0);
    }
  };

  return (
    <div className="flex h-[100%] ">
      <Sidebar />
      <div className="container p-8" style={{
          borderRadius: "20px",
          background: "#F9F9F9",
          marginTop: "2%",
        }}>
        <div className="row w-full">
          <div className="nk-block-head-content flex justify-between items-center w-full p-4">
            <div className="flex items-cente">
              <h2 className="display-6">Update Template</h2>
            </div>

            {/* <div >
                <Link to="/user/create-template" className="btn btn-sm" style={{background:"#E2545E",color:"white"}}>
                Add New
              </Link>
                   
                </div> */}

          </div>
        </div>
        <div className="row">
          <div className="card shadow-none col-md-8 !bg-[#F9F9F9]">
            <div className="card-body">
              <div className="row g-3 gx-gs">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInputText2" className="form-label">
                      Update Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInputText2"
                        placeholder="Enter Name"
                        name="template_name"
                        value={templateDetails.template_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <button
                    onClick={() => insertTag("MyName")}
                    className="btn btn-secondary m-1 flex-1 py-2"
                  >
                    My Name
                  </button>
                  <button
                    onClick={() => insertTag("ClientName")}
                    className="btn btn-secondary m-1 flex-1 py-2"
                  >
                    Client Name
                  </button>
                  <button
                    onClick={() => insertTag("MyEmail")}
                    className="btn btn-secondary m-1 flex-1 py-2"
                  >
                    My Email
                  </button>
                  <button
                    onClick={() => insertTag("MyPhone")}
                    className="btn btn-secondary m-1 flex-1 py-2"
                  >
                    My Phone
                  </button>
                  <button
                    onClick={() => insertTag("Address")}
                    className="btn btn-secondary m-1 flex-1 py-2"
                  >
                    Store Address
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
                    <label htmlFor="exampleFormControlInputText1" className="form-label">
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
                        value={templateDetails.heading}
                        onChange={handleChange}
                        ref={textareaRef}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group" style={{ marginTop: "2%" }}>
                    <div className="form-control-wrap">
                      <button
                        className="btn"
                        style={{ background: "#E2545E", color: "white" }}
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow-none col-md-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12" style={{ border: "1px solid gray", padding: "15px", borderRadius: "5px", overflow: "hidden" }}>
                  <div className="form-group" style={{ marginTop: "2%" }}>
                    <div className="form-control-wrap">
                      <p>{templateDetails.template_name}</p>
                      <p>{templateDetails.heading}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
