import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero-section">
      {/* Section Spacer */}
      <div className="pt-28 lg:pt-40 xl:pt-[195px]">
        {/* Section Container */}

        {/* Section Container */}
        {/* Hero Image */}
        <div className="relative" data-jos_animation="zoom">
          <img
            src="assets/img/plan/bg.png"
            alt="hero-img"
            className="relative h-auto w-full"
          />
          <div className="absolute bottom-[50%] right-[42%] flex justify-center items-center flex-col gap-2">
            <img
              src="assets/img/plan/logo.png"
              alt="center-img"
              className=" w-64 h-52 "
            />
            <h1 className="font-bold text-black text-4xl">Business Plan</h1>
          </div>
        </div>
        <div className="global-container mt-12 flex flex-col justify-center w-full items-center">
          <h1 className="font-bold text-6xl text-colorGreen ">
            Go Green,<span className="text-black">Earn Green</span>
          </h1>
          <div className=" flex flex-row items-center gap-20 justify-center w-full ">
            <div className="w-1/3 jos  flex flex-col gap-10 md:gap-[50px]">
              <p className="text-lg leading-[1.33] md:text-xl lg:text-2xl">
                Rule Your Portfolio: Crown Bankers Invest in Forbes 500, EV,
                Solar, and Crypto!
              </p>
            </div>
            <div>
              <h5 className=" font-raleway text-6xl">Invest in EV & Solar</h5>
              <span className=" font-raleway text-6xl">with Us!</span>
            </div>
          </div>
          <img
            src="assets/img/plan/hero.png"
            alt="hero-img"
            className="relative h-auto w-full"
          />
        </div>
        {/* Hero Image */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Hero;
