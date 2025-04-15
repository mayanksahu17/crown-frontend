import { ArrowRight } from "lucide-react";
import WhiteRoundButton from "../../navbar/WhiteRoundButton";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const services = [
  {
    title: "EV Investments & <br/>Infrastructure GrowthStrategic",
    description:
      "Investment opportunities in the booming EV sector, including charging networks, battery technology, and smart mobility…",
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
    title: "Solar Energy Investments <br/> & Green Returns",
    description:
      "Profitable investment avenues in solar energy, from large-scale solar farms to innovative renewable tech solutions…",
    icon: "☀️",
  },
  {
    title: "AI in Finance & Automation",
    description:
      "Transforming financial operations with AI-driven analytics, fraud detection, and intelligent automation solutions...",
    icon: "🤖",
  },
];

// Clone the services list to simulate an infinite loop
const loopedServices = [...services, ...services];

const BankingInvestmentSection = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    const scrollSpeed = 1; // pixels per step
    const scrollDelay = 20; // ms per step

    if (scrollContainer) {
      scrollInterval = setInterval(() => {
        // Move scroll position forward
        scrollContainer.scrollLeft += scrollSpeed;

        // When we reach halfway, reset back to the start seamlessly
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }, scrollDelay);
    }

    return () => clearInterval(scrollInterval);
  }, []);

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
      </div>

      {/* Looping horizontal scroll */}
      <div
        className="mt-10 overflow-x-auto scrollbar-hide"
        ref={scrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex space-x-6 px-2 md:px-0">
          {loopedServices.map((service, index) => (
            <div
            key={index}
            className="min-w-[300px] max-w-sm flex-shrink-0 bg-green-50 shadow-xl p-6 rounded-lg text-center border-4 border-[#4CAF50] hover:bg-[#4CAF50] group transition-all duration-300 flex flex-col justify-between h-[360px]"
          >
            <div>
              <div className="mb-3 text-4xl text-green-500 group-hover:text-white">
                {service.icon}
              </div>
              <h4
                  className="text-lg font-semibold text-gray-900 group-hover:text-white leading-snug"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />

              <p className="mt-2 text-sm text-gray-500 group-hover:text-white whitespace-normal break-words leading-relaxed">
                {service.description}
              </p>

            </div>
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
    </div>
  );
};

export default BankingInvestmentSection;
