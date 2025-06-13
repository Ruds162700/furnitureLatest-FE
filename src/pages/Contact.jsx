import React from 'react';
import { Mail, Phone, MessageSquare, Plus, Minus, Send, CheckCircle, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from '../Component/Footer';
const Contact = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        privacyPolicy: false
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index === activeTab ? null : index);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        
        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        // Phone validation (optional but if provided must be 10 digits)
        if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        
        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        // Privacy policy validation
        if (!formData.privacyPolicy) {
            newErrors.privacyPolicy = 'Please acknowledge the Privacy Policy';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            console.log('Form submitted:', formData);
            
            // Show success message
            setSuccessMessage('Your message has been sent successfully! We will get back to you soon.');
            setShowSuccess(true);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    privacyPolicy: false
                });
                setShowSuccess(false);
                setSuccessMessage('');
            }, 3000);
        }
    };

    const sections = [
        {
            id: 1,
            title: "What materials do you use in furniture manufacturing?",
            content: "We use high-quality, durable materials such as solid wood, engineered wood, metal, and premium upholstery fabrics to ensure long-lasting furniture.",
            icon: "🛠️"
        },
        {
            id: 2,
            title: "Do you provide custom furniture design services?",
            content: "Yes! We offer free 3D design services to help you visualize and customize furniture according to your preferences and space requirements.",
            icon: "🎨"
        },
        {
            id: 3,
            title: "Who builds the furniture and ensures its quality?",
            content: "Our furniture is crafted by a highly qualified team of builders who focus on precision and quality control at every step of the process.",
            icon: "👷"
        },
        {
            id: 4,
            title: "Can I get professional consultation before making a purchase?",
            content: "Absolutely! We offer open consultations where our experts assist you in selecting the right furniture based on your style, budget, and space requirements.",
            icon: "💭"
        },
    ];

    return (
        <div className='bg-[#FAF8F5] min-h-screen text-[#2B2B2B]'>
            {/* Hero Section */}
            <div className='relative py-20 md:py-32 overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4ECE6] via-[#FAF8F5] to-[#F4ECE6] opacity-80"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
                
                <div className='container mx-auto px-6 relative z-10'>
                    <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}>
                        <span className="text-sm md:text-lg font-medium mb-4 bg-white/80 px-8 py-2 rounded-full backdrop-blur-md border border-[#E1DDD7] shadow-sm hover:bg-[#D79C66] hover:text-white transition-all duration-300 inline-block">
                            Get In Touch
                        </span>
                        <h1 className='text-4xl md:text-6xl font-bold mt-6 mb-6 bg-gradient-to-r from-[#2B2B2B] via-[#D79C66] to-[#2B2B2B] bg-clip-text text-transparent'>
                            Contact Us and Get Your Dream Interior
                        </h1>
                        <p className='text-lg md:text-xl text-[#6D6D6D] leading-relaxed max-w-3xl mx-auto'>
                            We provide personalized interior design solutions tailored to your unique style and needs. Let's bring your vision to life!
                        </p>
                        
                        {/* Quick Contact CTA */}

                    </div>
                </div>
            </div>

            {/* Contact Options */}
            <div className='flex justify-center px-4 -mt-16 relative z-20'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl'>
                    <div className='group bg-white rounded-2xl p-8 shadow-lg border border-[#E1DDD7] hover:shadow-xl hover:scale-105 transition-all duration-300'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='bg-[#F4ECE6] p-4 rounded-full mb-4 group-hover:bg-[#D79C66] transition-colors duration-300'>
                                <Mail className='w-8 h-8 text-[#D79C66] group-hover:text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-[#2B2B2B] mb-2'>Email Us</h3>
                            <p className='text-[#6D6D6D] text-sm'>info@ankitinterior.com</p>
                        </div>
                    </div>
                    
                    <div className='group bg-white rounded-2xl p-8 shadow-lg border border-[#E1DDD7] hover:shadow-xl hover:scale-105 transition-all duration-300'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='bg-[#F4ECE6] p-4 rounded-full mb-4 group-hover:bg-[#D79C66] transition-colors duration-300'>
                                <Phone className='w-8 h-8 text-[#D79C66] group-hover:text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-[#2B2B2B] mb-2'>Call Us</h3>
                            <p className='text-[#6D6D6D] text-sm'>+91 98765 43210</p>
                        </div>
                    </div>
                    
                    <div className='group bg-white rounded-2xl p-8 shadow-lg border border-[#E1DDD7] hover:shadow-xl hover:scale-105 transition-all duration-300'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='bg-[#F4ECE6] p-4 rounded-full mb-4 group-hover:bg-[#D79C66] transition-colors duration-300'>
                                <MessageSquare className='w-8 h-8 text-[#D79C66] group-hover:text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-[#2B2B2B] mb-2'>Chat with Us</h3>
                            <p className='text-[#6D6D6D] text-sm'>Live chat support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className='container mx-auto px-6 py-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                    {/* Contact Form */}
                    <div className='order-2 lg:order-1'>
                        <div className='bg-white rounded-3xl shadow-lg border border-[#E1DDD7] p-8 lg:p-10'>
                            <div className='text-center mb-8'>
                                <h2 className='text-3xl font-bold text-[#2B2B2B] mb-2'>Send Us A Message</h2>
                                <p className='text-[#6D6D6D]'>We'd love to hear from you. Drop us a line!</p>
                            </div>
                            
                            {/* Success Message */}
                            {showSuccess && (
                                <div className='bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl mb-6 flex items-center gap-3 transition-all duration-300'>
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    {successMessage}
                                </div>
                            )}
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        className={`w-full p-4 bg-[#F4ECE6] text-[#2B2B2B] border ${errors.firstName ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D79C66] focus:border-transparent placeholder-[#6D6D6D] transition-all duration-300`}
                                    />
                                    {errors.firstName && <p className='text-red-500 text-sm mt-2'>{errors.firstName}</p>}
                                </div>
                                
                                <div>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        className={`w-full p-4 bg-[#F4ECE6] text-[#2B2B2B] border ${errors.lastName ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D79C66] focus:border-transparent placeholder-[#6D6D6D] transition-all duration-300`}
                                    />
                                    {errors.lastName && <p className='text-red-500 text-sm mt-2'>{errors.lastName}</p>}
                                </div>
                                
                                <div className='col-span-1 md:col-span-2'>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Your Email Address'
                                        className={`w-full p-4 bg-[#F4ECE6] text-[#2B2B2B] border ${errors.email ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D79C66] focus:border-transparent placeholder-[#6D6D6D] transition-all duration-300`}
                                    />
                                    {errors.email && <p className='text-red-500 text-sm mt-2'>{errors.email}</p>}
                                </div>
                                
                                <div className='col-span-1 md:col-span-2'>
                                    <input
                                        type='tel'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder='Your Phone Number (Optional)'
                                        className={`w-full p-4 bg-[#F4ECE6] text-[#2B2B2B] border ${errors.phone ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D79C66] focus:border-transparent placeholder-[#6D6D6D] transition-all duration-300`}
                                    />
                                    {errors.phone && <p className='text-red-500 text-sm mt-2'>{errors.phone}</p>}
                                </div>
                                
                                <div className='col-span-1 md:col-span-2'>
                                    <textarea
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder='How Can We Help You?'
                                        className={`w-full p-4 bg-[#F4ECE6] text-[#2B2B2B] border ${errors.message ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D79C66] focus:border-transparent placeholder-[#6D6D6D] transition-all duration-300 resize-none`}
                                        rows={4}
                                    ></textarea>
                                    {errors.message && <p className='text-red-500 text-sm mt-2'>{errors.message}</p>}
                                </div>
                            </div>
                            
                            <div className='flex items-start mt-6 gap-3'>
                                <input 
                                    type='checkbox' 
                                    name='privacyPolicy'
                                    checked={formData.privacyPolicy}
                                    onChange={handleChange}
                                    className='mt-1 accent-[#D79C66]' 
                                />
                                <p className='text-[#6D6D6D] text-sm leading-relaxed'>I acknowledge that I have read and agree to the Privacy Policy and Terms of Service</p>
                            </div>
                            {errors.privacyPolicy && <p className='text-red-500 text-sm mt-2'>{errors.privacyPolicy}</p>}
                            
                            <button 
                                type='submit'
                                className='w-full bg-[#D79C66] hover:bg-[#C9854D] text-white mt-8 p-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2'
                            >
                                <Send className="w-5 h-5" />
                                Get in Touch
                            </button>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className='order-1 lg:order-2 lg:pl-8'>
                        <div className='bg-white rounded-3xl shadow-lg border border-[#E1DDD7] p-8 lg:p-10'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='bg-[#D79C66] p-2 rounded-full'>
                                    <Star className='w-6 h-6 text-white' />
                                </div>
                                <h3 className='text-2xl font-bold text-[#2B2B2B]'>
                                    We're Here to Assist You!
                                </h3>
                            </div>
                            <p className='text-[#6D6D6D] leading-relaxed mb-6'>
                                Don't hesitate to get in touch with us. Our team of experienced interior designers is ready to provide the best service and help you transform your space into something extraordinary.
                            </p>
                            
                            <div className='space-y-4'>
                                <div className='flex items-center gap-4 p-4 bg-[#F4ECE6] rounded-2xl'>
                                    <div className='bg-[#D79C66] p-2 rounded-full'>
                                        <Phone className='w-4 h-4 text-white' />
                                    </div>
                                    <div>
                                        <p className='font-medium text-[#2B2B2B]'>Quick Response</p>
                                        <p className='text-sm text-[#6D6D6D]'>We respond within 24 hours</p>
                                    </div>
                                </div>
                                
                                <div className='flex items-center gap-4 p-4 bg-[#F4ECE6] rounded-2xl'>
                                    <div className='bg-[#D79C66] p-2 rounded-full'>
                                        <Star className='w-4 h-4 text-white' />
                                    </div>
                                    <div>
                                        <p className='font-medium text-[#2B2B2B]'>Expert Consultation</p>
                                        <p className='text-sm text-[#6D6D6D]'>Free design consultation</p>
                                    </div>
                                </div>
                                
                                <div className='flex items-center gap-4 p-4 bg-[#F4ECE6] rounded-2xl'>
                                    <div className='bg-[#D79C66] p-2 rounded-full'>
                                        <CheckCircle className='w-4 h-4 text-white' />
                                    </div>
                                    <div>
                                        <p className='font-medium text-[#2B2B2B]'>Satisfaction Guaranteed</p>
                                        <p className='text-sm text-[#6D6D6D]'>100% customer satisfaction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-[#F4ECE6] py-20">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Title and Description */}
                    <div
                        className={`text-center mb-12 transition-all duration-1000 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-[#2B2B2B] mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#6D6D6D] max-w-2xl mx-auto leading-relaxed">
                            Find answers to the most commonly asked questions about our interior design services.
                        </p>
                    </div>

                    {/* Accordion Section */}
                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className={`transition-all duration-500 ${
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                                }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div
                                    onClick={() => handleTabClick(section.id)}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E1DDD7] transition-all duration-300 hover:shadow-lg cursor-pointer p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B] flex items-center gap-3">
                                            <span className="text-2xl transform group-hover:scale-110 transition-transform">
                                                {section.icon}
                                            </span>
                                            <span className="text-[#D79C66] font-medium mr-2">
                                                {section.id.toString().padStart(2, '0')}.
                                            </span>
                                            {section.title}
                                        </h3>
                                        <div className="bg-[#F4ECE6] p-2 rounded-full group-hover:bg-[#D79C66] transition-colors duration-300">
                                            {activeTab === section.id ? (
                                                <Minus className="w-4 h-4 text-[#D79C66] group-hover:text-white" />
                                            ) : (
                                                <Plus className="w-4 h-4 text-[#D79C66] group-hover:text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            activeTab === section.id ? "max-h-48 mt-4" : "max-h-0"
                                        }`}
                                    >
                                        <div className="pt-4 border-t border-[#E1DDD7]">
                                            <p className="text-[#6D6D6D] leading-relaxed">{section.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Placeholder */}
            <Footer />
        </div>
    );
};

export default Contact;