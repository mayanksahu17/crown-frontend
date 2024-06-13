const Content_06 = () => {
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
                  <h3 style={{fontSize:"30px"}}>Shield Your Investments: Invest in Cybersecurity</h3>
                </div>
                <br/>
                <br/>
  
                <h4>Why Cybersecurity?</h4>
  
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
                    
                    <h5>Essential Protection</h5>
                    <p className='text-lg'>
                     Cybercrime costs trillions globally, with data breaches posing significant threats.
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
                    <h5>Growing Demand
                    </h5>
                    <p className='text-lg'>
                     Increasing need for advanced security solutions in a digital world.
                    </p>
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
                    
                    <h5>Advanced Security</h5>
                    <p className='text-lg'>
                     Investments in companies developing firewalls, intrusion detection, and threat intelligence.
  
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
                    <h5> Comprehensive Solutions</h5>
                    <p className='text-lg'>
                    Focus on network security audits, vulnerability management, and incident response services.
  
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
  
  export default Content_06;
  