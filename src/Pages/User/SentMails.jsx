import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";

function SentMails() {
  useEffect(() => {
    document.title = "Sent Mails - Crownsync AI";
    // Optionally, set meta description or any other head elements here
    return () => {
      // This is where you can reset or change the title when the component unmounts if necessary
      document.title = "Crownsync Ai";
    };
  }, []);
  const [selectedMail, setSelectedMail] = useState(null);

  const [mails, setMails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        // console.log("token", token);
        const response = await axios.get(`${baseUrl}getsentmails`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.status === 200) {
          setMails(response.data.data);
          console.log('ascxv',response.data);
     
        } else {
          console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const [selectedMailIndex, setSelectedMailIndex] = useState(null);

  return (
    <>
      <div className="flex text-gray-900 h-[100vh]">
        <Sidebar />
        <div
          className="container "
          style={{
            borderRadius: "20px",
            background: "#F9F9F9",
            marginTop: "2%",
          }}
        >
          <div className="row  mt-5">
            <div className="col-md-5">
              <div className="">
                <div
                  className="col-md-12 w-full p-4   border-gray-200 rounded-lg  sm:p-6  dark:border-gray-700"
                  style={{ maxHeight: "90vh", overflowY: "auto" }}
                >
                  <div className=" d-flex">
                    <h1 className="text-3xl font-bold ">Sent Mails</h1>
                  </div>
                  <div className="pt-5 d-flex" style={{ width: "100%" }}>
                    <div style={{ flex: "1" }}></div>
                  </div>

                  <div>
                    {isLoading ? (
                      <p>Loading emails...</p>
                    ) : mails.length === 0 ? ( // Check if the mails array is empty
                    <p>No emails sent.</p>  // Display a message if there are no emails
                  ) : (
                      mails.map((mail, index) => (
                        <ul
                          key={index}
                          onClick={() => setSelectedMailIndex(index)}
                          className="my-5 space-y-3 shadow"
                          style={{ borderRadius: "10px", background: "none" }}
                        >
                          <li>
                            <Link
                              to="#"
                              className={`flex items-center bg-white p-3 text-base font-bold text-gray-900 rounded-lg ${
                                selectedMailIndex === index
                                  ? "bg-gray-100 selected-outline"
                                  : "hover:bg-gray-10"
                              } group hover:shadow dark:hover:bg-gray-100 dark:text-white`}
                              
                            >
                              <img
                                src="/media/avatars/300-1.jpg" // Consider dynamically setting the avatar if available
                                alt=""
                                className="w-12 h-12 rounded-full"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "10px",
                                }}
                              />
                              <div className="flex flex-col flex-grow ms-3">
                                <span className="whitespace-nowrap">
                                  {mail.recipient_email}
                                </span>
                                <small
                                  className="text-xs"
                                  style={{ color: "#556080" }}
                                >
                                  {mail.sender_email}
                                </small>
                                <p
                                  className="text-xs"
                                  style={{ color: "#556080", width: "100%" }}
                                >
                                  {mail.subject}
                                </p>
                                <div
                                  className="ml-auto flex items-center"
                                  style={{ marginRight: "10%" }}
                                >
                                  
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="card">
                <div
                  className="col-md-12 w-full bg-white p-7 border-gray-200 rounded-lg sm:p-6 dark:border-gray-700"
                  style={{ maxHeight: "90vh", overflowY: "auto" }}
                >
                  <div className="d-flex">
                    <h1 className="text-3xl font-bold">Received Mail</h1>
                  </div>
                  {selectedMailIndex !== null ? (
                    <div className="pt-5">
                      <div>
                        <span className="whitespace-nowrap py-2" style={{color: "#556080",}}>
                          <span style={{ color: "black", padding: "1% 0" }}>
                            Replied to This email:
                          </span>{" "}
                          {mails[selectedMailIndex].recipient_email}
                        </span>
                      </div>
                      <div>
                        
                          <p
                            style={{
                              color: "#556080",
                              width: "100%",
                              padding: "1% 0",
                            }}
                          >
                            <span style={{ color: "black", width: "100%" }}>
                              Received Email:
                            </span>{" "}
                            {mails[selectedMailIndex].received_message
                              }
                          </p>
                        
                      </div>
                      <div>
                        {/* <span className="whitespace-nowrap py-2">
                          <span style={{ color: "black", padding: "1% 0" }}>
                            Recipient:
                          </span>{" "}
                          {mails[selectedMailIndex].recipient_email}
                        </span> */}
                      </div>
                    </div>
                  ) : (
                    <p>Please select an email to view its details.</p>
                  )}
                </div>
              </div>
              <div className="card">
                <div
                  className="col-md-12 w-full bg-white p-7 border-gray-200 rounded-lg sm:p-6 dark:border-gray-700"
                  style={{ maxHeight: "90vh", overflowY: "auto" }}
                >
                  <div className="d-flex">
                    <h1 className="text-3xl font-bold">Sent Mail</h1>
                  </div>
                  {selectedMailIndex !== null ? (
                    <div className="pt-5">
                      
                      
                      <div>
                        {/* <span className="whitespace-nowrap py-2">
                          <span style={{ color: "black", padding: "1% 0" }}>
                            Recipient:
                          </span>{" "}
                          {mails[selectedMailIndex].recipient_email}
                        </span> */}
                      </div>
                      <div>
                        <p style={{ color: "#556080", padding: "1% 0" }}>
                          <span style={{ color: "black" }}>Sender:</span>{" "}
                          {mails[selectedMailIndex].sender_email}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#556080",
                            width: "100%",
                            padding: "1% 0",
                          }}
                        >
                          <span style={{ color: "black" }}>Subject:</span>{" "}
                          {mails[selectedMailIndex].subject}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#556080",
                            width: "100%",
                            padding: "1% 0",
                          }}
                        >
                          <span style={{ color: "black" }}>Message:</span>{" "}
                          {mails[selectedMailIndex].message}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>Please select an email to view its details.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SentMails;
