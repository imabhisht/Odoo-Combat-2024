// import React, { useState } from 'react';
import CrimeLocation from './CrimeLocation';
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SetViewOnClick = ({ animateRef, setCenter }) => {
    const map = useMapEvent('click', (e) => {
        setCenter([e.latlng.lat, e.latlng.lng]);
        console.log(e.latlng.lat , e.latlng.lng)
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false,
        });
    });

    return null;
};






const Form = ({ user }) => {

    const [center, setCenter] = useState([20, 0]);
    const [data, setData] = useState([]);
    const animateRef = useRef(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        name: 'You are here',
                        location: [position.coords.latitude, position.coords.longitude],
                    };
                    setCenter(userLocation.location);
                    setData((prevData) => [...prevData, userLocation]);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);







    const [formData, setFormData] = useState({
        title: '',
        type: '',
        description: '',
        isAnonymous: false,
        images: [],
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user?.id || null;
        const reportData = { ...formData, userId };
        console.log(reportData);
        // Here you would send reportData to the backend
    };

    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <>


                            <>
                                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <SetViewOnClick animateRef={animateRef} setCenter={setCenter} />

                                    {data.map((point, index) => (
                                        <Marker key={index} position={center}>
                                            <Popup>{point.name}</Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </>

















                        </>
                    </div>
                    <form
                        className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Report the crime</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">
                            Data will be shared for crime investigations.
                        </p>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="type" className="leading-7 text-sm text-gray-600">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            >
                                <option value="">Select type</option>
                                <option value="Vandalism">Vandalism</option>
                                <option value="Theft">Theft</option>
                                <option value="Assault">Assault</option>
                                <option value="Murder">Murder</option>
                                <option value="Robbery">Robbery</option>
                            </select>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            ></textarea>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="images" className="leading-7 text-sm text-gray-600">Images</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                onChange={handleImageChange}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        {user.id && (
                            <div className="relative mb-4">
                                <label htmlFor="isAnonymous" className="leading-7 text-sm text-gray-600">
                                    Post Anonymously
                                </label>
                                <input
                                    type="checkbox"
                                    id="isAnonymous"
                                    name="isAnonymous"
                                    checked={formData.isAnonymous}
                                    onChange={handleInputChange}
                                    className="ml-2"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Submit
                        </button>
                        <p className="text-xs text-gray-500 mt-3">Your report helps in crime investigations.</p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Form;
