import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Store = ({ activeTab, setActiveTab }) => {
    const [name, setName] = useState('');
    const [stores, setStores] = useState([]);
    const [editingStoreId, setEditingStoreId] = useState(null);

    const handleDelete = async (storeId) => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${baseUrl}delete-store/${storeId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.dismiss();
                Helpers.toast("success", "Store Deleted Successfully");
                setStores((stores) => stores.filter((store) => store.id !== storeId));
            }
        } catch (error) {
            toast.dismiss();
            Helpers.toast("error", "An error occurred during deletion");
        }
    };

    const handleEdit = (store) => {
        setName(store.name);
        setEditingStoreId(store.id);
    };

    const handleSave = async () => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");

        if (!name.trim()) {
            Helpers.toast("error", "Please enter a store name");
            return;
        }

        if (editingStoreId) {
            // Update existing store
            try {
                const response = await axios.put(`${baseUrl}update-store/${editingStoreId}`, {
                    name
                }, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    Helpers.toast("success", "Store Updated Successfully");
                    fetchStores();
                    setEditingStoreId(null);
                    setName("");
                } else {
                    Helpers.toast("error", "Error updating store. Please try again later.");
                }
            } catch (error) {
                Helpers.toast("error", "Error updating store. Please try again later.");
            }
        } else {
            // Add a new store
            try {
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
                    Helpers.toast("success", "Store Saved Successfully");
                    setName("");
                    fetchStores();
                } else {
                    Helpers.toast("error", "Error saving store. Please try again later.");
                }
            } catch (error) {
                Helpers.toast("error", "Error saving store. Please try again later.");
            }
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
                // Helpers.toast("success", "Fetch Stores Successfully");
            } else {
                setStores([]); // Set to empty array on error
            }
        } catch (error) {
            Helpers.toast("error", "Error fetching stores. Please try again later.");
            setStores([]); // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);
    useEffect(() => {
        if (activeTab === 'Stores') {
            fetchStores();
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
                    <h2 className="text-3xl font-bold mb-4">{editingStoreId ? "Edit Store" : "Create Store"}</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Store Name..."
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSave}
                            className="bg-[#f36b74] !text-white font-bold px-4 py-2 rounded-md hover:bg-[#fa9198] transition-colors"
                        >
                            {editingStoreId ? "Update" : "Submit"}
                        </button>
                    </div>
                </div>

                {/* Stores Table Section */}
                <div className="flex-1 m-6">
                    <h2 className="text-3xl font-bold mb-4">Stores List</h2>
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Store Name</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.length > 0 ? (
                                stores.map((store, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <th className="border px-4 py-2">{index + 1}</th>
                                        <td className="border px-4 py-2">{store.name}</td>
                                        <td className="border px-4 py-2">
                                            <button className="p-2 " onClick={() => handleEdit(store)}>
                                            <i className="fa-light fa-pencil"></i>
                                            </button>
                                            <button className="p-2 " onClick={() => handleDelete(store.id)}>
                                            <i className="fa-light fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="3">
                                        No stores found.
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

export default Store;
