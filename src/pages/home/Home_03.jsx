import Header from '../../components/header/Header';
import Footer_03 from '../../components/footer/Footer_03';
import Hero from '../../components/sections/home_03/Hero';
import Promo from '../../components/sections/home_03/Promo';
import Content_01 from '../../components/sections/home_03/Content_01';
import Working from '../../components/sections/home_03/Working';
import Content_02 from '../../components/sections/home_03/Content_02';
import Team from '../../components/sections/home_03/Team';
import Testimonial from '../../components/sections/home_03/Testimonial';
import Blog from '../../components/sections/home_03/Blog';

const Home_03 = () => {
  return (
    <>
      <div className='page-wrapper relative z-[1] bg-[#F6F6EB]'>
        <Header
          loginCSS='button hidden rounded-[50px] border-[#7F8995] bg-transparent text-black after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block'
          signupCSS='button hidden rounded-[50px] border-colorViolet bg-colorViolet text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block'
        />
        <main className='main-wrapper relative overflow-hidden'>
          {/*...::: Hero Section Start :::... */}
          <Hero />
          {/*...::: Hero Section End :::... */}
          {/*...::: Promo Section Start :::... */}
          <Promo />
          {/*...::: Promo Section End :::... */}
          {/*...::: Content Section-1 Start :::... */}
          <Content_01 />
          {/*...::: Content Section-1 End :::... */}
          {/*...::: Working Process Start :::... */}
          <Working />
          {/*...::: Working Process End :::... */}
          {/*...::: Content Section-2 Start :::... */}
          <Content_02 />
          {/*...::: Content Section-2 End :::... */}
          {/* Separator */}
          <div className='global-container overflow-hidden'>
            <div className='h-[1px] w-full bg-[#F6F6EB]' />
          </div>
          {/* Separator */}
          {/*...::: Team Section Start :::... */}
          <Team />
          {/*...::: Team Section End :::... */}
          {/*...::: Testimonial Start :::... */}
          <Testimonial />
          {/*...::: Testimonial End :::... */}
          {/*...::: Blog Start :::... */}
          <Blog />
          {/*...::: Blog End :::... */}
        </main>
        <Footer_03 />
      </div>
      {/* Vertical Line */}
      <div className='absolute left-0 top-0 -z-[1] flex h-full w-full justify-evenly'>
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
        <div className='h-full w-[1px] bg-[#EDEDE0]' />
      </div>
      {/* Vertical Line */}
    </>
  );
};

export default Home_03;
