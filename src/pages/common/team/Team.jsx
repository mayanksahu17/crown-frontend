import React, { useEffect, useRef } from "react";
import greenBackground from "../../../assets/images/backgrounds/greenBackground.jpg";
import Footer from "../../../components/footer/Footer_05";
// import Contact from "../../components/contact/Contact"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


const teamMembers = [
  {
    name: "Adrian Cadiz",
    role: "Chief Executive Officer",
    image:
      "https://res.cloudinary.com/dygdftjr8/image/upload/v1742820054/2_nzcsii.jpg",
    bio: `Adrian Cadiz is the dynamic CEO of Crown Bankers, leading the company with a strong vision and strategic expertise. A native of the UK, Adrian's leadership will drive our operations over the next three years, with the option to renew based on his continued commitment.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Sarah Mitchell",
    role: "Chief Financial Officer",
    image: "https://i.pravatar.cc/300?img=10",
    bio: `Sarah leads financial strategy and operations, ensuring robust financial health and growth.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Ravi Patel",
    role: "Chief Technology Officer",
    image: "https://i.pravatar.cc/300?img=8",
    bio: `Ravi oversees technology development and digital innovation across all platforms.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Emily Zhang",
    role: "VP of Marketing",
    image: "https://i.pravatar.cc/300?img=20",
    bio: `Emily drives branding, campaigns, and outreach, elevating our market presence globally.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Jorge Ramirez",
    role: "Director of Operations",
    image: "https://i.pravatar.cc/300?img=12",
    bio: `Jorge ensures efficient workflows and operational excellence across departments.`,
    facebook: "#",
    linkedin: "#",
  },
];

// AboutCEO Component
const Team = () => {
  // Refs for animation
  const titleRef = useRef(null);
  const ceoCardRef = useRef(null);
  const ceoImageRef = useRef(null);
  const ceoInfoRef = useRef(null);

  useEffect(() => {
    // Common animation settings for smoothness
    const defaults = {
      ease: "power3.out", // Smoother easing
      duration: 1.2, // Slightly longer duration for fluidity
    };

    // Title fade-in
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // CEO Card fade-in
    if (ceoCardRef.current) {
      gsap.fromTo(
        ceoCardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          delay: 0.2,
        }
      );
    }

    // CEO Image fade-in with slight scale
    if (ceoImageRef.current) {
      gsap.fromTo(
        ceoImageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ...defaults,
          delay: 0.4,
        }
      );
    }

    // CEO Info staggered fade-in
    if (ceoInfoRef.current) {
      const infoElements = ceoInfoRef.current.children;
      gsap.fromTo(
        infoElements,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          ...defaults,
          stagger: 0.2,
          delay: 0.6,
        }
      );
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ backgroundImage: `url(${greenBackground})` }}>
      {" "}
      <section className="py-12">
        {/* Team Members Grid */}
        <div className="max-w-6xl px-4 mx-auto mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold text-black mb-1">{member.name}</h3>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">{member.role}</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
              <div className="flex space-x-4">
                <a href={member.facebook} className="text-green-600 hover:text-green-500">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href={member.linkedin} className="text-green-600 hover:text-green-500">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div></div>
      </section>
      <Footer />
      {/* <Contact /> */}
    </div>
  );
};

export default Team;
