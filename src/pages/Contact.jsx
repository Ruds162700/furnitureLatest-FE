import React from 'react';
import image from '../images/hero.jpg';
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { IoMdChatboxes } from "react-icons/io";
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import Footer_Contact from '../Component/Footer_Contact';

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
            
            // Reset form after 20 seconds
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
            }, 1000);
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
        <div className='bg-[#1c1c1c] min-h-screen text-white'>
            {/* Main Section */}
            <div className='flex flex-col-reverse md:flex-row md:justify-evenly md:items-center md:p-10'>
                {/* Left Column */}
                <div className='flex flex-col text-center items-center mt-8 md:justify-center md:ml-5 md:items-start h-auto w-full md:w-1/2 lg:w-2/3'>
                    <h1 className='text-3xl lg:text-4xl font-bold text-white text-center md:text-left'>
                        Contact Us and Get Your Deal of Choice
                    </h1>
                    <p className='mt-4 text-gray-300 md:text-lg'>
                        We provide the best deals tailored to your needs. Reach out to us for personalized services!
                    </p>
                    <div className='mt-6 w-3/4 md:w-2/3'>
                        <div className='flex flex-col md:flex-row mt-6 items-stretch'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='w-full md:w-auto p-3 rounded-md bg-[#444444] border-b-2 border-white text-white focus:outline-none mb-4 md:mb-0 md:flex-1'
                            />
                            <button className='md:ml-2 bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-md shadow-lg'>
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column (Image) */}
                <div className='flex justify-center md:mr-5 md:w-1/2'>
                    <img src={image} alt='contact' className='h-40 w-auto mt-6 md:h-72' />
                </div>
            </div>

            {/* Contact Options */}
            <div className='flex justify-center mt-12 px-4'>
                <div className='flex w-full md:w-4/5 lg:w-2/3 border-2 border-gray-500 rounded-xl bg-gradient-to-r from-[#444444] to-[#222222]'>
                    <div className='flex-1 p-6 flex flex-col justify-center items-center hover:bg-[#555555] transition-all duration-300'>
                        <MdOutlineMailOutline className='w-8 h-8 md:w-10 md:h-10 text-orange-400' />
                        <p className='text-sm mt-2 text-gray-300'>Email Us</p>
                    </div>
                    <div className='flex-1 p-6 flex flex-col justify-center items-center border-l border-gray-500 hover:bg-[#555555] transition-all duration-300'>
                        <LuPhoneCall className='w-8 h-8 md:w-10 md:h-10 text-orange-400' />
                        <p className='text-sm mt-2 text-gray-300'>Call Us</p>
                    </div>
                    <div className='flex-1 p-6 flex flex-col justify-center items-center border-l border-gray-500 hover:bg-[#555555] transition-all duration-300'>
                        <IoMdChatboxes className='w-8 h-8 md:w-10 md:h-10 text-orange-400' />
                        <p className='text-sm mt-2 text-gray-300'>Chat with Us</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className='flex flex-col md:flex-row lg:flex-row justify-center mt-12 px-6'>
                <div className='md:w-1/2 lg:w-2/3'>
                    <form className='bg-[#444444] p-8 rounded-xl shadow-lg' onSubmit={handleSubmit}>
                        <h2 className='text-2xl font-bold mb-6 text-center text-orange-400'>Send Us A Message</h2>
                        
                        {/* Success Message */}
                        {showSuccess && (
                            <div className='bg-green-600 text-white p-4 rounded-md mb-6 transition-all duration-300'>
                                {successMessage}
                            </div>
                        )}
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder='First Name'
                                    className={`p-3 bg-[#333333] text-white border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none w-full`}
                                />
                                {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
                            </div>
                            
                            <div>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder='Last Name'
                                    className={`p-3 bg-[#333333] text-white border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none w-full`}
                                />
                                {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>}
                            </div>
                            
                            <div className='col-span-1 md:col-span-2'>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Your Email Address'
                                    className={`p-3 bg-[#333333] text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none w-full`}
                                />
                                {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                            </div>
                            
                            <div className='col-span-1 md:col-span-2'>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='Your Phone Number (Optional)'
                                    className={`p-3 bg-[#333333] text-white border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none w-full`}
                                />
                                {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
                            </div>
                            
                            <div className='col-span-1 md:col-span-2'>
                                <textarea
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder='How Can We Help You?'
                                    className={`p-3 bg-[#333333] text-white border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none w-full`}
                                    rows={4}
                                ></textarea>
                                {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message}</p>}
                            </div>
                        </div>
                        
                        <div className='flex items-center mt-4'>
                            <input 
                                type='checkbox' 
                                name='privacyPolicy'
                                checked={formData.privacyPolicy}
                                onChange={handleChange}
                                className='mr-2' 
                            />
                            <p className='text-gray-300 text-sm'>I acknowledge that I have read the Privacy Policy</p>
                        </div>
                        {errors.privacyPolicy && <p className='text-red-500 text-xs mt-1'>{errors.privacyPolicy}</p>}
                        
                        <button 
                            type='submit'
                            className='bg-orange-400 hover:bg-orange-500 text-white mt-6 p-3 rounded-md w-full font-bold'
                        >
                            Get in Touch
                        </button>
                    </form>
                </div>

                {/* Closing Statement */}
                <div className='text-center md:mt-36 md:w-1/2 mt-8'>
                    <h3 className='text-2xl font-semibold text-orange-400 mb-4'>
                        We're Here to Assist You!
                    </h3>
                    <p className='text-lg text-gray-300'>
                        Don't hesitate to get in touch with us. Our team is ready to provide the best service and help you with any questions or concerns you may have.
                    </p>
                </div>
            </div>

            <div className="relative w-full bg-[#1c1c1c] py-24 text-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    {/* Title and Description */}
                    <div
                        className={`text-center mb-12 transition-all duration-1000 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                            Find answers to the most commonly asked questions below.
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
                                    className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 cursor-pointer border border-white/10 p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <span className="text-2xl transform group-hover:scale-110 transition-transform">
                                                {section.icon}
                                            </span>
                                            {`${section.id.toString().padStart(2, '0')} ${section.title}`}
                                        </h3>
                                        {activeTab === section.id ? (
                                            <Minus className="w-5 h-5 text-white/60" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-white/60" />
                                        )}
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            activeTab === section.id ? "max-h-48 mt-4" : "max-h-0"
                                        }`}
                                    >
                                        <p className="text-gray-300">{section.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer_Contact/>
        </div>
    );
};

export default Contact;
