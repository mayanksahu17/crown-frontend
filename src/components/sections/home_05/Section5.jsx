import { useState, useEffect } from "react";

const QuoteRequestSection = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  // Generate a random image from picsum.photos on mount
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000); // Random ID for unique image
    setBackgroundImage(`https://picsum.photos/1920/1080?random=${randomId}`);
  }, []);

  return (
    <div
      className="bg-gray-100"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg')`,
      }}
    >
      <section className="relative flex flex-col md:flex-row items-stretch min-h-[400px] sm:min-h-[300px] md:min-h-[400px] py-6 sm:py-12 mx-4 sm: md:mx-24">
        {/* Left Side - Blurred Background with Text */}
        <div
          className="w-full md:w-1/2 h-[150px] sm:h-[200px] md:h-auto bg-cover bg-center flex items-center justify-center shadow-xl rounded-xl "
          style={{
            backgroundImage: `url(https://imgs.search.brave.com/Mtt5HT25bckZTIpysL8TzEdEWjjSwjeWVSDkCn0mu30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NTI3NjcyZTJkMmE4/NDI5ZjhhZmVhMGIv/NjU0YWJmYWE2MWRk/OTQyYWNhOWNjNmU4/X3NvbGFyLnBuZw)`,
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center shadow-2xl rounded-2xl">
          <h3 className="text-3xl md:text-4xl text-[#4CAF50] font-bold mb-8  text-center">
            Calculate Your Earnings
          </h3>
          <form className="space-y-6">
            {/* Investment Amount */}
            <div>
              <label
                htmlFor="investment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="investment"
                  className="block w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  placeholder="Enter investment amount"
                />
              </div>
            </div>

            {/* Investment Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Investment Duration
              </label>
              <select
                id="duration"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              >
                <option value="">Select duration</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>

            {/* Investment Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Investment Type
              </label>
              <select
                id="type"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              >
                <option value="">Select investment type</option>
                <option value="solar">Solar Energy</option>
                <option value="ev">Electric Vehicles</option>
                <option value="forbes">Forbes 500</option>
              </select>
            </div>

            {/* Results Display */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Return:</span>
                <span className="text-[#4CAF50] font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Return:</span>
                <span className="text-[#4CAF50] font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Return:</span>
                <span className="text-[#4CAF50] font-semibold">$0.00</span>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8b40] transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Calculate Returns
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              *Returns are estimated based on historical performance and market
              conditions. Actual returns may vary.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestSection;
