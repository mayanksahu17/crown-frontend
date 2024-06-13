import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id='hero-section'>
      {/* Section Spacer */}
      <div className='pt-28 lg:pt-40 xl:pt-[195px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Hero Content */}
          <div className='grid items-center gap-10 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.3fr)_1fr]'>
            {/* Section Content Block */}
            <div>
              <h2 className='font-raleway text-5xl md:text-6xl lg:text-7xl xl:text-[100px] xxl:text-[120px]'>
                AI the future of business
              </h2>
            </div>
            {/* Section Content Block */}
            <div className='jos flex flex-col gap-10 md:gap-[50px]'>
              <p className='text-lg font-semibold leading-[1.33] md:text-xl lg:text-2xl'>
                Businesses harnessing AI's power are better positioned to thrive
                in the modern age. It can drive decision-making skills.
              </p>
              <Link
                to='/about'
                className='button inline-block rounded-[50px] border-2 border-black bg-[#F6F6EB] text-black after:border-colorOrangyRed after:bg-colorOrangyRed hover:text-white'
              >
                Explore About Us
              </Link>
            </div>
          </div>
          {/* Hero Content */}
        </div>
        {/* Section Container */}
        {/* Hero Image */}
        <div
          className='jos mx-auto mt-12 max-w-[1500px] px-5 md:mt-20'
          data-jos_animation='zoom'
        >
          <img
            src='assets/img/th-3/hero-img.jpg'
            alt='hero-img'
            width={1500}
            height={700}
            className='h-auto w-full'
          />
        </div>
        {/* Hero Image */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Hero;
