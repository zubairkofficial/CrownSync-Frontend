import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Helpers from "../../Config/Helpers";
import { Link, Navigate } from 'react-router-dom';
import { MailIcon, HomeIcon, PhoneIcon } from "@heroicons/react/solid";
import axios from "axios";
import Loader from "../Admin/Components/Loader";


function Profile() {
  useEffect(() => {
    document.title = "User Profile - Crownsync AI";
    // Optionally, set meta description or any other head elements here
    return () => {
      // This is where you can reset or change the title when the component unmounts if necessary
      document.title = "Crownsync Ai";
    };
  }, []);
  const username = localStorage.getItem("user");
  const user = JSON.parse(username);
  const myuser = user ? user.name : null;
  const myuseremail = user ? user.email : null;
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [locations, setLocations] = useState([]);
  const [stores, setStores] = useState([]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = Helpers.apiUrl
    const token = localStorage.getItem("token"); // Assuming you store your token in localStorage
    try {
      const response = await axios.post(`${url}update/profile`, { name, address, phone }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      // console.log('Profile updated:', response.data);
      Helpers.toast('success', 'Profile Updated Successfully!');
      window.location.reload();
      // Handle response data with your logic
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessages = Object.values(error.response.data.error).flat();
        Helpers.toast('error', errorMessages.join(', '));
      } else {
        Helpers.toast('error', 'An error occurred while updating profile.');
      }
    }

  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const url = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}profile`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("API Response:", response.data.data.profile);

          setProfile(response.data.data);
        } else {
          console.log("Received non-200 response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchDetail();
  }, []);

 // Fetch locations
 useEffect(() => {
  const fetchLocations = async () => {
    try {
      const url = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}fetch-locations`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("API locations:", response.data.data);
        setLocations(response.data.data);
      } else {
        console.log("Received non-200 response:", response.status);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  fetchLocations();
}, []);

