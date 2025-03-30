import React from "react";

const CryptoCard = () => {
  return (
    <section className="bg-green text-black py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-xl sm:text-2xl text-[#4CAF50] lg:text-5xl font-bold mb-6">
            Investment Packages and Return
          </h1>
          <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed">
            {/* Unlock the potential of renewable energy with Crown Bankers. Choose
            from our tailored investment plans designed to generate sustainable
            energy yields while maximizing your growth. Join us in building a
            future powered by clean energy. */}
            Unlock the power of renewable energy with Crown Bankers. Explore our
            tailored investment plans designed to deliver sustainable energy
            returns while maximizing your financial growth. Invest in a cleaner,
            greener future with us today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 justify-items-center mx-auto max-w-6xl">
          {/* Card 1: Seamless Online Shopping */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs">
            <img
              src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742887535/1_12_jpiwyg.png"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Card 2: Global Spending Power */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs">
            <img
              src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards2_x8jow0.png"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Card 3: Easy Activation */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs">
            <img
              src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards1_ugv0p4.png"
              alt=""
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoCard;
