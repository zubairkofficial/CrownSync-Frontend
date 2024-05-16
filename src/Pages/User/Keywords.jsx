import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from "axios";
import { toast, ToastContainer, Slide } from 'react-toastify';
const Keywords = ({ activeTab, setActiveTab }) => {
    const [query, setQuery] = useState('');
    const [queries, setQueries] = useState([]);
    
    const fetchQueries = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}admin/scop_settings`, Helpers.authHeaders);
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
    
    useEffect(() => {
        if (activeTab === 'Keywords') {
            fetchQueries();
      }
    }, [activeTab]);

    const handleSubmit = async () => {
        if (!query.trim()) {
            Helpers.toast("error", "Please enter a query");
            return;
        }
        const response = await axios.post(`${Helpers.apiUrl}admin/scop_settings`,{ query }, Helpers.authHeaders);
        if (response.status === 200) {
            Helpers.toast('success', "Query Saved Successfully!");
            setQuery("");
            fetchQueries();  // Update the list after successful submission
        } else {
            Helpers.toast("error", "Error saving Query. Please try again later.");
        }
    };
      
      const handleDelete = async (scopeId) => {
        try {
            const response = await axios.delete(`${Helpers.apiUrl}admin/scop_settings/${scopeId}`, Helpers.authHeaders);      
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
        <>
          <ToastContainer />
            <div className="container mx-auto md:flex-row gap-8 p-4"  style={{
          borderRadius: "20px",
        //   background: "#F9F9F9",
          marginTop: "2%",
        }}>
                {/* Form Section */}
                <div className="flex-1 m-7">
                    <h2 className="text-3xl font-bold mb-4">Create Keywords</h2>
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
                    <h2 className="text-3xl font-bold mb-4">Keywords List</h2>
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
        </>
    );
};

export default Keywords;
