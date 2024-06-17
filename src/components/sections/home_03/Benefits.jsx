import { Link } from "react-router-dom";
const BoxComponent = ({ text }) => {
  return (
    <div className="w-60 h-60 rounded-xl bg-[#242424] p-6 flex flex-col gap-6 relative">
      <div className="relative">
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full bg-[#8D3CEC] flex items-center justify-center">
          <img
            src="assets/img/plan/star.png"
            alt="hero-img"
            className="relative h-6 w-6"
          />
        </div>
      </div>
      <div className="relative text-white font-thin text-sm mt-12">{text}</div>
    </div>
  );
};
const texts = [
  "24/7 unlimited access to our live support.",
  "Zero withdrawal charges for referral and binary incomes.",
  "Referral and binary earnings will be credited instantly.",
  "Referral rewards up to 9%.",
  "Binary bonus of 10% on the weaker leg.",
  "Progress through Bronze to White Diamond levels in Crown rewards.",
];
const Benefits = () => {
  return (
    <section id="section-working-process ">
      <div className="bg-[#EDEDE0] px-60">
        <div className="relative z-[1] w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <h1 className="text-4xl text-white text-center mb-6">Benefits</h1>
              <div className="flex flex-col gap-10">
                <div className="flex justify-center gap-10">
                  {texts.slice(0, 3).map((text, index) => (
                    <BoxComponent key={index} text={text} />
                  ))}
                </div>
                <div className="flex justify-center gap-10">
                  {texts.slice(3, 6).map((text, index) => (
                    <BoxComponent key={index} text={text} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
