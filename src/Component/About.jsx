// // About Section Component
// const AboutSection = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleTabClick = (index) => {
//     setActiveTab(index === activeTab ? null : index);
//   };

//   const sections = [
//     {
//       id: 1,
//       title: "High Quality Material",
//       content: "When designing interiors, a lot of thought goes into its planning. In a profession such as interior design, a designer has to carefully select interior design materials, considering factors such as durability, budget, comfort, safety, and flexibility.",
//       icon: "🛠️"
//     },
//     {
//       id: 2,
//       title: "Free 3D Design",
//       content: "Get a realistic preview of your space with our free 3D design services, tailored to match your specific preferences and needs.",
//       icon: "🎨"
//     },
//     {
//       id: 3,
//       title: "Qualified Builder Team",
//       content: "Our team consists of highly qualified builders who ensure every aspect of your project is completed with precision and care.",
//       icon: "👷"
//     },
//     {
//       id: 4,
//       title: "Open Consultation",
//       content: "We offer open consultations to help you make informed decisions and bring your vision to life.",
//       icon: "💭"
//     },
//   ];

//   return (
//     <div className="relative w-full py-24" style={{ backgroundColor: '#FAF8F5' }}>
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div 
//           className={`text-center mb-16 transition-all duration-1000 ${
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//         >
//           <span 
//             className="text-sm md:text-lg font-medium mb-4 px-8 py-2 rounded-full backdrop-blur-sm border shadow-lg inline-block"
//             style={{ 
//               backgroundColor: 'rgba(215, 156, 102, 0.1)',
//               borderColor: 'rgba(215, 156, 102, 0.2)',
//               color: '#D79C66'
//             }}
//           >
//             About Ankit Interior
//           </span>
//           <h2 
//             className="mt-6 text-3xl md:text-5xl font-bold"
//             style={{ 
//               background: `linear-gradient(135deg, #D79C66 0%, #2B2B2B 50%, #D79C66 100%)`,
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent'
//             }}
//           >
//             Crafting Your Perfect Space
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto" style={{ color: '#6D6D6D' }}>
//             Ankit Interior serves the manufacture of custom furniture at the right price and quality. 
//             Available worldwide and universe.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-start gap-12">
//           <div 
//             className={`w-full lg:w-1/2 transition-all duration-1000 ${
//               isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
//             }`}
//           >
//             <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: '#F4ECE6' }}>
//               <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
//               <img
//                 src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                 alt="About Ankit Interior"
//                 className="w-full h-auto"
//               />
//               <div 
//                 className="absolute bottom-0 left-0 w-full h-1"
//                 style={{ backgroundColor: '#D79C66' }}
//               />
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 space-y-4">
//             {sections.map((section, index) => (
//               <div
//                 key={section.id}
//                 className={`transition-all duration-500 ${
//                   isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div
//                   onClick={() => handleTabClick(section.id)}
//                   className="group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
//                   style={{ 
//                     backgroundColor: '#F4ECE6',
//                     border: '1px solid #E1DDD7'
//                   }}
//                 >
//                   <div className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <span className="text-2xl transform group-hover:scale-110 transition-transform">
//                           {section.icon}
//                         </span>
//                         <h3 className="text-lg font-semibold" style={{ color: '#2B2B2B' }}>
//                           {`${section.id.toString().padStart(2, '0')} ${section.title}`}
//                         </h3>
//                       </div>
//                       {activeTab === section.id ? (
//                         <Minus className="w-5 h-5" style={{ color: '#6D6D6D' }} />
//                       ) : (
//                         <Plus className="w-5 h-5" style={{ color: '#6D6D6D' }} />
//                       )}
//                     </div>
                    
//                     <div className={`overflow-hidden transition-all duration-300 ${
//                       activeTab === section.id ? "max-h-48 mt-4" : "max-h-0"
//                     }`}>
//                       <p style={{ color: '#6D6D6D' }}>{section.content}</p>
//                     </div>
//                   </div>
                  
//                   <div 
//                     className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
//                     style={{ backgroundColor: '#D79C66' }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };// About Section Component
import { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
const AboutSection = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? null : index);
  };

  const sections = [
    {
      id: 1,
      title: "High Quality Material",
      content: "When designing interiors, a lot of thought goes into its planning. In a profession such as interior design, a designer has to carefully select interior design materials, considering factors such as durability, budget, comfort, safety, and flexibility.",
      icon: "🛠️"
    },
    {
      id: 2,
      title: "Free 3D Design",
      content: "Get a realistic preview of your space with our free 3D design services, tailored to match your specific preferences and needs.",
      icon: "🎨"
    },
    {
      id: 3,
      title: "Qualified Builder Team",
      content: "Our team consists of highly qualified builders who ensure every aspect of your project is completed with precision and care.",
      icon: "👷"
    },
    {
      id: 4,
      title: "Open Consultation",
      content: "We offer open consultations to help you make informed decisions and bring your vision to life.",
      icon: "💭"
    },
  ];

  return (
    <div className="relative w-full py-24" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span 
            className="text-sm md:text-lg font-medium mb-4 px-8 py-2 rounded-full backdrop-blur-sm border shadow-lg inline-block"
            style={{ 
              backgroundColor: 'rgba(215, 156, 102, 0.1)',
              borderColor: 'rgba(215, 156, 102, 0.2)',
              color: '#D79C66'
            }}
          >
            About Ankit Interior
          </span>
          <h2 
            className="mt-6 text-3xl md:text-5xl font-bold"
            style={{ 
              background: `linear-gradient(135deg, #D79C66 0%, #2B2B2B 50%, #D79C66 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Crafting Your Perfect Space
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: '#6D6D6D' }}>
            Ankit Interior serves the manufacture of custom furniture at the right price and quality. 
            Available worldwide and universe.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: '#F4ECE6' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="About Ankit Interior"
                className="w-full h-auto"
              />
              <div 
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ backgroundColor: '#D79C66' }}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  onClick={() => handleTabClick(section.id)}
                  className="group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
                  style={{ 
                    backgroundColor: '#F4ECE6',
                    border: '1px solid #E1DDD7'
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl transform group-hover:scale-110 transition-transform">
                          {section.icon}
                        </span>
                        <h3 className="text-lg font-semibold" style={{ color: '#2B2B2B' }}>
                          {`${section.id.toString().padStart(2, '0')} ${section.title}`}
                        </h3>
                      </div>
                      {activeTab === section.id ? (
                        <Minus className="w-5 h-5" style={{ color: '#6D6D6D' }} />
                      ) : (
                        <Plus className="w-5 h-5" style={{ color: '#6D6D6D' }} />
                      )}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeTab === section.id ? "max-h-48 mt-4" : "max-h-0"
                    }`}>
                      <p style={{ color: '#6D6D6D' }}>{section.content}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                    style={{ backgroundColor: '#D79C66' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;