import { Link } from "react-router-dom";

const Content7 = () => {
  return (
    <section id="section-working-process">
      <div className="bg-[#EDEDE0] px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <div className="flex items-center flex-col justify-center">
                <h4 className=" mb-4 text-colorOrangyRed ">
                  Investment Packages and Return
                </h4>
                <div className="flex flex-row gap-8">
                  <img
                    src="assets/img/plan/p1.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                  <img
                    src="assets/img/plan/p2.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                  <img
                    src="assets/img/plan/p3.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content7;
