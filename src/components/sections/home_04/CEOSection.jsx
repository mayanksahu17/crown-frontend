import React from "react";

const CEOSection = () => {
  return (
    <section className="bg-black py-16 px-6 flex flex-col items-center justify-center">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-cyan-400 uppercase tracking-widest">Team</h3>
        <h2 className="text-white text-4xl font-bold mt-2">Our C.E.O</h2>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center  px-20">
        {/* CEO Image */}
        <div className="mb-8 lg:mb-0 lg:mr-8">
          <img src="assets/img/th-1/12.png" alt="CEO" className="rounded-lg" />
        </div>

        {/* CEO Quote Section */}
        <div className="bg-gray-900 text-white rounded-lg p-8 flex-1">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-cyan-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11c.55 0 1 .45 1 1v7a1 1 0 01-1 1h-6v-6h3.293l-3.293 4h1v2h4v-8h-4V11zm-9.4 2.154a3.5 3.5 0 10-2.772 6.293 4.002 4.002 0 01-.405-1.003 4 4 0 01-1.645-.351V15c0-.55-.45-1-1-1H2v6c0 .55.45 1 1 1h6v-4.5H7.59l1.197-2.497a4.002 4.002 0 01-.186-1.85z"
              />
            </svg>
          </div>
          <p className="text-xl mb-6">
            By investing in our solar projects, you’re not just choosing a smart
            financial move—you’re championing a sustainable future for our
            planet.
          </p>
          <p className="text-gray-400">
            As CEO, I’m thrilled to lead our solar innovation. With over 180
            global plants and a major 90-acre site, we’re driving clean energy
            forward. Your investment supports cutting-edge technology and a
            greener future, offering both strong returns and environmental
            benefits. Join us in shaping a sustainable world.
          </p>
          <div className="mt-6">
            <p className="text-cyan-400 text-lg">Adrian</p>
            <p className="text-gray-400 text-sm">C.E.O</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
