import React from "react";
import Header from "./../../Components/Header";
import Sidebar from "./../../Components/Sidebar";
import Footer from "./../../Components/Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Helpers from "../../Config/Helpers";
function Template() {
  const [isLoading, setIsLoading] = useState(false);

  const [collection_id, setCollection] = useState("");
  // const [templateid, setCollection] = useState("");
  // const [templates, setTemplate] = useState(null);
  const [emailData, setEmailData] = useState(null);
  let { messageId } = useParams();
  console.log(messageId);
  // const [selectedTemplate, setSelectedTemplate] = useState("");

  // Define the onChange handler
  // const handleTemplateChange = (event) => {
  //   setSelectedTemplate(event.target.value);

  // };

  // Log selectedTemplate whenever it changes
  // useEffect(() => {
  //   console.log("Selected Template:", selectedTemplate);
  // }, [selectedTemplate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        // Fetch all email messages
        const response = await axios.get(`${baseUrl}email-messages`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Filter the email messages locally based on messageId
          const emailMessage = response.data.find(
            (email) => email.headers["Message-ID"] === messageId
          );
          if (emailMessage) {
            setEmailData(emailMessage);
            console.log("Email data:", emailMessage);
          } else {
            console.log("Email with messageId not found.");
          }
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
  }, [messageId]); // Fetch data whenever messageId changes
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false); // Ensure you have this state defined if you're using it

  // Fetch templates from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl; // Make sure this is defined
        const token = localStorage.getItem("token");

        const response = await axios.get(`${baseUrl}admin/mail_templates`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTemplates(response.data.data); // Assuming the data is in the format you expect
        } else {
          console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTemplateChange = (event) => {
    setSelectedTemplateId(event.target.value);
  };

  // Correctly find the selected template using the updated selectedTemplateId state
  const selectedTemplate = templates.find(
    (template) => String(template.id) === String(selectedTemplateId)
  );

  // Define the onChange handler for the select dropdown
  // const handleTemplateChange = (event) => {
  //   setSelectedTemplateId(event.target.value);
  //   console.log("From select",selectedTemplateId['greetings'])
  // };
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        // const data = {}; // Your request payload
        // Retrieve token if needed
        console.log("token", token);
        const response = await axios.get(`${baseUrl}rolex_models`, {
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
          console.log(response.data);
          setProducts(response.data.data);

          // Redirect or perform further actions
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

  const userJson = localStorage.getItem("user");

  // Parse the JSON string to an object
  const user = JSON.parse(userJson);

  // Access the email property of the user object
  const userEmail = user ? user.name : null;

  console.log(userEmail);

  //location

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        // const data = {}; // Your request payload
        // Retrieve token if needed
        console.log("token", token);
        const response = await axios.get(`${baseUrl}rolex_models`, {
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
          console.log(response.data);
          setLocation(response.data.data);

          // Redirect or perform further actions
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

  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  // Handle change in selection
  const handleSelectionChange = (event) => {
    setSelectedCollectionId(event.target.value);
    console.log(selectedCollectionId);
  };

  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };
  // Find the selected product based on selectedProductId
  // Ensure products is an array before calling .find
  const selectedProduct = products?.find(
    (product) => String(product.id) === String(selectedProductId)
  );
  // const selectedTemplates = templates?.find(
  //   (template) => String(template.id) === String(setSelectedTemplateId)
  // );

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

  // For passing data in email preview section
  const [selectedGreetingText, setSelectedGreetingText] = useState("");

  const handleGreetingButton = (greetingText) => {
    setSelectedGreetingText(greetingText);
    console.log(greetingText); // Now this directly logs the greetings text
  };

  // For passing location Id
  const [locationId, setLocationId] = useState(null);

  const handleLocationButton = (location) => {
    setLocationId(location);
  };

  useEffect(() => {
    console.log(locationId);
  }, [locationId]);

  const [stock, setStock] = useState("");
  const handleStockChange = (status) => {
    setStock(status);
    console.log(stock);
  };

  const [showPreview, setShowPreview] = useState(false); // New state for toggling the preview
  const handleProceed = () => {
    // Toggle the visibility of the email preview section
    setShowPreview(true);
    console.log(showPreview);
  };
  const [resposne, setResponse] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    const user = JSON.parse(username);

    const myuser = user ? user.name : null;
    const myemail = user ? user.email : null;

    console.log("Usernaem", myuser);
    const fromField = "GitHub <noreply@github.com>";
    const match = fromField.match(/^(.*?)\s*<(.*)>$/);
    const reciever_name = match ? match[1] : ""; // This would be "GitHub"
    console.log(reciever_name);
    const reciever_email = match ? match[2] : fromField;
    console.log(reciever_email);
    const payload = {
      email_address: myemail,
      greeting: selectedGreetingText,
      reciever_name,
      reciever_email,
      template_id: selectedTemplateId,
      product_id: selectedProductId,
      responder_name: myuser,
    };

    try {
      const response = await axios.post(`${baseUrl}email-preview`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Response data:", response.data);
        // console.log("Body:", response.data.body);
        setResponse(response.data.body);
        Helpers.toast("success","Operation Successful");
      } else {
        console.log(
          "Operation not successful, response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleEmailSend = async (e) => {
    e.preventDefault();
    const baseUrl = Helpers.apiUrl;
    const token = localStorage.getItem("token");
    const formData = {
      response: resposne,
    };
    try {
      const response = await axios.post(
        `${baseUrl}gmail/send-email`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        Helpers.toast("success", response.data.message);
      } else {
        console.log("Not sending mail");
      }
    } catch (error) {
      console.error("Error in Sending Mail ", error);
    }
  };
  return (
    // <div className="nk-main">
    //   <Sidebar />
    //   <div className="nk-wrap">
    //     <Header />
    //     <div className="nk-content nk-content-empty">
    //       <div className="nk-editor">
    //         <div className="nk-editor-header">
    //           <div className="nk-editor-title">
    //             <h4 className="me-3 mb-0 line-clamp-1">Email Preview</h4>
    //             <ul className="d-inline-flex align-item-center">
    //               <li>
    //                 <button className="btn btn-sm btn-icon btn-zoom">
    //                   <em className="icon ni ni-pen"></em>
    //                 </button>
    //               </li>
    //               <li>
    //                 <button className="btn btn-sm btn-icon btn-zoom">
    //                   <em className="icon ni ni-star"></em>
    //                 </button>
    //               </li>
    //               <li className="d-xl-none me-n1">
    //                 <div className="dropdown">
    //                   <button
    //                     className="btn btn-sm btn-icon btn-zoom"
    //                     type="button"
    //                     data-bs-toggle="dropdown"
    //                   >
    //                     <em className="icon ni ni-menu-alt-r"></em>
    //                   </button>
    //                   <ul className="dropdown-menu">
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Action
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Another action
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Something else here
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="nk-editor-tools d-none d-xl-flex">
    //             <ul className="d-inline-flex gap gx-3">
    //               <li></li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="nk-editor-main">
    //           <div className="nk-editor-base">
    //             <ul className="nav nav-tabs nav-sm nav-tabs-s1 px-3">
    //               <li className="nav-item">
    //                 <button
    //                   className="nav-link active"
    //                   type="button"
    //                   data-bs-toggle="tab"
    //                   data-bs-target="#AI-Writer"
    //                 >
    //                   Email Preview
    //                 </button>
    //               </li>
    //             </ul>
    //             <div className="tab-content">
    //               <div className="tab-pane fade show active" id="AI-Writer">
    //                 <div className="p-4">
    //                   <div className="d-flex align-items-center justify-content-between">
    //                     <div className="d-flex align-items-center">
    //                       <div className="media media-xs media-middle media-circle text-primary bg-primary bg-opacity-20">
    //                         <em className="icon ni ni-pen-fill"></em>
    //                       </div>
    //                       <h5 className="fs-14px fw-normal ms-2">
    //                         Email Preview
    //                       </h5>
    //                     </div>
    //                     {/* <a href="#" className="link">
    //                       Edit Prompt
    //                     </a> */}
    //                   </div>
    //                   {resposne ? (
    //                     <pre>{resposne}</pre>
    //                   ) : (
    //                     showPreview && (
    //                       <div className="card bg-lighter shadow-none mt-3">
    //                         <div className="p-3">
    //                           <p className="small text-dark">
    //                             {selectedGreetingText || "Not selected"}
    //                             <br />
    //                             {selectedTemplate
    //                               ? selectedTemplate.greetings
    //                               : "Not selected"}{" "}
    //                             <br />
    //                             {selectedTemplate
    //                               ? selectedTemplate.heading
    //                               : "Not selected"}{" "}
    //                             <br />
    //                             {selectedTemplate
    //                               ? selectedTemplate.footer
    //                               : "Not selected"}
    //                             <br />
    //                             {locationId || "Not selected"}
    //                             <br /> {selectedCollectionId || "Not specified"}
    //                             <br />{" "}
    //                             {selectedProduct
    //                               ? selectedProduct.name
    //                               : "Not specified"}
    //                             <br />{" "}
    //                             {selectedProduct
    //                               ? selectedProduct.price
    //                               : "Not specified"}
    //                             <br />{" "}
    //                             {selectedProduct ? (
    //                               <img
    //                                 // src={selectedProduct.image}
    //                                 src={`${Helpers.basePath}/assets/${selectedProduct.image}`}
    //                                 alt={selectedProduct.name}
    //                                 style={{ maxWidth: "200px" }}
    //                               />
    //                             ) : (
    //                               "Not specified"
    //                             )}
    //                             <br />
    //                             {stock || "Not specified"}
    //                           </p>
    //                         </div>
    //                       </div>
    //                     )
    //                   )}
    //                   {/* // {resposne} */}
    //                   <div className="flex d-flex">
    //                   <form onSubmit={handleSubmit}>
    //                     {/* Your input fields here */}
    //                     <button
    //                       className="btn btn-md btn-primary rounded-pill d-block"
    //                       type="submit"
    //                     >
    //                       Check Preview
    //                     </button>
    //                   </form>
    //                   <form onSubmit={handleEmailSend}>
    //                     <button
    //                       className="btn btn-md btn-primary rounded-pill d-block"
    //                       type="submit"
    //                     >
    //                       Send Email
    //                     </button>
    //                   </form>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="nk-editor-body">
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   {emailData && (
    //                     <div>
    //                       <h5 className="fs-4 fw-medium">
    //                         {emailData.body &&
    //                           emailData.body.split(" ").slice(0, 10).join(" ")}
    //                       </h5>
    //                       <i>
    //                         <p style={{ paddingTop: "1%" }}>
    //                           From: {emailData.headers["From"]}
    //                         </p>
    //                       </i>
    //                       <small>
    //                         <p style={{ paddingTop: "1%" }}>
    //                           Date: {emailData.headers["Date"]}
    //                         </p>
    //                       </small>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Initial Greeting</h5>

    //                   <ul className="d-flex flex-wrap gap g-3">
    //                     <li>
    //                       <button
    //                         type="button"
    //                         className={
    //                           selectedGreetingText === "Good Morning"
    //                             ? "btn btn-secondary"
    //                             : "btn btn-outline-secondary"
    //                         }
    //                         onClick={() => handleGreetingButton("Good Morning")}
    //                       >
    //                         Good Morning
    //                       </button>
    //                     </li>
    //                     <li>
    //                       <button
    //                         type="button"
    //                         className={
    //                           selectedGreetingText === "Good Evening"
    //                             ? "btn btn-secondary"
    //                             : "btn btn-outline-secondary"
    //                         }
    //                         onClick={() => handleGreetingButton("Good Evening")}
    //                       >
    //                         Good Evening
    //                       </button>
    //                     </li>
    //                     <li>
    //                       <button
    //                         type="button"
    //                         className={
    //                           selectedGreetingText === "Good Afternoon"
    //                             ? "btn btn-secondary"
    //                             : "btn btn-outline-secondary"
    //                         }
    //                         onClick={() =>
    //                           handleGreetingButton("Good Afternoon")
    //                         }
    //                       >
    //                         Good Afternoon
    //                       </button>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Responder Name</h5>
    //                   <p>{userEmail}</p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Select Template</h5>
    //                   <div class="form-group">
    //                     <div class="form-control-wrap">
    //                       <select
    //                         className="form-select"
    //                         id="exampleFormControlInputText5"
    //                         aria-label="Default select example"
    //                         onChange={handleTemplateChange}
    //                         value={selectedTemplateId || ""}
    //                       >
    //                         <option value="">Open this select menu</option>
    //                         {templates.map((template) => (
    //                           <option key={template.id} value={template.id}>
    //                             {template.greetings}
    //                           </option>
    //                         ))}
    //                       </select>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Show Location</h5>
    //                   <ul class="d-flex flex-wrap gap g-3">
    //                     {location &&
    //                       location.map((location, index) => (
    //                         <li key={location.id}>
    //                           <button
    //                             type="button"
    //                             className={
    //                               locationId === location.location
    //                                 ? "btn btn-secondary"
    //                                 : "btn btn-outline-secondary"
    //                             }
    //                             onClick={() =>
    //                               handleLocationButton(location.location)
    //                             }
    //                           >
    //                             {location.location}
    //                           </button>
    //                         </li>
    //                       ))}
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Collections</h5>
    //                   <div class="form-group">
    //                     <div class="form-control-wrap">
    //                       <select
    //                         className="form-select"
    //                         id="exampleFormControlInputText5"
    //                         aria-label="Default select example"
    //                         onChange={handleSelectionChange} // Added onChange handler
    //                         value={selectedCollectionId} // Controlled component
    //                       >
    //                         <option value="">Open this select menu</option>
    //                         {collection_id &&
    //                           collection_id.map((collection, index) => (
    //                             <option
    //                               key={collection.id || index}
    //                               value={collection.id}
    //                             >
    //                               {collection.name}
    //                             </option>
    //                           ))}
    //                       </select>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Model Number</h5>
    //                   <div class="form-group">
    //                     <div class="form-control-wrap">
    //                       <select
    //                         className="form-select"
    //                         id="exampleFormControlInputText5"
    //                         aria-label="Default select example"
    //                         onChange={handleProductChange} // Added onChange handler
    //                         value={selectedProductId} // Controlled component
    //                       >
    //                         <option value="">
    //                           Open this to Select Model No
    //                         </option>
    //                         {products &&
    //                           products.map((product, index) => (
    //                             <option
    //                               key={product.id || index}
    //                               value={product.id}
    //                             >
    //                               {product.name}
    //                             </option>
    //                           ))}
    //                       </select>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexWrap: "nowrap",
    //                 justifyContent: "space-between",
    //                 marginBottom: "2%",
    //               }}
    //             >
    //               <div
    //                 class="card card-full shadow-none"
    //                 style={{ minWidth: 0, width: "100%" }}
    //               >
    //                 <div class="card-body">
    //                   <h5 class="fs-4 fw-medium">Inventroy Level</h5>
    //                   <ul class="d-flex flex-wrap gap g-3">
    //                     <li>
    //                       <button
    //                         type="button"
    //                         className={`btn ${
    //                           stock === "InStock"
    //                             ? "btn-secondary"
    //                             : "btn-outline-secondary"
    //                         }`}
    //                         onClick={() => handleStockChange("InStock")}
    //                       >
    //                         In stock
    //                       </button>
    //                     </li>
    //                     <li>
    //                       <button
    //                         type="button"
    //                         className={`btn ${
    //                           stock === "OutOfStock"
    //                             ? "btn-secondary"
    //                             : "btn-outline-secondary"
    //                         }`}
    //                         onClick={() => handleStockChange("OutOfStock")}
    //                       >
    //                         Out of stock
    //                       </button>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //             <button
    //               type="button"
    //               class="btn rounded-pill btn-primary btn-lg"
    //               onClick={handleProceed}
    //             >
    //               Proceed
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>
    // </div>
    <div className="card bg-white p-4 border border-gray-200 rounded-lg shadow sm:p-6">
      <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Initial Greeting
        </h1>
        <div className="flex flex-wrap gap-5 pt-2">
          <button
            className="flex-1    border-primary rounded-lg py-2"
            onClick={() => handleGreetingButton("Good Morning")}
            style={
              selectedGreetingText === "Good Morning"
                ? { background: "#E2545E", color: "white" }
                : { background: "#D9D9D9B2", color: "black" }
            }
          >
            Morning
          </button>
          <button
            className="flex-1   border-primary rounded-lg py-2"
            onClick={() => handleGreetingButton("Good Afternoon")}
            style={
              selectedGreetingText === "Good Afternoon"
                ? { background: "#E2545E", color: "white" }
                : { background: "#D9D9D9B2", color: "black" }
            }
          >
            Afternoon
          </button>
          <button
            className="flex-1   border-primary rounded-lg py-2"
            onClick={() => handleGreetingButton("Good Evening")}
            style={
              selectedGreetingText === "Good Evening"
                ? { background: "#E2545E", color: "white" }
                : { background: "#D9D9D9B2", color: "black" }
            }
          >
            Evening
          </button>
        </div>
      </div>

      <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Responder Name
        </h1>
        <div className="d-flex mt-2">
          <input
            type="text"
            className="form-control"
            // placeholder="M Zubair Khan"
            disabled
            value={userEmail}
            style={{ background: "#D9D9D9B2" }}
          />
        </div>
      </div>
      <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Store Location
        </h1>
        <div className="flex flex-wrap gap-5 pt-2">
          {location &&
            location.map((location, index) => (
              <button
                className="flex-1    border-primary rounded-lg py-2"
                style={
                  locationId === location.location
                    ? { background: "#E2545E", color: "white" }
                    : { background: "#D9D9D9B2", color: "black" }
                }
                onClick={() => handleLocationButton(location.location)}
              >
                {location.location}
              </button>
            ))}
        </div>
      </div>
      <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Collections
        </h1>
        <select
          className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          onChange={handleSelectionChange} // Added onChange handler
          value={selectedCollectionId}
          style={{ background: "#D9D9D9B2" }}
        >
          <option value="">Open this select menu</option>
          {collection_id &&
            collection_id.map((collection, index) => (
              <option key={collection.id || index} value={collection.id}>
                {collection.name}
              </option>
            ))}
        </select>
      </div>
      <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Model Number
        </h1>
        <select
          className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          onChange={handleProductChange} // Added onChange handler
          value={selectedProductId}
          style={{ background: "#D9D9D9B2" }}
        >
          <option value="">Open this to Select Model No</option>
          {products &&
            products.map((product, index) => (
              <option key={product.id || index} value={product.id}>
                {product.name}
              </option>
            ))}
        </select>
      </div>
      <div className="sub-card bg-gray-100 mt-2 mb-5 p-4 border border-gray-200 rounded-lg ">
        <h1 className="text-xl" style={{ color: "#666666" }}>
          Inventory Level
        </h1>
        <select
          className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          onChange={handleTemplateChange}
          value={selectedTemplateId || ""}
          style={{ background: "#D9D9D9B2" }}
        >
          <option value="Select Template">Select Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.greetings}
            </option>
          ))}
        </select>
      </div>
    </div>
    
  );
}

export default Template;
