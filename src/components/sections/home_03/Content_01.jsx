const Content_01 = () => {
  return (
    <section id='section-content-1'>
      <div className='bg-[#EDEDE0]'>
        {/* Section Spacer */}
        <div className='py-20 xl:py-[130px]'>
          {/* Section Container */}
          <div className='global-container'>
            <div className='grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]'>
              <div className='jos' data-jos_animation='fade-left'>
                <div className='overflow-hidden rounded-[10px]'>
                  <img
                    src='assets/img/th-3/content-img-1.jpg'
                    alt='content-img-1'
                    width={526}
                    height={550}
                    className='h-auto w-full'
                  />
                </div>
              </div>
              <div className='jos' data-jos_animation='fade-right'>
                {/* Section Content Block */}
                <div className='mb-6'>
                  <h2 className='font-raleway text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[80px]'>
                    Revolutionary AI superchargers all business tasks
                  </h2>
                </div>
                {/* Section Content Block */}
                <div className=''>
                  <p className='mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl'>
                    AI technologies and applications that significantly enhance
                    and accelerate various business operations and tasks.
                  </p>
                  <p className='mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl'>
                    <span className='font-semibold text-[#381FD1]'>
                      AI-Powered Analytics:
                    </span>
                    Advanced AI analytics platforms can process and actions to
                    improve decision-making.
                  </p>
                  <p className='mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl'>
                    <span className='font-semibold text-[#381FD1]'>
                      Competitive Advantage:
                    </span>
                    Companies that embrace AI can gain a competitive edge &amp;
                    help businesses innovate and stay ahead of competitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </div>
    </section>
  );
};

export default Content_01;
