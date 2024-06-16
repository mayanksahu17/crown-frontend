import Hero from "../../components/sections/home_01/Hero";
import Service from "../../components/sections/home_01/service/Service";
import Content_01 from "../../components/sections/home_01/Content_01";
import Content_02 from "../../components/sections/home_01/Content_02";
import FunFact from "../../components/sections/home_01/FunFact";
import Whatsapp from "../Whatsapp";
// import Pricing from '../../components/sections/home_01/Pricing';
// import Testimonial_Section from '../../components/sections/home_01/Testimonial_Section';

const Home_01 = () => {
  return (
    <main className="main-wrapper relative overflow-hidden">
      <Hero />
      <Service />
      <Content_01 />
      <Content_02 />
      <FunFact />
      {/* <Pricing />
      <Testimonial_Section /> */}

      {/* Body Background Shape 1 */}
      <div className="orange-gradient-1 absolute -left-[15px] top-[61%] -z-[1] h-[400px] w-[400px] -rotate-[-9.022deg] rounded-[400px]"></div>

      {/* Body Background Shape 2 */}
      <div className="orange-gradient-2 absolute -left-[100px] top-[64%] -z-[1] h-[360px] w-[360px] -rotate-[-9.022deg] rounded-[360px]"></div>
      <Whatsapp />
    </main>
  );
};

export default Home_01;
