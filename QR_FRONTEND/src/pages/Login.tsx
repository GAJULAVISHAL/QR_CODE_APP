import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          formData
        );
        const userId = String(response.data.user.userId);
        localStorage.setItem("userId", userId);
        navigate('/qrpage');
      } catch (error) {
        console.error("Could not sign in", error);
        setError("Failed to sign in. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Login to your account</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                className="w-full bg-[#8B8B8D] text-white py-2 rounded transition duration-300"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
