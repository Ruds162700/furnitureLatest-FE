import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock } from "lucide-react"; // Import icons for a better look

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => { // Made the function async
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch("https://interior-designer-backend-73ri.onrender.com/api/user/login", { // *** IMPORTANT: Replace with your actual backend URL ***
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        // Login successful
        localStorage.setItem("isAdminAuthenticated", "true");
        localStorage.setItem("token", data.token); // Store the JWT token
        console.log("Login successful! Token:", data.token);
        navigate("/admin"); // Navigate to admin dashboard
      } else {
        // Login failed (e.g., 400 Bad Request, 401 Unauthorized)
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Network error or other unexpected issues
      console.error("Login error:", err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: "#FAF8F5",
        fontFamily:
          '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      }}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10"
        style={{
          border: "1px solid rgba(201, 184, 168, 0.4)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{
            background:
              "linear-gradient(135deg, #8B7355 0%, #A68B5B 50%, #C9B8A8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3D3530] mb-1">
              Email Address
            </label>
            <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="email" // Changed type to email
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9B8A8]"
                    placeholder="Enter your email" // Changed placeholder
                    required
                    disabled={isLoading}
                />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3D3530] mb-1">
              Password
            </label>
            <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9B8A8]"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                />
            </div>
          </div>

          {error && ( // Display error message if present
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" // Added flex for loader icon
            style={{
              background:
                "linear-gradient(135deg, #8B7355 0%, #A68B5B 50%, #C9B8A8 100%)",
              boxShadow: "0 10px 30px rgba(139, 115, 85, 0.3)",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {isLoading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    Logging in...
                </>
            ) : "Log In"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            <strong>For testing:</strong><br/>
            Email: <code className="bg-gray-200 px-2 py-1 rounded">nisarg+0@gmail.com</code><br/>
            Password: <code className="bg-gray-200 px-2 py-1 rounded">Abcd@1234</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;