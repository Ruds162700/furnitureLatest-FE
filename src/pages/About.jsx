import React, { useState, useEffect } from "react";
import { Award, Users, Clock, Zap, Heart, Star } from "lucide-react";
import Footer from "../Component/Footer";
const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description:
        "With over 15 years of experience, Sarah brings creativity and precision to every project.",
    },
    {
      name: "Michael Chen",
      role: "Architectural Specialist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description:
        "Michael's background in architecture ensures every design is both beautiful and functional.",
    },
    {
      name: "Olivia Rodriguez",
      role: "Interior Stylist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description:
        "Olivia has an eye for the perfect finishing touches that make a space truly special.",
    },
    {
      name: "David Wilson",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description:
        "David ensures every project is completed on time, on budget, and exceeds expectations.",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description:
        "We strive for excellence in every detail, from concept to completion.",
      icon: <Award className="w-12 h-12 text-[#D79C66]" />,
    },
    {
      title: "Collaboration",
      description:
        "We work closely with our clients to bring their vision to life.",
      icon: <Users className="w-12 h-12 text-[#D79C66]" />,
    },
    {
      title: "Timeliness",
      description: "We respect your time and deliver projects on schedule.",
      icon: <Clock className="w-12 h-12 text-[#D79C66]" />,
    },
    {
      title: "Innovation",
      description: "We embrace new ideas and cutting-edge design solutions.",
      icon: <Zap className="w-12 h-12 text-[#D79C66]" />,
    },
    {
      title: "Passion",
      description:
        "We are passionate about creating spaces that inspire and delight.",
      icon: <Heart className="w-12 h-12 text-[#D79C66]" />,
    },
    {
      title: "Quality",
      description:
        "We use only the finest materials and craftsmanship in our projects.",
      icon: <Star className="w-12 h-12 text-[#D79C66]" />,
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#2B2B2B]">
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/90 to-[#FAF8F5]/95 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30 z-0"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-sm md:text-lg font-medium mb-4 bg-[#F4ECE6] px-8 py-2 rounded-full backdrop-blur-md border border-[#E1DDD7] shadow-sm hover:bg-[#D79C66] hover:text-white transition-all duration-300 inline-block text-[#2B2B2B]">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-6 bg-gradient-to-r from-[#2B2B2B] via-[#D79C66] to-[#2B2B2B] bg-clip-text text-transparent">
              TRANSFORMING SPACES, ENRICHING LIVES
            </h1>
            <p className="text-lg md:text-xl text-[#6D6D6D] leading-relaxed">
              For over a decade, we've been creating beautiful, functional
              spaces that reflect our clients' unique personalities and
              lifestyles.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2B2B2B]">
                Our Journey
              </h2>
              <p className="text-[#6D6D6D] mb-4 leading-relaxed">
                Founded in 2010, ANKIT Interior Design began with a simple
                mission: to create spaces that inspire. What started as a small
                studio with a handful of passionate designers has grown into a
                full-service interior design firm with a reputation for
                excellence.
              </p>
              <p className="text-[#6D6D6D] mb-4 leading-relaxed">
                Our approach combines timeless design principles with innovative
                solutions, ensuring that each project is not only beautiful but
                also functional and sustainable. We believe that great design
                has the power to transform not just spaces, but lives.
              </p>
              <p className="text-[#6D6D6D] leading-relaxed">
                Over the years, we've had the privilege of working with hundreds
                of clients across residential and commercial projects. Each
                space we design tells a unique story, reflecting the
                personality, needs, and dreams of those who inhabit it.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="rounded-2xl overflow-hidden h-64 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Interior design project"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-64 mt-8 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Interior design project"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-64 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Interior design project"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-64 mt-8 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Interior design project"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[#F4ECE6] py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2B2B2B]">
              Our Core Values
            </h2>
            <p className="text-[#6D6D6D] max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do, from how we design spaces
              to how we interact with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg border border-[#E1DDD7] transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2 group-hover:text-[#D79C66] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#6D6D6D] text-sm text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2B2B2B]">
            Meet Our Team
          </h2>
          <p className="text-[#6D6D6D] max-w-3xl mx-auto leading-relaxed">
            Our talented team of designers, architects, and project managers
            work together to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E1DDD7] transition-all duration-500 hover:shadow-lg hover:scale-102 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2B2B2B] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#D79C66] text-sm mb-3 font-medium">{member.role}</p>
                <p className="text-[#6D6D6D] text-sm leading-relaxed">{member.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D79C66] via-[#C9854D] to-[#D79C66] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D79C66] mb-2">
                10+
              </div>
              <div className="text-[#6D6D6D] font-medium">Years of Experience</div>
            </div>
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D79C66] mb-2">
                500+
              </div>
              <div className="text-[#6D6D6D] font-medium">Projects Completed</div>
            </div>
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D79C66] mb-2">
                25+
              </div>
              <div className="text-[#6D6D6D] font-medium">Design Awards</div>
            </div>
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D79C66] mb-2">
                98%
              </div>
              <div className="text-[#6D6D6D] font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <Footer />
 
    </div>
  );
};

export default AboutUs;