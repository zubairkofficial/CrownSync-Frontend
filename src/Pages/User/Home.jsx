import React, { useEffect, useState } from "react";
import Sidebar from "./../../Components/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Helpers from "./../../Config/Helpers";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleLoginComponent from "../Admin/Components/GoogleLoginComponent";
import GoogleLoginButton from "../Admin/Components/GoogleLoginButton";
import Loader from "../Admin/Components/Loader";

const Home = () => {
  useEffect(() => {
    document.title = "Home - Crownsync AI";

    return () => {

      document.title = "Crownsync Ai";
    };
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const [isGoogle, setIsGoogle] = useState(null);
  const [userNotFound, setUserNotFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const userJson = localStorage.getItem("user");

  const user = JSON.parse(userJson);
  const userEmail = user ? user.email : null;

  const [emailData, setEmailData] = useState(null);
  let { messageId } = useParams();


  useEffect(() => {
    // const asyncOperations = [
    //     new Promise((resolve) => setTimeout(resolve, 1000)), // Example async operation 1
    //     new Promise((resolve) => setTimeout(resolve, 2000)), // Example async operation 2
    //     new Promise((resolve) => setTimeout(resolve, 3000)), // Example async operation 3
    // ];

    // Promise.all(asyncOperations)
    //     .then(() => {
    //         setLoading(false);
    //         Helpers.toast("success", "Page is ready now");
    //     });
}, []);
  const url = Helpers.apiUrl;
  const handleLoginSuccess = (response) => {
    // alert(response);
    // console.log('Login Response:', response);

};

  useEffect(() => {
    const fetchDetail = async () => {
        try {
          const response = await axios.get(`${Helpers.apiUrl}check-login`, Helpers.authHeaders);
          if (response.status === 200 && response.data.data) {
            setIsGoogle(response.data.data);
            setUserNotFound(false);
          } else {
            setIsGoogle(null);
            setUserNotFound(true);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Handle user not found
            setUserNotFound(true);
            setIsGoogle(null);
          } else {
            // Handle other errors
            console.error("Error fetching details:", error);
          }
        }
    };

    fetchDetail();
  }, []);

  const loginWithGoogle = () => {
   // Retrieve the user data from localStorage
const userString = localStorage.getItem('user');

// Parse it into an object, if the data is not null
let user = null;
if (userString) {
  try {
    user = JSON.parse(userString);
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
}

// Access and log the user id
if (user && user.id) {
  console.log('User ID:', user.id);
} else {
  console.log('User data is missing or does not contain an id.');
}
    const userId = localStorage.getItem('user_id'); // Retrieve the stored user ID
    const backendURL = Helpers.backendUrl;
    window.location.href = `${backendURL}auth/redirect?userId=${user.id}`; // Pass only the user ID
};

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Helpers.apiUrl}email-messages`, Helpers.authHeaders);
      if (response.status === 200) {
        const emails = response.data.data.map((email) => {
          try {
            // Assuming email.detail is a JSON string that needs parsing
            return { ...email, detail: JSON.parse(email.detail) };
          } catch (e) {
            console.error(
              "Failed to parse email detail for email with ID:",
              email.id
            );
            return { ...email, detail: {} }; // Provide empty detail in case of parsing failure
          }
        });
        setMails(emails);
        setAssignSuccess(false);
      } else {
        console.log("Received non-200 response:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false); // Assuming you meant to set false here
      } else {
        setIsAuthenticated(true); // You can decide the correct logic
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Helpers.apiUrl}email-messages`, Helpers.authHeaders);
        if (response.status === 200) {
          console.log('mail data comes',response.data);
          const emails = response.data.data.map((email) => {
            try {
              // Assuming email.detail is a JSON string that needs parsing
              return { ...email, detail: JSON.parse(email.detail) };
            } catch (e) {
              console.error(
                "Failed to parse email detail for email with ID:",
                email.id,
                e
              );
              return { ...email, detail: {} }; // Provide empty detail in case of parsing failure
            }
          });

          const emailMessage = emails.find(
            (email) =>
              email.detail.headers &&
              email.detail.headers["Message-ID"] === messageId
              
          );
          console.log('message id down',messageId);
          if (emailMessage) {
            setEmailData(emailMessage);
            // console.log("Email data:", emailMessage);
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
  const [finalTemplate, setFinalTemplate] = useState("");

  const handleTemplateChange = (event) => {
    setLocationId("");
    setSelectedTemplateId(event.target.value);
  };
  const handleFinalTemplateChange = (event) => {
    setFinalTemplate(event.target.value);
  };


  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Helpers.apiUrl}fetch-locations`, Helpers.authHeaders);
        if (response.status === 200 && Array.isArray(response.data.data)) {
          // console.log('location data',response.data.data);
          setLocations(response.data.data);
        } else {
          console.error("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Helpers.apiUrl}rolex_models`, Helpers.authHeaders);
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //location


  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
    // For passing store Id
    const [storeId, setStoreId] = useState("");

    const handleStoreButton = (store) => {
      setStoreId(store);
    };
    const [stores, setStores] = useState([]);
    // For passing location Id
    const [locationId, setLocationId] = useState("");

    const handleLocationButton = (location) => {
      setLocationId(location);
    };

    useEffect(() => {
      if (locationId !== "" || storeId !== "") {
        updateTemplate();
      }
    }, [locationId, storeId]);


  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}collects`, Helpers.authHeaders);
        if (response.status === 200) {
          setCollections(response.data.data);
        } else {
          console.error("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        handleAPIError(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}rolex_models`, Helpers.authHeaders);
        if (response.status === 200) {
          setAllProducts(response.data.data);
        } else {
          console.error("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        handleAPIError(error);
      }
    };

    fetchCollections();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCollectionId) {
      const filtered = allProducts.filter(
        (product) =>
          String(product.collection_id) === String(selectedCollectionId)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCollectionId, allProducts]);

  const handleSelectionChange = (event) => {
    setSelectedCollectionId(event.target.value);
    setSelectedProductId(""); // Reset the product selection
  };

  const handleProductChange = (event) => {
    const newProductId = event.target.value;
    setSelectedProductId(newProductId);
    const product = filteredProducts.find((p) => String(p.id) === String(newProductId));
    setSelectedProduct(product);
};
  const handleAPIError = (error) => {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  };
  useEffect(() => {
  
    const filtered = allProducts.filter((product) => {
      const productCollectionId = String(product.collection_id);
      const isSelectedCollectionId = String(selectedCollectionId);

      return productCollectionId === isSelectedCollectionId;
    });

    // console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  }, [selectedCollectionId, allProducts]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    // This effect keeps the selectedProduct state in sync with the selectedProductId state
    if (selectedProductId !== "") {
        const product = filteredProducts.find(
            (p) => String(p.id) === String(selectedProductId)
        );
        setSelectedProduct(product);
    } else {
        setSelectedProduct(null);
    }
}, [selectedProductId, filteredProducts]);

  const getTemplates = async () => {
    const response = await axios.get(`${Helpers.apiUrl}admin/mail_templates`, Helpers.authHeaders);
    if (response.status === 200) {
      setTemplates(response.data.data);
      // console.log('my templates',response.data.data);
    }
  };

  const updateTemplate = () => {
    if (selectedTemplateId) {

      const templateToUpdate = templates.find(temp => temp.id === parseInt(selectedTemplateId));
  
      if (!templateToUpdate) {
        console.error('Template with the given ID was not found.');
        return;
      }

      const username = localStorage.getItem("user");
      const user = JSON.parse(username);
      const userName = user ? user.name : "";

      const replacements = {
        'MyName': userName || "",
        'ClientName': emailData.detail.headers["From"].match(/^(.*?)\s*<(.*)>$/)?.[1] || "",
        'Model': selectedProduct?.name || "",
        'Price': selectedProduct?.price || "",
        'Stock': selectedProduct?.stock || "",
        'Link': selectedProduct?.link || "",
        'Features': selectedProduct?.features || "", 
        // 'Store': selectedProduct?.store || "",
        'Store': storeId || "",
        // 'Location': selectedProduct?.location || "",
        'Location': locationId || "",

        'Benefits': selectedProduct?.benefits || "",
        'MyEmail': isGoogle?.contact || "",
        'MyPhone': profile?.phone || "",
        'Address': profile?.address || "",
        'Collection': selectedProduct?.collection_id ? selectedProduct.collection_name : "",
        'Image': selectedProduct?.image ? `<img src="${selectedProduct.image}" alt="${selectedProduct?.name}" style="max-width: 100%; height: 200px; align-items: center; text-align: center; display: flex; justify-content: center; />` : ""
      };

      
      // Apply replacements, replacing placeholders with empty strings for empty fields
      let updatedTemplate = templateToUpdate.heading;
      for (const [key, value] of Object.entries(replacements)) {
        if (value !== "") {
          // Only replace placeholders with actual values
          updatedTemplate = updatedTemplate.replace(new RegExp(`\\[${key}\\]`, 'gi'), value);
        } else {
          // If the value is empty, replace the placeholder with an empty string
          updatedTemplate = updatedTemplate.replace(new RegExp(`\\[${key}\\]`, 'gi'), '');
        }
      }
  
      setFinalTemplate(updatedTemplate);
    }
  };
  
  

  useEffect(() => {
    updateTemplate();
  }, [selectedProductId, emailData, selectedTemplateId, selectedCollectionId]);

  useEffect(() => {
    getTemplates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Called");
      const username = localStorage.getItem("user");
      const user = JSON.parse(username);
      const userName = user ? user.name : "Customer";
      setIsLoading(true);
      try {
        const response = await axios.get(`${Helpers.apiUrl}admin/mail_templates`, Helpers.authHeaders);
        const modelName =
          selectedProduct && selectedProduct.name ? selectedProduct.name : "[]";
        const modelPrice =
          selectedProduct && selectedProduct.price
            ? selectedProduct.price
            : "[]";
        const modelStock =
          selectedProduct && selectedProduct.stock
            ? selectedProduct.stock
            : "[]";
        const modelLink =
          selectedProduct && selectedProduct.link ? selectedProduct.link : "[]";
        const modelFeature =
          selectedProduct && selectedProduct.features
            ? selectedProduct.features
            : "[]";
        const modelStore =
          selectedProduct && selectedProduct.store
            ? selectedProduct.store
            : "[]";
        const modelLocation =
          selectedProduct && selectedProduct.location
            ? selectedProduct.location
            : "[]";
        const modelBenefit =
          selectedProduct && selectedProduct.benefits
            ? selectedProduct.benefits
            : "[]";
        const mycollection =
          selectedProduct && selectedProduct.collection_id
            ? selectedProduct.collection_name
            : "[]";
        // console.log("asdfcxe", mycollection);
        const imageHtml =
          selectedProduct && selectedProduct.image
            ? `<img src="${Helpers.basePath}/assets/${selectedProduct.image}" alt="${selectedProduct.name}" style="max-width: 100%; height: 200px; align-items: center;text-align:center;display:flex;justify-content:center;margin-left:10%" />`
            : "[]";
        const fromField = emailData.detail.headers["From"];
        const match = fromField.match(/^(.*?)\s*<(.*)>$/);
        const reciever_name = match ? match[1] : "";
        const sender_email = isGoogle ? isGoogle.contact : "";
        const sender_phone = profile ? profile.phone : "";
        const sender_address = profile ? profile.address : "";
        if (response.status === 200) {
          const modifiedTemplates = response.data.data.map((template) => {
            const greetingUpdated = template.heading
              .replace(/\[SenderName\]/gi, userName)
              .replace(/\[ReceiverName\]/gi, reciever_name)
              .replace(/\[Model\]/gi, modelName)
              .replace(/\[Price\]/gi, modelPrice)
              .replace(/\[Stock\]/gi, modelStock)
              .replace(/\[Link\]/gi, modelLink)
              .replace(/\[Features\]/gi, modelFeature)
              .replace(/\[Store\]/gi, modelStore)
              .replace(/\[Location\]/gi, modelLocation)
              .replace(/\[Benefits\]/gi, modelBenefit)
              .replace(/\[SenderEmail\]/gi, sender_email)
              .replace(/\[SenderPhone\]/gi, sender_phone)
              .replace(/\[SenderAddress\]/gi, sender_address)
              .replace(/\[Collection\]/gi, mycollection)
              .replace(/\[Image\]/gi, imageHtml);
            return {
              ...template,
              heading: greetingUpdated,
            };
          });
          setTemplates(modifiedTemplates);
        } else {
          // console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchData();
  }, [selectedProductId, emailData, selectedTemplateId, selectedCollectionId]);

  // For passing data in email preview section
  const [selectedGreetingText, setSelectedGreetingText] = useState("");

  const handleGreetingButton = (greetingText) => {
    setSelectedGreetingText(greetingText);
    console.log(greetingText); // Now this directly logs the greetings text
  };

 
  const [stock, setStock] = useState("");
  const handleStockChange = (status) => {
    setStock(status);
    // console.log(stock);
  };
  // console.log("SELECTED MAIL", emailData);
  const [showPreview, setShowPreview] = useState(false); // New state for toggling the preview
  const handleProceed = () => {
    // Toggle the visibility of the email preview section
    setShowPreview(true);
    // console.log(showPreview);
  };
  const [resposne, setResponse] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const user = JSON.parse(username);

    const myuser = user ? user.name : null;
    const myemail = user ? user.email : null;

    const fromField = emailData.detail.headers["From"];
    const match = fromField.match(/^(.*?)\s*<(.*)>$/);
    const reciever_name = match ? match[1] : ""; // This would be "GitHub"
    // console.log(reciever_name);
    const reciever_email = match ? match[2] : fromField;
    // console.log(reciever_email);
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
      const response = await axios.post(`${Helpers.apiUrl}email-preview`,payload, Helpers.authHeaders);
      if (response.status === 200) {

        setResponse(response.data.body);
        Helpers.toast("success", "Operation Successful");
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
  const [sendisLoading, setsendisLoading] = useState(false);
  const handleEmailSend = async (e) => {
    e.preventDefault();
    setsendisLoading(true);
    const fromField = emailData.detail.headers["From"];
    const received_message = emailData.detail.snippet;
    const match = fromField.match(/^(.*?)\s*<(.*)>$/);
    const reply_to = match ? match[2] : fromField;
    const fromField1 = emailData.detail.headers["From"];
    const match1 = fromField1.match(/^(.*?)\s*<(.*)>$/);
    const reciever_name = match1 ? match1[1] : ""; // This would be "GitHub"
    // console.log("asdfvcxyh", reciever_name);
    const reciever_email = match ? match[2] : fromField1;
    // console.log(reciever_email);
    const asseignedTeamIds = selectedAssignIds;
  //  alert(asseignedTeamIds);
    const formData = {
      // template_id: selectedTemplateId,
      // product_id: selectedProductId,
      greeting: selectedGreetingText,
      response: resposne, // You need to define what this response should be.
      reply_to: reply_to,
      received_message: received_message,
      responder_name: profile.name,
      responder_mail: isGoogle.contact,
      // sender_phone: profile.phone,
      // sender_address: profile.address,
      reciever_name: reciever_name,
      reciever_email: reciever_email,
      assigned_team_ids : asseignedTeamIds,
      subject : profile.name,
      message : finalTemplate
      // store:storeId,
      // location:locationId
    };

    try {
      const response = await axios.post(`${Helpers.apiUrl}gmail/send-email`, formData, Helpers.authHeaders);
      console.log(response)
      if (response.status === 200) {
        console.log(response.data);
          Helpers.toast("success", response.data.message);
      } else {
          console.log("Not sending mail");
          Helpers.toast("error", "Error in Sending Mail ");
      }
  } catch (error) {
      console.error("Error in Sending Mail ", error);
      
      // Check if error response indicates invalid grant
      if (error.response && error.response.data && error.response.data.error === 'Refresh token is invalid, please reauthorize the application') {
          // Prompt the user to reauthorize
          Helpers.toast("error", "Session expired. Please reauthorize the application.");
      
      } else {
          Helpers.toast("error", "Error in Sending Mail ");
      }
  } finally {
    setExpandedMailId(null);
    setSelectedTemplateId(null)
    setLocationId("")
    setStoreId("")
    setSelectedCollectionId("")
    setSelectedProductId("")
      setsendisLoading(false); // Ensure isLoading is set to false in finally block
  }
  
  };

  /// Filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showSearch, setShowSearch] = useState(false); // Search input hidden by default
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);


  const filteredMails = mails
    .filter((mail) => {
      const mailDate = new Date(mail.detail.headers?.Date);
      const startOfDay = startDate
        ? new Date(new Date(startDate).setHours(0, 0, 0, 0))
        : null;
      const endOfDay = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
        : null;

      const isDateFiltered =
        !startOfDay ||
        (mailDate >= startOfDay && (!endOfDay || mailDate <= endOfDay));
      return isDateFiltered;
    })
    .filter((mail) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const isSearchTermInSnippet = mail.detail.snippet
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const isSearchTermInFrom =
        mail.detail.headers?.From?.toLowerCase().includes(lowerCaseSearchTerm);

      const isSearchFiltered = isSearchTermInSnippet || isSearchTermInFrom;
      return isSearchFiltered;
    });

  // Update isFilterActive based on filters applied
  useEffect(() => {
    setIsDateFilterActive(
      startDate !== null || endDate !== null || searchTerm !== ""
    );
  }, [startDate, endDate, searchTerm]);

  const [showInputs, setShowInputs] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc"); // or 'desc' for default descending
  const toggleSort = () => {
    // Assuming the initial sortDirection state is "desc"
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);

    // Perform sorting
    setMails((currentMails) => {
      return [...currentMails].sort((a, b) => {
        const dateA = new Date(a.detail.headers?.Date);
        const dateB = new Date(b.detail.headers?.Date);
        return newSortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
    });
  };

  const toggleSearchInput = () => {
    setShowSearch(!showSearch); // Toggle the current state of the search input
    if (showInputs) {
      // If the date inputs are currently shown, hide them
      setShowInputs(false);
    }
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs); // Toggle the current state of the date inputs
    if (showSearch) {
      // If the search input is currently shown, hide it
      setShowSearch(false);
    }
  };
  const [selectedMailId, setSelectedMailId] = useState(null);
  const handleSelectMail = (mailId) => {
    setSelectedMailId(mailId);
  };
  const selectGreetingBasedOnTime = () => {
    const hours = new Date().getHours();
    let greeting;
    if (hours < 12) {
      greeting = "Good Morning";
    } else if (hours >= 12 && hours <= 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    setSelectedGreetingText(greeting);
  };
  useEffect(() => {
    selectGreetingBasedOnTime();
  }, []); // The empty array ensures this effect runs once on mount
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}getuserlist`, Helpers.authHeaders);
        if (response.status === 200) {
          setTeam(response.data.data); // Directly set the array of user objects to state
        } else {
          console.log("Error in getting user list");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [selectedAssignIds, setSelectedAssignIds] = useState([]);

  const handleAssignChange = async (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];

    console.log('selectedIds on team select', selectedIds);
    setSelectedAssignIds(selectedIds);

    if (!selectedIds.length) return; // Early return if no selection

    const url = Helpers.apiUrl;
    const token = localStorage.getItem("token");
      try {
        console.log('message id on call handleAssignChange', messageId);

        const response = await fetch(`${url}assignuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            team_ids: selectedIds,
            message_id: messageId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Helpers.toast("success", "Assigned Successfully");
          console.log(data, 'assigned data comes');
        } else {
          throw new Error(data.error || "Failed to assign email");
        }
      } catch (error) {
        // Helpers.toast("error", error.message || "An error occurred");
        console.error("Error:", error);
      }
  };


  const filterAssign = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}getassignuser`, Helpers.authHeaders);
      const assignedMessageIds = response.data.data.map(
        (item) => item.message_id
      );
      // Now, filter emails based on assigned message IDs
      const filteredMails = mails.filter((mail) =>
        assignedMessageIds.includes(mail.detail.headers["Message-ID"])
      );
      setMails(filteredMails);
      setAssignSuccess(true);
    } catch (error) {
      console.error("Error:", error); // Log error
    }
  };
  const [selectedMemberId, setSelectedMemberId] = useState("");


  const handleMemberChange = (selectedOption) => {
    if (selectedOption) {
      console.log("Selected Member ID:", selectedOption.value);
      setSelectedMemberId(selectedOption.value);
      filterMember(selectedOption.value);
    } else {
      setSelectedMemberId(""); // or handle deselecting differently if needed
    }
  };

  // Function to filter emails based on selected member ID
  const filterMember = async (memberId) => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}getassignuser`, Helpers.authHeaders);

      // console.log("Get assignResponse data:", response.data); // Log the response data
      if (response.status === 200) {
        const assignedData = response.data.data;
        // console.log("Assigned Data:", assignedData); // Debugging log

        // Filter to get assigned message IDs for the selected team ID
        const assignedMessageIds = assignedData
          .filter((item) => String(item.team_id) === String(memberId))
          .map((item) => item.message_id);

        console.log("Assigned Message IDs:", assignedMessageIds); // Log the filtered message IDs

        // Filter the emails based on the assigned message IDs
        const filteredMails = mails.filter((mail) =>
          assignedMessageIds.includes(String(mail.detail.headers["Message-ID"]))
        );


        setMails(filteredMails); // Set the filtered mails
        setAssignSuccess(true); // Indicate success
      } 
    } catch (error) {
      console.error("Error:", error);
      setAssignSuccess(false); // Indicate an error occurred
    }
  };

  const [expandedMailId, setExpandedMailId] = useState(null);

  const handleToggleDetails = (mailId) => {
    if (expandedMailId === mailId) {
      setExpandedMailId(null);
    } else {
      setExpandedMailId(mailId); // Expand if not expanded
      setSelectedMailId(mailId);
    }
  };
  const options = team.map((member) => ({
    value: member.id,
    label: member.user_name,
  }));
  // console.log(options,'options data');
  const options1 = team.map((member) => ({
    value: member.id, // make sure this is correctly populated
    label: member.user_email, // and this too
  }));
  // console.log(options1,'options 1 data');

  const customStyles1 = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#D9D9D9B2",
      color: "#ADADAD",
    }),
  };
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#E2545E",
      color: "white",
      boxShadow: "none",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white", // affects the selected option label
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "white", // This will change the placeholder text color
    }),
    input: (styles) => ({
      ...styles,
      color: "white", // This will change the text color as you type in the search input
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "white", // Arrow icon color
    }),
   
    noOptionsMessage: (styles) => ({
      ...styles,
      color: "white", // No options available message color
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#E2545E", // Dropdown background
    }),
  };
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}profile`, Helpers.authHeaders);
        if (response.status === 200) {
          // console.log("API Response:", response.data.data.profile);
          setProfile(response.data.data);
        } else {
          // console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchDetail();
  }, []);

  const toggleFilter = () => {
    if (!isFilterActive) {
      filterAssign(); // Apply the filter
    }
    setIsFilterActive(!isFilterActive); // Toggle the active state of the filter
  };
  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setIsFilterActive(false); // Ensure this is reset when filters are cleared
  };
  const clearFilter = () => {
    fetchData(); // Fetch initial data to reset filters
    setIsFilterActive(false); // Reset the filter active state
  };
  const [activeIcon, setActiveIcon] = useState(null);
  // const [sortDirection, setSortDirection] = useState("asc");

  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    handleIconClick("sort");
  };

  const iconStyle = (iconName) => ({
    fontSize: "15px",
    color: activeIcon === iconName ? "white" : "#AEAEAE",
    cursor: "pointer",
    backgroundColor: activeIcon === iconName ? "#E2545E" : "transparent",
    padding: "11px",
    borderRadius: "5px",
    border: "1px solid #DFE2EB",
    marginLeft: "8px",
  });

   const fetchStores = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}fetch-store`, Helpers.authHeaders);

            if (response.status === 200) {
                const fetchedStores = response.data.data || [];
                setStores(fetchedStores);
                // Helpers.toast("success", "Fetch Stores Successfully");
            } else {
                setStores([]); // Set to empty array on error
            }
        } catch (error) {
            // Helpers.toast("error", "Error fetching stores. Please try again later.");
            setStores([]); // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    
  const [editTemplate, setEditTemplate] = useState(false);
  const handleEditTemplate = () => {
    setEditTemplate(!editTemplate);
};
  return (
    <>
      <div className="flex text-gray-900 h-[100vh] ">
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
            <div className="col-md-4">
              <div className="">
                <div
                  className="col-md-12 w-full p-4   border-gray-200 rounded-lg  sm:p-6  dark:border-gray-700"
                  style={{ maxHeight: "100vh", overflowY: "auto" }}
                >
                  <div className=" d-flex">
                    <h1 className="text-3xl font-bold ">Inbox</h1>
      
           
                    {isGoogle ? (
                      <select
                        id="countries"
                        className="bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style={{
                          borderRadius: "50px",
                          marginLeft: "3%",
                          width: "50%",
                          background: "#F0F0F0",
                          color: "#C2C2C2",
                        }}
                        defaultValue={isGoogle.contact} // Use defaultValue or value based on your need
                      >
                        <option value={isGoogle.contact}>{isGoogle.contact}</option>
                      </select>

                    ) : (
                      <div></div>
                    )}
                    {isDateFilterActive ? (
                      <button
                        className="btn flex-1 py-2"
                        style={{
                          background: "#E2545E",
                          color: "white",
                          marginLeft: "1rem",
                        }}
                        onClick={clearDateFilter}
                      >
                        Clear
                      </button>
                    ) : (
                      <div><p></p></div>
                    )}

                    {assignSuccess ? (
                      <button
                        className="btn flex-1 py-2"
                        style={{
                          background: "#E2545E",
                          color: "white",
                          marginLeft: "1rem",
                        }}
                        onClick={clearFilter}
                      >
                        Clear
                      </button>
                    ) : (
                      <div><p></p></div>
                    )}
                  </div>
                  {userNotFound ? (
                    <div>
                      {/* Uncomment and use the correct login component as needed */}
                      {/* <GoogleLoginComponent onLoginSuccess={handleLoginSuccess} /> */}
                      <GoogleLoginButton onLoginClick={loginWithGoogle} />
                    </div>
                  ) : (
                    mails.length === 0 ? (
                      <Loader style={{ height: '90vh' }} />
                    ) : (
                      <>
                        <div
                          className="pt-5 d-flex"
                          style={{ width: "100%", position: "static" }}
                        >
                          {/* <div style={{ flex: "1" }}>
                            <Select
                              styles={customStyles}
                              options={mails.length === 0 ? [] : options1}
                              placeholder="All Users"
                              onChange={mails.length === 0 ? null : handleMemberChange}
                              isClearable={true}
                              style={{ color: "white" }}
                              isSearchable={true}
                            />
                          </div> */}
                          <div
                            className="icons flex ml-5"
                            style={{ flex: "0 0 auto" }}
                          >
                            <div onClick={() => handleIconClick("calendar")}>
                              <i
                                className="fa-light fa-calendar-range"
                                style={iconStyle("calendar")}
                                title="Calendar"
                                onClick={toggleInputs}
                              ></i>
                            </div>
                            <div onClick={() => handleIconClick("search")}>
                              <i
                                className="fa-light fa-magnifying-glass"
                                style={iconStyle("search")}
                                title="Search"
                                onClick={toggleSearchInput}
                              ></i>
                            </div>
                            <div onClick={toggleSortDirection}>
                              <i
                                className={`fa-sharp fa-light ${sortDirection === "asc" ? "fa-arrow-up-arrow-down" : "fa-arrow-down-arrow-up"}`}
                                style={iconStyle("sort")}
                                title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
                                onClick={toggleSort}
                              ></i>
                            </div>
                            <div
                              className="icon-wrapper rounded p-3 border border-gray-300 ml-2"
                              style={{
                                cursor: "pointer",
                                color: isFilterActive ? "white" : "#AEAEAE",
                                backgroundColor: isFilterActive ? "#E2545E" : "transparent",
                              }}
                              title="Filter"
                              onClick={toggleFilter}
                            >
                              <i
                                className="fa-light fa-circle-check"
                                style={{ fontSize: "15px" }}
                              ></i>
                            </div>
                            <GoogleLoginComponent  />
                            {/* Uncomment and use the correct login button as needed */}
                            {/* <div
                              className="icon-wrapper rounded p-3 border border-gray-300 ml-2"
                              style={{
                                cursor: "pointer",
                              }}
                              title="Connect With Gmail"
                              onClick={loginWithGoogle}
                            >
                              <i
                                className="fa-light fa-refresh"
                                style={{ fontSize: "15px", color: "#AEAEAE" }}
                              ></i>
                            </div> */}
                          </div>
                        </div>

                        <div className="flex justify-center items-center space-x-4">
                          {showInputs && (
                            <div
                              className="pt-5 d-flex"
                              style={{ width: "100%" }}
                            >
                              <div className="flex" style={{ flex: "1" }}>
                                <div
                                  className="p-2 flex"
                                  style={{ flex: "1" }}
                                >
                                  <input
                                    type="date"
                                    value={startDate ? startDate.toISOString().substring(0, 10) : ""}
                                    onChange={(e) =>
                                      setStartDate(e.target.value ? new Date(e.target.value) : null)
                                    }
                                    placeholder="Select start date"
                                    style={{
                                      padding: "5%",
                                      width: "100%",
                                      borderRadius: "30px",
                                    }}
                                  />
                                </div>
                                <div className="p-2 flex" style={{ flex: "1" }}>
                                  <input
                                    type="date"
                                    value={endDate ? endDate.toISOString().substring(0, 10) : ""}
                                    onChange={(e) =>
                                      setEndDate(e.target.value ? new Date(e.target.value) : null)
                                    }
                                    placeholder="Select end date"
                                    style={{
                                      padding: "5%",
                                      width: "100%",
                                      borderRadius: "30px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {showSearch && (
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Search mails"
                              className="search-input-class"
                              style={{
                                width: "100%",
                                padding: "2%",
                                marginTop: "2%",
                              }}
                            />
                          )}
                        </div>
                        {filteredMails.length === 0 && !userNotFound ? (
                          <div style={{ padding: "25%" }}>
                            <img
                              src="/media/no_result_found.png"
                              alt="No results found"
                            />
                          </div>
                        ) : (
                          filteredMails.map((mail, index) => (
                            <div key={mail.detail.headers?.["Message-ID"] || index}>
                              <ul className="my-5 space-y-3 shadow" style={{ borderRadius: "50px" }}>
                                <li
                                  key={mail.detail.id}
                                  className={`rounded-lg ${
                                    mail.detail.headers &&
                                    selectedMailId === mail.detail.headers["Message-ID"]
                                      ? "selected-outline"
                                      : ""
                                  }`}
                                >
                                  <Link
                                    to={`/user/dashboard/${mail.detail.headers?.["Message-ID"]}`}
                                    className="flex items-center p-3 bg-white text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group hover:shadow dark:hover:bg-gray-100 dark:text-white"
                                    onClick={() => handleToggleDetails(mail.detail.headers?.["Message-ID"])}
                                  >
                                    {/* <img
                                      src="/media/avatars/300-1.jpg"
                                      alt=""
                                      className="w-12 h-12 rounded-full"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "10px",
                                      }}
                                    /> */}
                                    <div className="flex flex-col flex-grow ms-3">
                                      <div className="flex">
                                        <span>
                                          {mail.detail.headers?.From ? mail.detail.headers.From.split(" <")[0] : "Unknown Sender"}
                                        </span>
                                        {assignSuccess ? (
                                          <i
                                            className="fa-light fa-circle-check"
                                            style={{
                                              fontSize: "15px",
                                              color: "green",
                                              cursor: "pointer",
                                              marginLeft: "3%",
                                              marginTop: "0%",
                                            }}
                                          ></i>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <small className="text-xs" style={{ color: "#C2C2C2" }}>
                                        {mail.detail.headers?.Date || ""}
                                      </small>
                                      <p
                                        className="text-xs"
                                        style={{
                                          color: "#C2C2C2",
                                          width: "100%",
                                        }}
                                      >
                                        {mail.detail.headers?.Subject || "No Subject"}
                                      </p>
                                    </div>
                                    <i
                                      className={`fa-solid ${
                                        expandedMailId === mail.detail.headers?.["Message-ID"]
                                          ? "fa-caret-up"
                                          : "fa-caret-down"
                                      } ml-auto text-gray-500`}
                                    ></i>
                                  </Link>
                                  {expandedMailId === mail.detail.headers?.["Message-ID"] && (
                                    <div className="bg-white p-3 rounded-lg">
                                      <p className="text-xs">
                                        {"Message:- "}
                                        {mail.detail.snippet || "No snippet available"}
                                      </p>
                                      <p className="text-xs">
                                        {"Received:- "}
                                        {mail.detail.headers?.Date || "No date available"}
                                      </p>
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          ))
                        )}
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card bg-white p-4 border border-gray-200 rounded-lg shadow sm:p-6"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
                  <h1 className="text-xl" style={{ color: "#666666" }}>
                    CC
                  </h1>
                  {userNotFound ? (
                    <Select
                      style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                      className="basic-single mt-3"
                      classNamePrefix="select"
                      styles={customStyles1}
                      placeholder="Select a team member"
                      isDisabled={expandedMailId === null ? true : false}
                    />
                  ) : (
                    <Select
                      style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                      className="basic-single mt-3"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      isClearable={true}
                      isSearchable={true}
                      styles={customStyles1}
                      name="teamSelect"
                      isMulti
                      options={options} // Your options array here
                      onChange={handleAssignChange}
                      placeholder="Select a team member"
                      isDisabled={expandedMailId === null ? true : false}
                    />
                  )}
                </div>

                <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
                  <h1 className="text-xl" style={{ color: "#666666" }}>
                    Choose Template
                  </h1>
                  <select
                    className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleTemplateChange}
                    value={selectedTemplateId || ""}
                    style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                    disabled={expandedMailId === null ? true : false}
                  >

                    <option value="" disabled>Select Template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.template_name}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
                  <h1 className="text-xl" style={{ color: "#666666" }}>
                    Location
                  </h1>
                  <select
                    className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleLocationButton(e.target.value)}
                    value={locationId || ""}
                    style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                    disabled={expandedMailId === null ? true : false}
                  >
                    <option value="" disabled>Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.location}>
                        {location.location}
                      </option>
                    ))}
                  </select>


                </div>
                
                <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg ">
                  <h1 className="text-xl" style={{ color: "#666666" }}>
                    Stores
                  </h1>
                  <select
                    className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleStoreButton(e.target.value)}
                    value={storeId || ""}
                    style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                    disabled={expandedMailId === null ? true : false}
                  >
                    <option value="" disabled>Select Store</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.name}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
              
                <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
                  <h1 className="text-xl" style={{ color: "#666666" }}>
                    Collections
                  </h1>
                  <select
                    className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCollectionId}
                    onChange={handleSelectionChange}
                    style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                    disabled={expandedMailId === null ? true : false}
                  >
                    <option value="">Select a collection</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCollectionId && filteredProducts.length > 0 && (
                  <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
                    <h1 className="text-xl" style={{ color: "#666666" }}>
                      Model Number
                    </h1>
                    <select
                      className="form-select mt-3 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedProductId}
                      onChange={handleProductChange}
                      style={{ background: "#D9D9D9B2", color: "#ADADAD" }}
                    >
                      <option value="">Select a model</option>
                      {filteredProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4 ">
              <div
                className="card"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
          
                {selectedTemplateId ? (
                  <div className="col-md-12 w-full p-2 bg-white border-gray-200 rounded-lg sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="card shadow-none">
                      <div className="p-3">
                        {!editTemplate&&(
                          <p
                            className="small text-dark"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                              <div
                                dangerouslySetInnerHTML={{__html: finalTemplate,}}
                              />
                          </p>
                        )}                          
                        {editTemplate&&(
                            <textarea  
                              value={finalTemplate}
                              onChange={handleFinalTemplateChange}                            
                              style={{ whiteSpace: "pre-wrap", width:"100%",height:"80vh",
                                border:"1px solid black",borderRadius:"10px",padding:"5%" }}
                            />
                          )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: "3%",
                          marginRight: "3%",
                        }}
                      >
                        <form onSubmit={handleEmailSend}>
                          <button
                              type="button"
                              className="btn flex-1 py-2"
                              onClick={handleEditTemplate}
                              style={{
                                background: "#E2545E",
                                color: "white",
                                marginLeft: "1rem",
                              }}
                            >
                              {editTemplate ? "View" : "Edit"}
                            </button>
                          <button
                            type="submit"
                            className="btn flex-1 py-2"
                            style={{
                              background: "#E2545E",
                              color: "white",
                              marginLeft: "1rem",
                            }}
                            disabled={sendisLoading}
                          >
                            {sendisLoading ? "Please Wait..." : "Send"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "30%" }}>
                    <img
                      src="/media/result.png"
                      alt="No template selected"
                      style={{ width: "100%" }}
                    />
                    <p
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        paddingTop: "8%",
                        paddingBottom: "5%",
                      }}
                    >
                      Please Choose the template
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default  Home;