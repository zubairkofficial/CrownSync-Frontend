import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";
import { toast, ToastContainer, Slide } from 'react-toastify';
const ScopSettings = () => {
    const [query, setQuery] = useState('');
    const [queries, setQueries] = useState([]);
   
    const fetchQueries = async () => {
        try {
            const url = Helpers.apiUrl;
            const token = localStorage.getItem("token");
            const response = await axios.get(`${url}admin/scop_settings`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const fetchedQueries = response.data.data || [];
                Helpers.toast('success','Fetched Data Successfully');
                setQueries(fetchedQueries);
            } else {
                console.log("Received non-200 response:", response.status);
                setQueries([]);  // Set to empty array on error
            }
        } catch (error) {
            console.error("Error fetching query data:", error);
            setQueries([]);  // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleSubmit = async () => {
        if (!query.trim()) {
            Helpers.toast("error", "Please enter a query");
            return;
        }

        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}admin/scop_settings`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            Helpers.toast('success', "Query Saved Successfully!");
            setQuery("");
            fetchQueries();  // Update the list after successful submission
        } else {
            Helpers.toast("error", "Error saving Query. Please try again later.");
        }
    };

    const handleDelete = async (scopeId) => {

        toast.info(
            <div>
                <p>Are you sure you want to delete this scope?</p>
                <button onClick={() => confirmDelete(scopeId)} style={{ marginRight: '20px', color: 'red' }}>OK</button>
                <button onClick={() => toast.dismiss()} style={{ marginRight: '20px', color: 'blue' }}>Cancel</button>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                transition: Slide,
            }
        );
      };
      
      const confirmDelete = async (scopeId) => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem("token");
      
        try {
            const response = await axios.delete(`${baseUrl}admin/scop_settings/${scopeId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
      
            if (response.status === 200) {
                // console.log("Deleted successfully");
                toast.dismiss();
                Helpers.toast("success","Scope Deleted Successfully");
                setQueries((queries) =>
                    queries.filter((scope) => scope.id !== scopeId)
                );
            }
        } catch (error) {
            // console.error("An error occurred during deletion:", error);
            toast.dismiss();
            Helpers.toast("error","An error occurred during deletion");
        }
      };

    return (
        <div className="flex h-screen ">
            <Sidebar />
            <ToastContainer />
            <div className="container mx-auto flex flex-col md:flex-row gap-8 p-4"  style={{
          borderRadius: "20px",
          background: "#F9F9F9",
          marginTop: "2%",
        }}>
                {/* Form Section */}
                <div className="flex-1 m-7">
                    <h2 className="text-3xl font-bold mb-4">Create Scope Settings</h2>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter Query..."
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
                    <h2 className="text-3xl font-bold mb-4">Settings List</h2>
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Query</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.length > 0 ? (
                                queries.map((loc, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <th className="border px-4 py-2">{index + 1}</th>
                                        <td className="border px-4 py-2">{loc.query}</td>
                                        <td> <button
                      className="p-4"
                      onClick={() => handleDelete(loc.id)}
                    >
                      <i className="fa-light fa-trash-can"></i>
                    </button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2" colSpan="2">
                                        No query found.
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

export default ScopSettings;
