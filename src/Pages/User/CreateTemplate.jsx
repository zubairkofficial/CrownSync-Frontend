import React ,{ useState,useRef  } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
function CreateTemplate() {
    const [greetings, setGreetings] = useState("");
    const [template_name, setName] = useState("");
    const [heading, setHeading] = useState("");
    const [footer, setFooter] = useState("");
    const [links, setLinks] = useState("");
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!template_name.trim() || !heading.trim()) {
            Helpers.toast("error", "Please fill in all required fields.");
            return; // Stop the function if validation fails
        }

        const formData = {
            greetings,
            heading,
            template_name,
            footer,
            links,
        };

        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `${baseUrl}admin/mail_templates`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Check if the status code is within the 2xx success range
            if (response.status >= 200 && response.status < 300) {
                Helpers.toast("success", "Template Data Stored Successfully");
                // navigate("/admin/dashboard");
                setGreetings("");
                setName("");
                setHeading("");
                setFooter("");
                setLinks("");
                window.history.back();
            } else {
                Helpers.toast("error", "Failed to store data, please try again.");
                console.log("Received non-2xx response:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            Helpers.toast("error", error.response?.data?.message || "An unexpected error occurred.");
        }
    };


    // const insertTag = (tag) => {
    //     // Append the tag within square brackets to the current heading
    //     setHeading((prevHeading) => `${prevHeading}[${tag}]`);
    // };
    const insertTag = (tag) => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const newHeading =
                heading.slice(0, startPos) + `[${tag}]` + heading.slice(endPos);
            setHeading(newHeading);
            // Set cursor position after inserted tag
            setTimeout(() => {
                textarea.setSelectionRange(startPos + `[${tag}]`.length, startPos + `[${tag}]`.length);
            }, 0);
        }
    };
    return (
        <>
            {/* <Sidebar /> */}
            <div className="flex text-gray-900 h-[100vh] ">
                <Sidebar />
                <div className="container p-8" style={{
          borderRadius: "20px",
          background: "#F9F9F9",
          marginTop: "2%",
        }}>
                    <div className=" p-3 !bg-[#F9F9F9]">

                        {/* <div className="nk-main border-2 ">

                    <div className="nk-wrap"> */}
                        <div className="nk-content">
                            {/* <div className="container-xl"> */}
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                    <div className="nk-block-head nk-page-head">
                                        <div className="nk-block-head-between">
                                            <div className="row w-full">
                                                <div className="nk-block-head-content flex justify-between items-center w-ful p-4">
                                                    {/* Left side: "Create Template" title */}
                                                    <div className="flex items-cente">
                                                        <h2 className="display-6">Create Template</h2>
                                                    </div>

                                                    {/* Right side: "Back" button */}
                                                    <div >
                                                        <button onClick={() => window.history.back()} className="btn bg-[#E2545E] hover:bg-[#df7980] py-2 px-3 !text-white hover:text-gray-900 focus:outline-none">
                                                            Back
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <form> */}

                                    <div className="row">
                                        <div className="card col-md-8 bg-[#F9F9F9]">
                                            <div className="card-body ">
                                                <div className="row g-3 gx-gs">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleFormControlInputText2"
                                                                className="form-label"
                                                            >
                                                                Add Title
                                                            </label>
                                                            <div className="form-control-wrap">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="exampleFormControlInputText2"
                                                                    placeholder="Enter Name"
                                                                    name="template_name"
                                                                    value={template_name}
                                                                    onChange={(e) => setName(e.target.value)}
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
                                                        <h1 className="my-1">OUT OF STOCK</h1>
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
                                                            onClick={() => insertTag("Price")}
                                                            className="btn btn-secondary m-1 flex-1 py-2"
                                                        >
                                                            Price
                                                        </button>
                                                        <h1 className="MY-1">IN STOCK MODEL</h1>
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
                                                            onClick={() => insertTag("Price")}
                                                            className="btn btn-secondary m-1 flex-1 py-2"
                                                        >
                                                            Price
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
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleFormControlInputText1"
                                                                className="form-label"
                                                            >
                                                                Add Template
                                                            </label>
                                                            <div className="form-control white-space text-wrap">
                                                                <textarea
                                                                    cols="30"
                                                                    rows="10"
                                                                    className="form-control"
                                                                    id="exampleFormControlInputText1"
                                                                    placeholder="Enter Body"
                                                                    name="heading"
                                                                    value={heading}
                                                                    onChange={(e) => setHeading(e.target.value)}
                                                                    ref={textareaRef}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-12">
                                                        <div
                                                            className="form-group"
                                                            style={{ marginTop: "2%" }}
                                                        >
                                                            <div className="form-control-wrap">
                                                                <button
                                                                    className="btn "
                                                                    style={{
                                                                        background: "#E2545E",
                                                                        color: "white",
                                                                    }}
                                                                    onClick={handleSubmit}
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadown-none col-md-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div
                                                        className="col-md-12"
                                                        style={{
                                                            border: "1px solid gray",
                                                            padding: "15px",
                                                            borderRadius: "5px",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <div
                                                            className="form-group"
                                                            style={{ marginTop: "2%", whiteSpace:"pre-wrap"}}
                                                        >
                                                            <div className="form-control-wrap">
                                                                <p>{template_name}</p>
                                                                <h3>{greetings}</h3>
                                                                <p>{heading}</p>
                                                                <b>
                                                                    <p>{footer}</p>
                                                                </b>
                                                                <p></p>
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
                    {/* </div>
                </div> */}
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default CreateTemplate;
