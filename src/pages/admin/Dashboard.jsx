import React from "react";
import AdminLayout from "../../Component/admin/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6" style={{ backgroundColor: '#FAF8F5', minHeight: '100vh' }}>
        <h1 
          className="text-2xl font-semibold mb-6" 
          style={{ color: '#2B2B2B' }}
        >
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: '#F4ECE6',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: '1px solid #E1DDD7'
            }}
          >
            <h3 
              className="text-lg font-medium mb-2" 
              style={{ color: '#2B2B2B' }}
            >
              Total Products
            </h3>
            <p 
              className="text-3xl font-bold" 
              style={{ color: '#D79C66' }}
            >
              124
            </p>
          </div>
          <div 
            className="rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: '#F4ECE6',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: '1px solid #E1DDD7'
            }}
          >
            <h3 
              className="text-lg font-medium mb-2" 
              style={{ color: '#2B2B2B' }}
            >
              Categories
            </h3>
            <p 
              className="text-3xl font-bold" 
              style={{ color: '#D79C66' }}
            >
              10
            </p>
          </div>
          <div 
            className="rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: '#F4ECE6',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: '1px solid #E1DDD7'
            }}
          >
            <h3 
              className="text-lg font-medium mb-2" 
              style={{ color: '#2B2B2B' }}
            >
              Inquiries
            </h3>
            <p 
              className="text-3xl font-bold" 
              style={{ color: '#D79C66' }}
            >
              45
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;