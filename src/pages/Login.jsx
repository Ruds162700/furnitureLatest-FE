import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (username === "admin" && password === "admin123") {
        // Set authentication in localStorage
        localStorage.setItem("isAdminAuthenticated", "true");
        
        // Navigate to admin dashboard
        navigate("/admin");
      } else {
        alert("Invalid credentials! Use username: admin, password: admin123");
      }
      setIsLoading(false);
    }, 1000);
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
            <label className="block text-sm font-medium text-[#3D3530] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9B8A8]"
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3D3530] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9B8A8]"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background:
                "linear-gradient(135deg, #8B7355 0%, #A68B5B 50%, #C9B8A8 100%)",
              boxShadow: "0 10px 30px rgba(139, 115, 85, 0.3)",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo Credentials:</strong><br/>
            Username: <code className="bg-gray-200 px-2 py-1 rounded">admin</code><br/>
            Password: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;