import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoresAddress = ({ activeTab, setActiveTab }) => {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [editingLocationId, setEditingLocationId] = useState(null);

    const fetchStoresAddress = async () => {
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
                const fetchedLocations = response.data.data || [];
                setLocations(fetchedLocations);
            } else {
                setLocations([]);  // Set to empty array on error
            }
        } catch (error) {
            Helpers.toast("error", "Error fetching locations. Please try again later.");
            setLocations([]);  // Set to empty array on error
        }
    };
    const handleDelete = async (locationId) => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${baseUrl}delete-location/${locationId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.dismiss();
                Helpers.toast("success", "Location Deleted Successfully");
                setLocations((locations) => locations.filter((loc) => loc.id !== locationId));
            }
        } catch (error) {
            toast.dismiss();
            Helpers.toast("error", "An error occurred during deletion");
        }
    };

    const handleEdit = (loc) => {
        setLocation(loc.location);
        setEditingLocationId(loc.id);
    };

    const handleSave = async () => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        if (!location.trim()) {
            Helpers.toast("error", "Please enter a location name");
            return;
        }

        if (editingLocationId) {
            // Update existing location
            try {
                const response = await axios.put(`${baseUrl}update-location/${editingLocationId}`, {
                    location
                }, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    Helpers.toast("success", "Location Updated Successfully");
                    fetchStoresAddress();
                    setEditingLocationId(null);
                    setLocation("");
                } else {
                    Helpers.toast("error", "Error updating location. Please try again later.");
                }
            } catch (error) {
                Helpers.toast("error", "Error updating location. Please try again later.");
            }
        } else {
            // Add a new location
            try {
                const response = await fetch(`${baseUrl}add-location`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ location })
                });

                if (response.status === 200) {
                    Helpers.toast("success", "Location Saved Successfully");
                    setLocation("");
                    fetchStoresAddress();
                } else {
                    Helpers.toast("error", "Error saving location. Please try again later.");
                }
            } catch (error) {
                Helpers.toast("error", "Error saving location. Please try again later.");
            }
        }
    };

    useEffect(() => {
        fetchStoresAddress();
    }, []);

    useEffect(() => {
        if (activeTab === 'StoresAddress') {
            fetchStoresAddress();
        }
      }, [activeTab]);

    return (
        <>
        <ToastContainer />
            <div className="container mx-auto md:flex-row gap-8 p-4" style={{
                borderRadius: "20px",
                // background: "#F9F9F9",
                marginTop: "2%",
            }}>
                {/* Form Section */}
                <div className="flex-1 m-7">
                    <h2 className="text-3xl font-bold mb-4">{editingLocationId ? "Edit Location" : "Create Location"}</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location..."
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSave}
                            className="bg-[#f36b74] !text-white font-bold px-4 py-2 rounded-md hover:bg-[#fa9198] transition-colors"
                        >
                            {editingLocationId ? "Update" : "Submit"}
                        </button>
                    </div>
                </div>

                {/* Locations Table Section */}
                <div className="flex-1 m-6">
                    <h2 className="text-3xl font-bold mb-4">Locations List</h2>
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Location</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.length > 0 ? (
                                locations.map((loc, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <th className="border px-4 py-2">{index + 1}</th>
                                        <td className="border px-4 py-2">{loc.location}</td>
                                        <td className="border px-4 py-2">
                                            <button className="p-2 " onClick={() => handleEdit(loc)}>
                                            <i className="fa-light fa-pencil"></i>
                                            </button>
                                            <button className="p-2 " onClick={() => handleDelete(loc.id)}>
                                            <i className="fa-light fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="3">
                                        No locations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default StoresAddress;
