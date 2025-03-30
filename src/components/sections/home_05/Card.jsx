import { ArrowRight } from "lucide-react";

export default function SolarEnergycards() {
  return (
    <div className="w-full bg-transparent mb-2 px-4 md:px-24 py-4 md:py-12 ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Green panel - unchanged */}
          <div className="bg-[#4CAF50] rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-white text-3xl font-bold mb-6">
                Driving The Future Of Solar Energy
              </h2>
              <p className="text-white font-medium">
                With over 20 years of expertise, we are at the forefront of
                solar innovation and sustainable energy solutions, ensuring a
                greener and brighter future for all.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 z-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M4 6v10" />
                <path d="M20 6v10" />
                <path d="M12 3v18" />
                <path d="M10 6h8" />
                <path d="M8 12h8" />
                <path d="M6 18h12" />
              </svg>
            </div>
          </div>

          {/* White panels with green hover effect */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-between border-4 border-[#4CAF50] hover:bg-[#4CAF50] group">
            <div>
              <h3 className="text-black text-xl font-semibold mb-4 group-hover:text-white">
                Strategic Innovation
              </h3>
              <p className="text-gray-500 group-hover:text-white">
                Our state-of-the-art facilities adhere to the highest security
                and quality standards, ensuring certified and efficient solar
                energy production.
              </p>
            </div>
            <div className="mt-4">
              <div className="bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center">
                <ArrowRight className="text-white w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col justify-between border-4 border-[#4CAF50] hover:bg-[#4CAF50] group">
            <div>
              <h3 className="text-[#333] text-xl font-semibold mb-4 group-hover:text-white">
                Recognized Excellence
              </h3>
              <p className="text-gray-500 group-hover:text-white">
                We take pride in our award-winning approach to renewable
                energy—navigating complex global supply chains while overcoming
                challenges to deliver unparalleled solutions.
              </p>
            </div>
            <div className="mt-4">
              <div className="bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center">
                <ArrowRight className="text-white w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col justify-between border-4 border-[#4CAF50] hover:bg-[#4CAF50] group">
            <div>
              <h3 className="text-[#333] text-xl font-semibold mb-4 group-hover:text-white">
                Precision & Reliability
              </h3>
              <p className="text-gray-500 group-hover:text-white">
                Leveraging cutting-edge technology and decades of expertise, we
                ensure highly accurate solar energy solutions through advanced
                testing and rigorous quality control.
              </p>
            </div>
            <div className="mt-4">
              <div className="bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center">
                <ArrowRight className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
