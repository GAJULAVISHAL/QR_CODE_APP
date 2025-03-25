import { useState, useEffect } from 'react';
import { Passes } from '../components/Passes';
import { Event } from '../hooks';
import axios from "axios"
import Navbar from '../components/Navbar';
import WhiteBlueTicket from '../components/card';


export default function QRCodePassGenerator() {
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    // Initialize form data with userId as a number
    const [formData, setFormData] = useState({
        userId: 0,
        personName: '',
        age: 0,
        eventName: '',
        price: 0.00,
        eventDate: '',
        bookingDate: new Date().toISOString().split('T')[0]
    });
    const [qrCode, setQrCode] = useState("");
    const [eventLoading, setEventLoading] = useState(false)
    const [events, setEvents] = useState<Event[]>([]);

    const [newEvent, setNewEvent] = useState({
        name: '',
        price: 0.0,
        date: ''
    });

    // On mount, get the userId from localStorage and update formData as a number.
    useEffect(() => {
        const storedUserId = Number(localStorage.getItem("userId") || 0);
        setFormData(prev => ({
            ...prev,
            userId: storedUserId
        }));
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`).then(response => {
            setEvents(response.data.events)
        })
    }, []);

    const handleEventChange = (e: any) => {
        const selectedEvent = events.find(event => event.name === e.target.value);
        setFormData({
            ...formData,
            eventName: e.target.value,
            price: selectedEvent ? selectedEvent.price : 0,
            eventDate: selectedEvent ? selectedEvent.date : ''
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generatePass = async () => {
        console.log(formData);
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/generate-pass`,
                formData
            );
            const qrCodeUrl = response.data.pass.qrCodeUrl;
            setQrCode(qrCodeUrl);
            setStep(2);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error generating pass:", error);
        }
    };

    // Handlers for the "Create Event" form
    const handleNewEventChange = (e: any) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addNewEvent = async (e: any) => {
        e.preventDefault();
        // Simple validation for new event
        if (newEvent.name && newEvent.price && newEvent.date) {
            setEventLoading(true)
            try {
                const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addevent`, newEvent)
                const event = responce.data.event
                setEvents(prev => [...prev, {
                    name: event.name,
                    price: event.price,
                    date: event.date
                }]);
                setSuccess(true)
                setNewEvent({ name: '', price: 0.00, date: '' });
                setEventLoading(false)
            } catch (error) {
                setEventLoading(false)
                console.error("cannot add Event", error)
            }
        }
    };

    return (
        <div className="flex flex-col items-center  pt-8 min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex justify-around items-center mb-4 bg-[#F4F4F5] p- min-w-[60%] rounded-xl shadow-md">
                <div>
                    <button
                        className={`px-3 py-1 rounded text-sm font-medium text-[#8B8B8D]  transition-colors ${(activeTab === 1) ? 'bg-white p-1.5' : ''}`}
                        onClick={() => {
                            setStep(1);
                            setActiveTab(1);
                            // Re-fetch the userId from localStorage as a number when creating a new pass
                            const storedUserId = Number(localStorage.getItem("userId") || 0);
                            setFormData({
                                userId: storedUserId,
                                personName: '',
                                age: 0,
                                eventName: '',
                                price: 0.00,
                                eventDate: '',
                                bookingDate: new Date().toISOString().split('T')[0]
                            });
                            setQrCode('');
                        }}
                    >
                        Create New Pass
                    </button>
                </div>
                <div className={` p-2 `}>
                    <button
                        className={`px-3 py-1 rounded text-sm font-medium text-[#8B8B8D]  transition-colors ${(activeTab === 2) ? 'bg-white p-1.5' : ''}`}
                        onClick={() => setActiveTab(2)}
                    >
                        Your Passes
                    </button>
                </div>

                <button
                    className={`px-3 py-1 rounded text-sm font-medium text-[#8B8B8D]  transition-colors ${(activeTab === 3) ? 'bg-white p-1.5' : ''}`}
                    onClick={() => setActiveTab(3)}
                >
                    Create Event
                </button>
            </div>
            {
                activeTab === 1 && <div className="max-w-[750px] mx-auto p-5 bg-white rounded-lg shadow-md border border-gray-100">
                    {step === 1 && (
                        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <h2 className="text-base font-medium mb-3 text-gray-700">Pass Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Person Name</label>
                                    <input
                                        type="text"
                                        name="personName"
                                        value={formData.personName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8B8B8D] focus:border-[#8B8B8D]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Enter age"
                                        className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8B8B8D] focus:border-[#8B8B8D]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Event</label>
                                    <select
                                        name="eventName"
                                        value={formData.eventName}
                                        onChange={handleEventChange}
                                        className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8B8B8D] focus:border-[#8B8B8D] bg-white"
                                    >
                                        <option value="">Select an event</option>
                                        {events.map((event, index) => (
                                            <option key={index} value={event.name}>{event.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            readOnly
                                            className="w-full p-2 text-sm border border-gray-200 rounded bg-gray-50 text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Event Date</label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            readOnly
                                            className="w-full p-2 text-sm border border-gray-200 rounded bg-gray-50 text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Booking Date</label>
                                    <input
                                        type="date"
                                        name="bookingDate"
                                        value={formData.bookingDate}
                                        readOnly
                                        className="w-full p-2 text-sm border border-gray-200 rounded bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>
                            {loading ? (
                                <div className="flex items-center justify-center mt-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#8B8B8D]"></div>
                                </div>
                            ) : (
                                <button
                                    onClick={generatePass}
                                    disabled={!formData.personName || !formData.age || !formData.eventName}
                                    className={`w-full mt-4 bg-[#8B8B8D] text-white py-2 rounded transition-colors text-sm font-medium ${(!formData.personName || !formData.age || !formData.eventName) ? 'cursor-not-allowed' : ''}`}
                                >
                                    Generate Pass
                                </button>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-4 border lg:w-[700px] border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                {/* Booking Details */}
                                <WhiteBlueTicket pass={{
                                    id: 0,
                                    personName: formData.personName,
                                    eventName: formData.eventName,
                                    price: formData.price,
                                    eventDate: formData.eventDate,
                                    qrCodeUrl: qrCode
                                }} />
                            </div>
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium">
                                    <a href={qrCode} download="qrCode.png">Download</a>
                                </button>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        const storedUserId = Number(localStorage.getItem("userId") || 0);
                                        setFormData({
                                            userId: storedUserId,
                                            personName: '',
                                            age: 0,
                                            eventName: '',
                                            price: 0.0,
                                            eventDate: '',
                                            bookingDate: new Date().toISOString().split('T')[0],
                                        });
                                        setQrCode('');
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
                                >
                                    DONE
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            }

            {activeTab === 2 && <Passes />}
            {activeTab === 3 &&
                <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-100 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Add New Event</h2>
                    <form onSubmit={addNewEvent} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Event Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newEvent.name}
                                onChange={handleNewEventChange}
                                placeholder="Enter event name"
                                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={newEvent.price}
                                onChange={(e) => {
                                    const parsedValue = parseFloat(e.target.value);
                                    setNewEvent(prev => ({
                                        ...prev,
                                        price: parsedValue
                                    }));
                                }}
                                placeholder="Enter event price"
                                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Event Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleNewEventChange}
                                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div>
                        <div className="flex justify-end items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setNewEvent({ name: '', price: 0.00, date: '' })}
                                className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            {eventLoading ? (<div className="flex items-center justify-center mt-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#8B8B8D]"></div>
                            </div>) :
                                (<button
                                    type="submit"
                                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
                                >
                                    Add Event
                                </button>)
                            }
                        </div>
                        {
                            success && (
                                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md flex items-center justify-between">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Event Added Successfully!
                                    </span>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-green-700 hover:text-green-900"
                                    >
                                        ×
                                    </button>
                                </div>
                            )
                        }
                    </form>
                </div>
            }
        </div >
    );
}
