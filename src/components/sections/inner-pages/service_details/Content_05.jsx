const Content_05 = () => {
    return (
      <section id='content-section-1'>
        {/* Section Spacer */}
        <div className='pb-20 xl:pb-[150px]'>
          {/* Section Container */}
          <div className='global-container'>
            <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28'>
              {/* Content Left Block */}
              <div
                className='jos order-2 overflow-hidden rounded-md'
                data-jos_animation='fade-left'
              >
                <img
                  src='assets/img/th-1/content-image-1.jpg'
                  alt='content-image-2'
                  width={526}
                  height={450}
                  className='h-auto w-full'
                />
              </div>
              {/* Content Left Block */}
              {/* Content Right Block */}
              <div className='jos order-1' data-jos_animation='fade-right'>
                {/* Section Content Block */}
                {/* Section Content Block */}
                
                <br/>
                <br/>
                <div>
                  <h3 style={{fontSize:"30px"}}>Unleash the Power of Science: Invest in Biotechnology</h3>
                </div>
                <br/>
                <br/>
  
                <h4>Why Biotechnology?</h4>
  
                <ul className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2'>
                  <li className='flex flex-col gap-y-4'>
                    <div className='h-[50px] w-[50px]'>
                      <img
                        src='assets/img/th-1/trending-up-icon.svg'
                        alt='trending-up-icon'
                        width={50}
                        height={50}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    
                    <h5>Life-Changing Potential</h5>
                    <p className='text-lg'>
                     Biotech is revolutionizing healthcare, from life-saving drugs to sustainable food sources.

                    </p>
                  </li>
                  <li className='flex flex-col gap-y-4'>
                    <div className='h-[50px] w-[50px]'>
                      <img
                        src='assets/img/th-1/cog-icon.svg'
                        alt='cog-icon'
                        width={50}
                        height={50}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <h5>Market Growth
                    </h5>
                    <p className='text-lg'>
                     Expected to reach $783.5 billion by 2025.                    </p>
                  </li>
                </ul>
                <br />
                <h5>Our Approach</h5>
                <ul className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2'>
                  <li className='flex flex-col gap-y-4'>
                    <div className='h-[50px] w-[50px]'>
                      <img
                        src='assets/img/th-1/trending-up-icon.svg'
                        alt='trending-up-icon'
                        width={50}
                        height={50}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    
                    <h5>Expertise-Driven</h5>
                    <p className='text-lg'>
                     Investments in gene editing, AI for medical research, and other breakthrough technologies.
  
                    </p>
                  </li>
                  <li className='flex flex-col gap-y-4'>
                    <div className='h-[50px] w-[50px]'>
                      <img
                        src='assets/img/th-1/cog-icon.svg'
                        alt='cog-icon'
                        width={50}
                        height={50}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <h5>Diversified Portfolio</h5>
                    <p className='text-lg'>
                     Focus on industry leaders and innovative startups.
  
                    </p>
                  </li>
                  
                </ul>
              </div>
              {/* Content Right Block */}
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </section>
    );
  };
  
  export default Content_05;
  