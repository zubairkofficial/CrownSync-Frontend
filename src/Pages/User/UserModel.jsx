import React, { useState, useEffect } from 'react';
import Helpers from '../../Config/Helpers';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserModel = () => {
    const [modelName, setModelName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [location, setLocation] = useState('');
    const [store, setStore] = useState('');
    const [link, setLink] = useState('');
    const [benefits, setBenefits] = useState('');
    const [features, setFeatures] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(''); // State to hold image URL
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [editingModelId, setEditingModelId] = useState(null);
    const [models, setModels] = useState([]);

    const fetchCollections = async () => {
        try {
            const url = Helpers.apiUrl;
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}collects`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setCollections(response.data.data || []);
            } else {
                setCollections([]);
            }
        } catch (error) {
            Helpers.toast('error', 'Error fetching collections. Please try again later.');
            setCollections([]);
        }
    };

    const fetchModels = async () => {
        try {
            const url = Helpers.apiUrl;
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}rolex_models`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setModels(response.data.data || []);
            } else {
                setModels([]);
            }
        } catch (error) {
            Helpers.toast('error', 'Error fetching models. Please try again later.');
            setModels([]);
        }
    };

    const handleEdit = (model) => {
        const baseUrl = Helpers.apiUrl.replace('/api', ''); // Ensure base URL is correct
        setModelName(model.name);
        setSlug(model.slug);
        setPrice(model.price);
        setStock(model.stock);
        setLocation(model.location);
        setStore(model.store);
        setLink(model.link);
        setBenefits(model.benefits);
        setFeatures(model.features);
        setSelectedCollection(model.collection_id);
        setEditingModelId(model.id);
        setImagePreview(model.image ? `${baseUrl}${model.image}` : ''); // Construct the full image URL
    };

    const handleDelete = async (modelId) => {
        toast.info(
            <div>
                <p>Are you sure you want to delete this model?</p>
                <button onClick={() => confirmDelete(modelId)} style={{ marginRight: '20px', color: 'red' }}>OK</button>
                <button onClick={() => toast.dismiss()} style={{ marginRight: '20px', color: 'blue' }}>Cancel</button>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: 'top-center',
                transition: Slide,
            }
        );
    };

    const confirmDelete = async (modelId) => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`${baseUrl}models/${modelId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.dismiss();
                Helpers.toast('success', 'Model deleted successfully');
                setModels((models) => models.filter((prod) => prod.id !== modelId));
            }
        } catch (error) {
            toast.dismiss();
            Helpers.toast('error', 'An error occurred during deletion');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const handleSave = async () => {
        const baseUrl = Helpers.apiUrl;
        const token = localStorage.getItem('token');

        if (!modelName.trim() || !slug.trim() || !selectedCollection || !price.trim() 
            || !stock.trim() || !store.trim() || !location.trim() || !link.trim() || !benefits.trim()
        || !features.trim())  {
            Helpers.toast('error', 'All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', modelName);
        formData.append('slug', slug);
        formData.append('collection_id', selectedCollection);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('store', store);
        formData.append('location', location);
        formData.append('link', link);
        formData.append('benefits', benefits);
        formData.append('features', features);

        if (image) formData.append('image', image);

        try {
            const response = editingModelId ?
                await axios.post(`${baseUrl}update-model/${editingModelId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }) :
                await axios.post(`${baseUrl}store-models`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (response.status === 200) {
                Helpers.toast('success', editingModelId ? 'Model updated successfully' : 'Model created successfully');
                setModelName('');
                setSlug('');
                setPrice('');
                setStock('');
                setLocation('');
                setStore('');
                setLink('');
                setBenefits('');
                setFeatures('');
                setImage(null);
                setImagePreview('');
                setSelectedCollection('');
                setEditingModelId(null);
                fetchModels();
            } else {
                Helpers.toast('error', 'Error saving model. Please try again later.');
            }
        } catch (error) {
            Helpers.toast('error', 'Error saving model. Please try again later.');
        }
    };

    useEffect(() => {
        fetchCollections();
        fetchModels();
    }, []);

    return (
        <div className='flex h-screen'>
            <Sidebar />
            <ToastContainer />
            <div className='container mx-auto flex flex-col md:flex-row gap-8 p-4' style={{ borderRadius: '20px', background: '#F9F9F9', marginTop: '2%' }}>
                {/* Form Section */}
                <div className='flex-1 m-7'>
                    <h2 className='text-3xl font-bold mb-4'>{editingModelId ? 'Edit Model' : 'Create Model'}</h2>
                    <div className='flex items-end justify-between space-x-2 mb-4'>
                        <div className='flex-1 flex flex-col space-y-2'>
                            <select
                                value={selectedCollection}
                                onChange={(e) => setSelectedCollection(e.target.value)}
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value=''>Select Collection...</option>
                                {collections.map((coll) => (
                                    <option key={coll.id} value={coll.id}>
                                        {coll.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type='text'
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                placeholder='Enter Model Name...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder='Enter Slug...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Enter Price...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                           <select
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value=''>Select Stock...</option>
                                <option value='available'>Available</option>
                                <option value='OutOfStock'>Out of Stock</option>
                            </select>

                            <input
                                type='text'
                                value={store}
                                onChange={(e) => setStore(e.target.value)}
                                placeholder='Enter Store...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder='Enter Location...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder='Enter Link...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={benefits}
                                onChange={(e) => setBenefits(e.target.value)}
                                placeholder='Enter Benefits...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='text'
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                placeholder='Enter Features...'
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='file'
                                onChange={handleImageChange}
                                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            {/* Image Preview Section */}
                            {imagePreview && (
                                <div className='mt-4'>
                                    <h3 className='text-xl font-semibold mb-2'>Image Preview:</h3>
                                    <img
                                        src={imagePreview}
                                        alt='Selected Model'
                                        className='rounded-md shadow-lg max-w-xs'
                                    />
                                </div>
                            )}
                        </div>
                        <div className='w-150'>
                            <button
                                onClick={handleSave}
                                className='bg-[#f36b74] !text-white font-bold px-4 py-2 rounded-md hover:bg-[#fa9198] transition-colors'
                            >
                                {editingModelId ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Models Table Section */}
                <div className='flex-1 m-6'>
                    <h2 className='text-3xl font-bold mb-4'>Models List</h2>
                    <table className='table-auto w-full border border-gray-300'>
                        <thead>
                            <tr className='bg-blue-100'>
                                <th className='border px-4 py-2'>#</th>
                                <th className='border px-4 py-2'>Name</th>
                                <th className='border px-4 py-2'>Slug</th>
                                <th className='border px-4 py-2'>Collection</th>
                                <th className='border px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.length > 0 ? (
                                models.map((prod, index) => (
                                    <tr key={index} className='hover:bg-gray-100'>
                                        <th className='border px-4 py-2'>{index + 1}</th>
                                        <td className='border px-4 py-2'>{prod.name}</td>
                                        <td className='border px-4 py-2'>{prod.slug}</td>
                                        <td className='border px-4 py-2'>{prod.collection_name}</td>
                                        <td className='border px-4 py-2'>
                                            <button className='p-2 hover:underline' onClick={() => handleEdit(prod)}><i className='fa-light fa-pencil'></i></button>
                                            <button className='p-2 hover:underline' onClick={() => handleDelete(prod.id)}><i className='fa-regular fa-trash'></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='5' className='text-center p-5'>No Models Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserModel;
