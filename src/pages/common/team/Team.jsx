import React, { useEffect, useRef } from "react";
import greenBackground from "../../../assets/images/backgrounds/greenBackground.jpg";
import Footer from "../../../components/footer/Footer_05";
// import Contact from "../../components/contact/Contact"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2
            ref={titleRef}
            className="pt-16 mb-12 text-4xl font-extrabold text-center text-white lg:pt-32 sm:text-4xl"
          >
            About Our CEO
          </h2>

          {/* CEO Card */}
          <div
            ref={ceoCardRef}
            className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl flex flex-col md:flex-row items-center p-6 sm:p-8"
          >
            {/* CEO Image */}
            <div ref={ceoImageRef} className="mb-6 md:w-1/3 md:mb-0">
              <img
                src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742820054/2_nzcsii.jpg" // Replace with actual image path
                alt="Adrian Cadiz"
                className="w-full max-w-xs mx-auto rounded-lg shadow-md"
              />
            </div>

            {/* CEO Info */}
            <div
              ref={ceoInfoRef}
              className="text-center md:w-2/3 md:pl-8 md:text-left"
            >
              <h3 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
                Adrian Cadiz
              </h3>
              <h4 className="mb-4 text-xl font-semibold text-gray-800">
                Chief Executive Officer
              </h4>
              <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                Adrian Cadiz is the dynamic CEO of Crown Bankers, leading the
                company with a strong vision and strategic expertise. A native
                of the UK, Adrian's leadership will drive our operations over
                the next three years, with the option to renew based on his
                continued commitment. Under his guidance, Crown Bankers is
                poised to excel in the financial and technological landscapes,
                shaping a bright future for the company and its stakeholders.
              </p>
              {/* Social Media Links */}
              <div className="flex justify-center space-x-6 md:justify-start">
                <a
                  href="#"
                  className="text-green-600 transition-colors hover:text-green-500"
                  aria-label="Facebook"
                >
                  <i className="text-2xl fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-green-600 transition-colors hover:text-green-500"
                  aria-label="LinkedIn"
                >
                  <i className="text-2xl fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </section>
      <Footer />
      {/* <Contact /> */}
    </div>
  );
};

export default Team;
