import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";

const Location = () => {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

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
                const fetchedLocations = response.data.data || [];
                console.log("API locations:", fetchedLocations);
                setLocations(fetchedLocations);
            } else {
                console.log("Received non-200 response:", response.status);
                setLocations([]);  // Set to empty array on error
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            setLocations([]);  // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleSubmit = async () => {
        if (!location.trim()) {
            Helpers.toast("error", "Please enter a location");
            return;
        }

        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}add-location`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ location }),
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            Helpers.toast('success', "Location Saved Successfully!");
            setLocation("");
            fetchLocations();  // Update the list after successful submission
        } else {
            Helpers.toast("error", "Error saving location. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />
            <div className="container mx-auto my-6 flex flex-col md:flex-row gap-8 p-4 bg-white shadow-lg rounded-lg">
                {/* Form Section */}
                <div className="flex-1 m-6">
                    <h2 className="text-3xl font-bold mb-4">Create Location</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location..."
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-[#f36b74] !text-white font-bold px-4 py-2 rounded-md hover:bg-[#fa9198] transition-colors"
                        >
                            Submit
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
                            </tr>
                        </thead>
                        <tbody>
                            {locations.length > 0 ? (
                                locations.map((loc, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <th className="border px-4 py-2">{index + 1}</th>
                                        <td className="border px-4 py-2">{loc.location}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="2">
                                        No locations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Location;
