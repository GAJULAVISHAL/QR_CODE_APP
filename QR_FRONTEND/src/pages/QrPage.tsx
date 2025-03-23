import { useState } from 'react';
import { Passes } from '../components/Passes';
import axios from "axios"


export default function QRCodePassGenerator() {
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        userId: userId,
        personName: '',
        age: 0,
        eventName: '',
        price: 0.00,
        eventDate: '',
        bookingDate: new Date().toISOString().split('T')[0]
    });
    const [qrCode, setQrCode] = useState("");

    const events = [
        { name: 'Concert', price: 50.00, date: '2025-04-15' },
        { name: 'Sports Game', price: 75.00, date: '2025-05-10' },
        { name: 'Conference', price: 100.00, date: '2025-06-20' },
        { name: 'Exhibition', price: 25.00, date: '2025-07-05' }
    ];

    const handleNext = () => {
        if (userId.trim()) {
            localStorage.setItem("userID", userId)
            setStep(2);
        }
    };

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
        console.log(formData)
        // setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-pass`,formData);
            setLoading(false);
            const qrCode = response.data.pass.qrCodeUrl;
            setQrCode(qrCode);
            setStep(3);
        } catch (error) {
            setLoading(false);
            console.error("Error generating pass:", error);
        }
    };

    return (
        <div className='flex flex-col items-center pt-8 min-h-screen bg-gray-100'>
            <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">QR Code Pass Generator</h1>
            <div className="flex justify-around items-center mb-4 bg-white pb-2 min-w-[60%] rounded-lg shadow-md">
                <button
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors text-[#8B8B8D] hover:text-blue-500`}
                    onClick={() => {
                        setStep(1);
                        setActiveTab(1)
                        setUserId('');
                        setFormData({
                            userId: '',
                            personName: '',
                            age: 0,
                            eventName: '',
                            price: 0.00,
                            eventDate: '',
                            bookingDate: new Date().toISOString().split('T')[0]
                        });
                    }}
                >
                    Create New Pass
                </button>
                <button className="px-3 py-1 rounded text-sm font-medium text-[#8B8B8D] hover:text-blue-500 transition-colors"
                    onClick={() => setActiveTab(2)}
                >
                    Your Passes
                </button>
            </div>
            {activeTab === 1 && (<>
                <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-md border border-gray-100">


                    {step === 1 && (
                        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <h2 className="text-base font-medium mb-3 text-gray-700">User ID</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                        setFormData(prev => ({
                                            ...prev,
                                            userId: e.target.value
                                        }));
                                    }}
                                    placeholder="Enter user ID"
                                    className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8B8B8D] focus:border-[#8B8B8D]"
                                />
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={!userId.trim()}
                                className={`w-full text-sm bg-[#8B8B8D]  text-white py-2 rounded transition-colors mt-3 font-medium ${!userId.trim() ? ' cursor-not-allowed' : ''}`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {step === 2 && (
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

                            {
                                loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={generatePass}
                                        disabled={!formData.personName || !formData.age || !formData.eventName}
                                        className={`w-full mt-4 bg-[#8B8B8D]  text-white py-2 rounded transition-colors text-sm font-medium ${(!formData.personName || !formData.age || !formData.eventName) ? 'cursor-not-allowed' : ''}`}
                                    >
                                        Generate Pass
                                    </button>
                                )
                            }
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                {/* Left Side - Details */}
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Booking Details</h2>
                                    <div className=" p-4 rounded bg-white shadow-lg">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                                            <p className="text-gray-600">User ID:</p>
                                            <p className="font-medium">{userId}</p>

                                            <p className="text-gray-600">Name:</p>
                                            <p className="font-medium">{formData.personName}</p>

                                            <p className="text-gray-600">Age:</p>
                                            <p className="font-medium">{formData.age}</p>

                                            <p className="text-gray-600">Event:</p>
                                            <p className="font-medium">{formData.eventName}</p>

                                            <p className="text-gray-600">Price:</p>
                                            <p className="font-medium">${formData.price}</p>

                                            <p className="text-gray-600">Event Date:</p>
                                            <p className="font-medium">{formData.eventDate}</p>

                                            <p className="text-gray-600">Booking Date:</p>
                                            <p className="font-medium">{formData.bookingDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - QR Code */}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Your QR Code</h2>
                                    <div className="w-48 h-48 bg-white flex items-center justify-center mb-4 p-2 shadow-sm rounded">
                                        <img src={qrCode} alt="QR Code" />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium">
                                    <a href={qrCode} download="qrCode.png">Download</a>
                                </button>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setUserId('');
                                        setFormData({
                                            userId: '',
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
                                    Create New
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>)}

            {activeTab === 2 && (
                <Passes />
            )}
        
        </div>
    );
}