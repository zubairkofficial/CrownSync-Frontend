import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";

const Store = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [stores, setStores] = useState([]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            Helpers.toast("error", "Please enter a store name");
            return;
        }
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}add-store`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name })
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            Helpers.toast('success', "Store Saved Successfully!");
            setName("");
            fetchStores(); 
        }
        else {
            Helpers.toast("error", "Error saving store. Please try again later.");
        }
    };
  

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

                const fetchedStores = response.data.data || [];

             setStores(fetchedStores);
             Helpers.toast('success', "Fetch Stores Successfully!");
            } else {
                console.log("Received non-200 response:", response.status);
                setStores([]);  // Set to empty array on error
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            Helpers.toast("error", "Error saving store. Please try again later.");
            setStores([]);  // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);


    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />
            <div className="container mx-auto my-6 flex flex-col md:flex-row gap-8 p-4 bg-white shadow-lg rounded-lg">
                {/* Form Section */}
                <div className="flex-1 m-6">
                    <h2 className="text-3xl font-bold mb-4">Create Store</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                         
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Store Name..."
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
                    <h2 className="text-3xl font-bold mb-4">Stores List</h2>
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Store Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.length > 0 ? (
                                stores.map((store, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <th className="border px-4 py-2">{index + 1}</th>
                                        <td className="border px-4 py-2">{store.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="2">
                                        No stores found.
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

export default Store;
