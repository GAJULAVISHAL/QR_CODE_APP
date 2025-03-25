import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userId: 0,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.email && formData.password && formData.userId) {
            console.log(formData);
            setLoading(true);
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/signup`,
                    formData
                );
                // Correctly use 'userId' from the backend response
                const userId = String(response.data.newUser.userId);
                console.log("UserID from response:", userId);
                // Store using a consistent key name, e.g., "userId"
                localStorage.setItem("userId", userId);
                setLoading(false);
                setStep(2);
            } catch (error) {
                setLoading(false);
                console.error("could not sign in", error);
            }
        } else {
            alert("Please fill in all fields.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {step === 1 ? (
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                        <p className="text-gray-600 text-sm">Fill in the details below to get started</p>
                        <p className="text-sm mt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#8B8B8D] hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="userId" className="block text-gray-700 text-sm">
                                User ID
                            </label>
                            <input
                                id="userId"
                                name="userId"
                                type="text"
                                placeholder="Enter your user ID"
                                value={formData.userId}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        userId: Number(e.target.value),
                                    }))
                                }
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-[#8B8B8D]  text-white py-2 rounded transition duration-300"
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                    {/* Card Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Account Created</h2>
                        <p className="text-gray-600">Your account has been successfully created</p>
                    </div>

                    {/* Card Content */}
                    <div className="mt-4">
                        <div className="flex items-start bg-green-50 border border-green-200 p-4 rounded flex-wrap">
                            {/* CheckCircle Icon */}
                            <svg
                                className="h-5 w-5 text-green-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
                            </svg>
                            <div className="ml-2 flex-1">
                                <p className="text-green-800 font-bold">Success!</p>
                                <p className="text-green-700">
                                    All your Passes and QR codes will be generated on this userId: <strong>{formData.userId}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/qrpage')}
                            className="w-full bg-transparent border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SignupForm;
