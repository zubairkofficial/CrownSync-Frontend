import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Collection = ({ activeTab, setActiveTab }) => {
    
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [collections, setCollections] = useState([]);
    const [editingCollectionId, setEditingCollectionId] = useState(null);
    const fetchCollections = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}collects`, Helpers.authHeaders);
            if (response.status === 200) {
                const fetchedCollections = response.data.data || [];
                setCollections(fetchedCollections);
            } else {
                setCollections([]);  // Set to empty array on error
            }
        } catch (error) {
            Helpers.toast('error', 'Error fetching collections. Please try again later.');
            setCollections([]);  // Set to empty array on error
        }
    };

    const handleDelete = async (collectionId) => {
        try {
            const response = await axios.delete(`${Helpers.apiUrl}collects/${collectionId}`, Helpers.authHeaders);
            if (response.status === 200) {
                Helpers.toast('success', 'Collection Deleted Successfully');
                setCollections((collections) => collections.filter((coll) => coll.id !== collectionId));
            }
        } catch (error) {
            Helpers.toast('error', 'An error occurred during deletion');
        }
    };

    const handleEdit = (coll) => {
        setName(coll.name);
        setSlug(coll.slug);
        setEditingCollectionId(coll.id);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Helpers.toast('error', 'Please enter name');
            return;
        }
        if (!slug.trim()) {
            Helpers.toast('error', 'Please enter and slug');
            return;
        }

        if (editingCollectionId) {
            // Update existing collection
            try {
                const response = await axios.put(`${Helpers.apiUrl}update-collection/${editingCollectionId}`,{ name, slug }, Helpers.authHeaders); 
                if (response.status === 200) {
                    Helpers.toast('success', 'Collection Updated Successfully');
                    fetchCollections();
                    setEditingCollectionId(null);
                    setName('');
                    setSlug('');
                } else {
                    Helpers.toast('error', 'Error updating collection. Please try again later.');
                }
            } catch (error) {
                Helpers.toast('error', 'Error updating collection. Please try again later.');
            }
        } else {
            // Add a new collection
            try {
                const response = await axios.post(`${Helpers.apiUrl}store-collection`,{ name, slug }, Helpers.authHeaders);
                if (response.status === 200) {
                    Helpers.toast('success', 'Collection Saved Successfully');
                    setName('');
                    setSlug('');
                    fetchCollections();
                } else {
                    Helpers.toast('error', 'Error saving collection. Please try again later.');
                }
            } catch (error) {
                Helpers.toast('error', 'Error saving collection. Please try again later.');
            }
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);
    useEffect(() => {
        if (activeTab === 'Collections') {
            fetchCollections();
        }
      }, [activeTab]);

    return (
        <>
        <ToastContainer />
            <div className='container mx-auto md:flex-row gap-8 p-4' style={{
                borderRadius: '20px',
                // background: '#F9F9F9',
                marginTop: '2%',
            }}>
                {/* Form Section */}
                <div className='flex-1 m-7'>
                    <h2 className='text-3xl font-bold mb-4'>{editingCollectionId ? 'Edit Collection' : 'Create Collection'}</h2>
                    {/* Use a flex container with justify-between to align inputs and button */}
                    <div className='flex items-end justify-between space-x-2 mb-4'>
                        <div className='flex-1 flex flex-col space-y-2'>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter Name...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder='Enter Slug...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        
                    </div>
                    <div className='w-150 flex justify-end'>
                            <button
                                onClick={handleSave}
                                className='bg-[#f36b74] !text-white font-bold px-4 py-2 rounded-md hover:bg-[#fa9198] transition-colors'
                            >
                                {editingCollectionId ? 'Update' : 'Submit'}
                            </button>
                        </div>
                </div>


                {/* Collections Table Section */}
                <div className='flex-1 m-6'>
                    <h2 className='text-3xl font-bold mb-4'>Collections List</h2>
                    <table className='table-auto w-full border border-gray-300'>
                        <thead>
                            <tr className='bg-blue-100'>
                                <th className='border px-4 py-2'>#</th>
                                <th className='border px-4 py-2'>Name</th>
                                <th className='border px-4 py-2'>Slug</th>
                                <th className='border px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.length > 0 ? (
                                collections.map((coll, index) => (
                                    <tr key={index} className='hover:bg-gray-100'>
                                        <th className='border px-4 py-2'>{index + 1}</th>
                                        <td className='border px-4 py-2'>{coll.name}</td>
                                        <td className='border px-4 py-2'>{coll.slug}</td>
                                        <td className='border px-4 py-2'>
                                            <button className='p-2 hover:underline' onClick={() => handleEdit(coll)}> <i className="fa-light fa-pencil"></i></button>
                                            <button className='p-2 hover:underline' onClick={() => handleDelete(coll.id)}><i className="fa-light fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className='border px-4 py-2' colSpan='4'>
                                        No collections found.
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

export default Collection;