// Fetch stores
useEffect(() => {
  const fetchStores = async () => {
    try {
      const url = Helpers.apiUrl;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}fetch-store`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("API stores:", response.data.data);
        setStores(response.data.data);
      } else {
        console.log("Received non-200 response:", response.status);
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  fetchStores();
}, []);


  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const [imagePreview, setImagePreview] = useState("/media/avatars/300-1.jpg"); // Placeholder for the user image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the preview image
        uploadImage(file); // Call the function to upload the image
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('profile', file); // 'profile' is the key expected by your Laravel backend

    const token = localStorage.getItem("token"); // Retrieve your auth token from storage
    const url = Helpers.apiUrl
    try {
      const response = await axios.post(`${url}update/profile/pic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile picture updated:', response.data);
      window.location.reload();
      // Handle response here, perhaps showing a success message
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Handle error here, perhaps showing an error message
    }
  };
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();  // Prevent the default form submit action

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token"); // Adjust how you handle auth tokens as necessary
    const url = Helpers.apiUrl
    try {
      const response = await axios.post(`${url}update/password`, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      // Assuming the response includes some message or data
      setMessage(response.data.message || 'Password successfully updated.');
      Helpers.toast('success', 'Password Updated successfuly')
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data && error.response.data.error) {

        Helpers.toast('error', error.response.data.error);
      } else {
        Helpers.toast('error', 'An error occurred while updating profile.');
      }
    }
  };
  const [isGoogle, setIsGoogle] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const url = Helpers.apiUrl;
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${url}check-login`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.data) {
          console.log("my response:", response.data.data.contact);
          setIsGoogle(response.data.data);
          setUserNotFound(false);
        } else {
          // If the data is empty or null which should ideally not occur in this branch
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

  return (
    <div class="flex text-gray-900 h-[100vh]">
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
          <div className="col-md-12">
            <h1 className="text-3xl font-bold mb-5">Profile</h1>
            <div className="bg-white rounded-lg  p-5 flex">
              {/* <div> */}
              {profile ? (
                <div className="flex">
                  <div className="flex-shrink-0">
                    {profile && profile.profile ? (
                      <img
                        className="rounded-full"
                        src={`${Helpers.basePath}/assets/${profile.profile}`}
                        alt="User Profile"
                        style={{ width: "120px", height: "120px" }}
                      />
                    ) : (
                      <img
                        className="rounded-full"
                        src="/media/user.png"
                        alt="Default Avatar"
                        style={{ width: "120px", height: "120px" }}
                      />
                    )}
                  </div>
                  <div className="ml-5 flex-grow">
                    <h1 className="text-2xl font-bold mb-3">{profile.name}</h1>
                    <div className="flex items-center text-gray-900 mb-2">
                      <i className="fas fa-envelope text-indigo-500 mr-2"></i>
                      <span className="font-bold mr-1">Responding Email:</span>
                      {isGoogle ? <p>{isGoogle.contact}</p> : ''}
                    </div>
                    <div className="flex justify-between " style={{paddingRight:"10px"}}>
                      <div className="flex-grow">
                        <div className="flex items-center text-gray-900 mb-2">
                          <i className="fas fa-house text-indigo-500 mr-2"></i>
                          <span className="font-bold mr-1">Address:</span>
                          {profile.address}
                        </div>
                        <div className="flex items-center text-gray-900 mb-2">
                          <i className="fas fa-phone text-indigo-500 mr-2"></i>
                          <span className="font-bold mr-1">Phone Number:</span>
                          {profile.phone}
                        </div>
                      </div>
                      <button
                        onClick={toggleEditMode}
                        className="btn py-2 px-4"
                        style={{
                          background: "#E2545E",
                          color: "white",
                          position: "absolute",
                          left: "80%",
                          top: "25%",
                          transform: "translate(-50%,-50%)"
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Loading profile data...</div>

              )}
              {/* </div> */}
            </div>

          
           

          </div>
        </div>
        {editMode && (
          <div
            className="mt-5 bg-white rounded-lg p-5"
            style={{ background: "white" }}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label
                  className="text-gray-900 text-l font-bold"
                  style={{ width: "30%" }}
                >
                  Change Profile Image:
                </label>
                <div className="relative flex-grow" style={{ width: "30%" }}>
                  {profile && profile.profile ? (
                    <img
                      className="rounded"
                      src={`${Helpers.basePath}/assets/${profile.profile}`}
                      alt="User Profile"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <img
                      className="rounded"
                      src="/media/user.png"
                      alt="Default Avatar"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  {/* <img
          src={`${Helpers.basePath}/assets/${profile.profile}`}
          alt="Profile"
          className="rounded"
          style={{ width: "100px", height: "100px" }}
        /> */}
                  <label
                    htmlFor="image-upload"
                    className="absolute top-0 left-0 p-1 bg-white bg-opacity-75 rounded-full cursor-pointer"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <i className="fa fa-pencil" style={{ color: "black" }}></i>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4" style={{ margin: "2% 0" }}>
                  <label className="text-gray-700 text-l font-bold" style={{ width: "30%" }}>
                    Name:
                  </label>
                  <input
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4" style={{ margin: "2% 0" }}>
                  <label className="text-gray-700 text-l font-bold" style={{ width: "30%" }}>
                    Address:
                  </label>
                  <input
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Address"
                    value={address}
                    onChange={handleAddressChange}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4" style={{ margin: "2% 0" }}>
                  <label className="text-gray-900 text-l font-bold" style={{ width: "30%" }}>
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handlePhoneNumberChange}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4" style={{ margin: "3% 0" }}>
                  <label
                    className="text-gray-900 text-sm font-bold"
                    style={{ width: "30%" }}
                  ></label>
                  <button
                    type="submit"
                    className="mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
                    style={{ background: "#E2545E", color: "white" }}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-900 text-l font-bold" style={{ width: "30%" }}>
                    Current Password:
                  </label>
                  <input
                    type="password"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-gray-900 text-l font-bold" style={{ width: "30%" }}>
                    New Password:
                  </label>
                  <input
                    type="password"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-gray-900 text-l font-bold" style={{ width: "30%" }}>
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: "70%", background: "#fbfbfb" }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label
                    className="text-gray-900 text-sm font-bold"
                    style={{ width: "30%" }}
                  ></label>
                  <button
                    type="submit"
                    className="mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
                    style={{ background: "#E2545E", color: "white" }}
                  >
                    Update Password
                  </button>
                </div>
                {/* {message && <p>{message}</p>}   */}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
