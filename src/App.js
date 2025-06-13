import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import Categories from "./pages/admin/Category";
import Inquiries from "./pages/admin/Inquiries";


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/inquiries" element={<Inquiries />} />

        {/* Public Routes */}
        
        <Route path="/" element={
          <>
          <Navbar/>
          <Home />
          </>
          
          } />
        <Route path="/category" element={
          <>
          <Navbar/>
          <Category />
          </>
          } />
        <Route path="/product/:id" element={
          <>
          <Navbar/>
          <Product />
          </>
        } />
        <Route path="/about" element={
          <>
          <Navbar/>
          <About />
          </>
          
          } />
        <Route path="/contact" element={
          <>
          <Navbar/>
          <Contact/>
          </>
          
          } />
      </Routes>
    </Router>
  );
}

export default App;
