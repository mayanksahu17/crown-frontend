const Content_01 = () => {
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
              <div className='mb-6'>
                <h2> Ride the Wave to Financial Freedom with Crown Bankers</h2>
              </div>
              {/* Section Content Block */}
              <div className='text-lg leading-[1.4] lg:text-[21px]'>
                <p className='mb-7 last:mb-0'>
                At Crown bankers, we're dedicated to helping you capitalize on the most exciting investment opportunities in today's market. Our platform simplifies investing in high-growth sectors, ensuring your portfolio benefits from cutting-edge advancements. Explore the sectors we focus on.
                </p>
              </div>
              <br/>
              <br/>
              <div>
                <h3 style={{fontSize:"30px"}}>invest in the Cloud: Powering the Future</h3>
              </div>
              <br/>
              <br/>

              <h4>Why Cloud Computing?</h4>

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
                  
                  <h5>Massive Growth</h5>
                  <p className='text-lg'>
                  The cloud market is projected to reach $725 billion in 2024, growing over 16% by 2029
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
                  <h5>Daily Integration</h5>
                  <p className='text-lg'>
                  The cloud is integral to our work, shopping, and connectivity.

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
                  
                  <h5>Top Picks</h5>
                  <p className='text-lg'>
                  We invest in industry giants like Amazon Web Services, Microsoft Azure, and Google Cloud.

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
                  <h5>High-Growth Areas</h5>
                  <p className='text-lg'>
                  Focus on AI, IoT, and other cloud-related businesses.

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

export default Content_01;
