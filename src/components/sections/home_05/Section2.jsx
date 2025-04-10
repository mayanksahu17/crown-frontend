// import { FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import WhiteRoundButton from "../../navbar/WhiteRoundButton";
import { Link, useLocation } from "react-router-dom";

const services = [
  {
    title: " EV Investments & Infrastructure GrowthStrategic",
    description:
      " Investment opportunities in the booming EV sector, including charging networks, battery technology, and smart mobility…",
    icon: "🚗",
  },
  {
    title: "Investment & Wealth Management",
    description:
      "Comprehensive wealth management services that help clients maximize returns...",
    icon: "📡",
  },
  {
    title: "Crypto & Blockchain Solutions",
    description:
      "Blockchain-powered financial systems that ensure secure transactions, smart...",
    icon: "🔗",
  },
  {
    title: "Solar Energy Investments & Green Returns",
    description:
      " Profitable investment avenues in solar energy, from large-scale solar farms to innovative renewable tech solutions…",
    icon: "☀️",
  },
];

const BankingInvestmentSection = () => {
  return (
    <div className="px-6 py-12 bg-white md:px-24">
      <h3 className="text-[#4CAF50] text-5xl font-bold">
        Fostering The Growth Of Financial Innovation
      </h3>
      <h2 className="mt-2 text-3xl font-semibold text-gray-900 md:text-3xl">
        A Leading Provider Of Banking & Investment Solutions
      </h2>
      <p className="max-w-3xl mt-4 text-gray-600">
        Crown Bankers is focused on delivering modern financial solutions that
        reduce operational costs, enhance banking efficiency, and improve the
        overall financial ecosystem.
      </p>

      <div className="flex gap-4 mt-6 place-items-end">
        <Link to="/login">
          <WhiteRoundButton className="" text="Get Started ->" />
        </Link>
        {/* <button className="flex items-center gap-2 px-6 py-3 text-white bg-black rounded-md">
          Get Started <ArrowRight />
        </button> */}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-green-50  shadow-xl p-6 rounded-lg text-center border-4 border-[#4CAF50] hover:bg-[#4CAF50] group"
          >
            <div className="mb-3 text-4xl text-green-500 group-hover:text-white">
              {service.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-white">
              {service.title}
            </h4>
            <p className="mt-2 text-sm text-gray-500 group-hover:text-white">
              {service.description}
            </p>
            <a
              href="/Services"
              className="flex items-center justify-center mt-4 font-semibold text-green-600 group-hover:text-white"
            >
              <span>Explore More</span>
              <ArrowRight className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankingInvestmentSection;
