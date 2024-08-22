import Header from "../../components/header/Header";
import Footer_04 from "../../components/footer/Footer_04";
import Promo from "../../components/sections/home_04/Promo";
import Content_01 from "../../components/sections/home_04/Content_01";
import Content_02 from "../../components/sections/home_04/Content_02";
import Service from "../../components/sections/home_04/Service";
import Slider from "../../components/sections/home_04/Slider";
import Hero from "../../components/sections/home_04/Hero";
import Content_03 from "../../components/sections/home_04/Content_03";
import Content_04 from "../../components/sections/home_04/Content_04";
import Faq from "../../components/sections/home_04/Faq";
import Testimonial from "../../components/sections/home_04/Testimonial";
import Cta from "../../components/sections/home_04/Cta";
import Calculator from "../../components/dashboard/calculator/Calculator";
import ImageSlider from "../../components/sections/home_04/ImageSlider";
import CEOSection from "../../components/sections/home_04/CEOSection";

const Home_04 = () => {
  return (
    <>
      <div className="page-wrapper relative z-[1] bg-black text-white">
        <main className="main-wrapper relative overflow-hidden">
          <Content_03 />
          <Content_01 />

          <Hero />
          <Content_02 />
          <div className="global-container overflow-hidden">
            <div className="h-[1px] w-full bg-[#363636]" />
          </div>
          <Service />
          <CEOSection />
          <Calculator />
          <ImageSlider />
        </main>
      </div>
    </>
  );
};

export default Home_04;
