import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "./Components/Sidebar";
import Helpers from "../../Config/Helpers";

function TemplateUpdate() {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const [templateDetails, setTemplateDetails] = useState({
        heading: "",
        template_name: "",
    });

    useEffect(() => {
        const fetchTemplateDetails = async () => {
            try {
                const response = await axios.get(`${Helpers.apiUrl}admin/mail_templates/${templateId}`, Helpers.authHeaders);
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
        e.preventDefault();
        try {
            const response = await axios.put(`${Helpers.apiUrl}admin/mail_templates/${templateId}`, templateDetails, Helpers.authHeaders);
            if (response.status === 200 || response.status === 204) {
                Helpers.toast("success", 'Template updated successfully');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error("Failed to update template", error);
        }
    };

    const insertTag = (tag) => {
        setTemplateDetails(prevState => ({
            ...prevState,
            heading: `${prevState.heading}[${tag}]`,
        }));
    };

    return (
        <div>
            <Sidebar />
            <div className="nk-wrap">
                <div className="nk-content">
                    <div className="container-xl">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-page-head">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h2 className="display-6">Update Template</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card shadow-none col-md-8">
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
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group" style={{ marginTop: "2%" }}>
                                                        <div className="form-control-wrap">
                                                            <button
                                                                className="btn"
                                                                style={{ background: "#3F3EED", color: "white" }}
                                                                onClick={handleSubmit}
                                                            >
                                                                Update Template
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateUpdate;
