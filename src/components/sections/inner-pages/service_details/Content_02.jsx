const Content_02 = () => {
  return (
    <section id='content-section-2'>
      {/* Section Spacer */}
      <div className='pb-20 xl:pb-[150px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Section Content Block */}
          <div className='jos mb-10 text-center lg:mb-16 xl:mb-20'>
            <div className='mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-[950px]'>
              <h2>Why Choose Crown bankers?
              </h2>
            </div>
          </div>
          {/* Section Content Block */}
          <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,_1fr)_1.2fr] xl:gap-28 xxl:gap-32'>
            {/* Content Left Block */}
            <div
              className='jos order-2 overflow-hidden rounded-md md:order-1'
              data-jos_animation='fade-left'
            >
              <img
                src='assets/img/th-1/content-image-4.jpg'
                alt='content-image-4'
                width={529}
                height={500}
                className='h-auto w-full'
              />
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div
              className='jos order-1 md:order-2'
              data-jos_animation='fade-right'
            >
              <ul className='flex flex-col gap-y-6'>
                <li>
                  <h5 className='mb-[10px]'>1. Expert Insights:</h5>
                  <p className='mb-7 last:mb-0'>
                  Our team of financial and industry professionals ensures your investments are well-researched and strategically chosen.

                  </p>
                </li>
                <li>
                  <h5 className='mb-[10px]'>
                    2. Simplicity and Convenience:
                  </h5>
                  <p className='mb-7 last:mb-0'>
                   We take the complexity out of investing, allowing you to benefit from high-growth sectors without needing deep technical knowledge.
                  </p>
                </li>
                <li>
                  <h5 className='mb-[10px]'>
                    3.Diverse Opportunities:
                  </h5>
                  <p className='mb-7 last:mb-0'> From the cloud and EVs to biotech and cybersecurity, we cover the sectors poised for significant growth.

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

export default Content_02;
