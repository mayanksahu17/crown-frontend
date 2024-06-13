import { Link } from 'react-router-dom';

const Working = () => {
  return (
    <section id='section-working-process'>
      <div className='bg-[#EDEDE0] px-5 sm:px-[50px]'>
        <div className='relative z-[1] mx-auto max-w-full rounded-[20px] bg-black'>
          {/* Section Spacer */}
          <div className='py-16 sm:px-10 md:px-20 lg:py-20 xl:px-[100px] xl:py-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[1000px]'>
                <h2 className='font-raleway text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[80px]'>
                  Solutions for smart work
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Work Process List */}
              <div className='grid grid-flow-dense gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                {/* Work Process Item */}
                <div className='order-1 col-span-1 flex flex-col gap-y-8 rounded-[10px] bg-[#121212] p-[30px] text-white transition-all duration-300 hover:bg-[#381FD1]'>
                  <div className='h-10 w-auto xxl:h-[60px]'>
                    <img
                      src='assets/img/th-3/icon-black-work-process-1.svg'
                      alt='working-process-icon'
                      width={62}
                      height={60}
                      className='h-full'
                    />
                  </div>
                  <div className='font-raleway text-2xl font-bold leading-[1.33] lg:text-3xl'>
                    Data Analysis
                  </div>
                  <p className='text-xl leading-[1.33] lg:text-2xl'>
                    AI can analyze large volumes of data quickly and accurately
                  </p>
                  <Link
                    rel='noopener noreferrer'
                    to='/service-details'
                    className='h-[30px] w-[30px]'
                  >
                    <img
                      src='assets/img/th-3/icon-white-arrow-right.svg'
                      alt='icon-white-arrow-right'
                      width={30}
                      height={30}
                    />
                  </Link>
                </div>
                {/* Work Process Item */}
                {/* Work Process Item */}
                <div className='order-2 col-span-1 flex flex-col gap-y-8 rounded-[10px] bg-[#121212] p-[30px] text-white transition-all duration-300 hover:bg-[#381FD1]'>
                  <div className='h-10 w-auto xxl:h-[60px]'>
                    <img
                      src='assets/img/th-3/icon-black-work-process-2.svg'
                      alt='working-process-icon'
                      width={60}
                      height={60}
                      className='h-full'
                    />
                  </div>
                  <div className='font-raleway text-2xl font-bold leading-[1.33] lg:text-3xl'>
                    Automation
                  </div>
                  <p className='text-xl leading-[1.33] lg:text-2xl'>
                    AI can automate repetitive and time consuming, reducing
                    error
                  </p>
                  <Link
                    rel='noopener noreferrer'
                    to='/service-details'
                    className='h-[30px] w-[30px]'
                  >
                    <img
                      src='assets/img/th-3/icon-white-arrow-right.svg'
                      alt='icon-white-arrow-right'
                      width={30}
                      height={30}
                    />
                  </Link>
                </div>
                {/* Work Process Item */}
                {/* Work Process Item */}
                <div className='order-3 col-span-1 flex flex-col gap-y-8 rounded-[10px] bg-[#121212] p-[30px] text-white transition-all duration-300 hover:bg-[#381FD1]'>
                  <div className='h-10 w-auto xxl:h-[60px]'>
                    <img
                      src='assets/img/th-3/icon-black-work-process-3.svg'
                      alt='working-process-icon'
                      width={60}
                      height={60}
                      className='h-full'
                    />
                  </div>
                  <div className='font-raleway text-2xl font-bold leading-[1.33] lg:text-3xl'>
                    Personalization
                  </div>
                  <p className='text-xl leading-[1.33] lg:text-2xl'>
                    Businesses to deliver highly personalized high experiences
                  </p>
                  <Link
                    rel='noopener noreferrer'
                    to='/service-details'
                    className='h-[30px] w-[30px]'
                  >
                    <img
                      src='assets/img/th-3/icon-white-arrow-right.svg'
                      alt='icon-white-arrow-right'
                      width={30}
                      height={30}
                    />
                  </Link>
                </div>
                {/* Work Process Item */}
                <div className='order-1 col-span-full grid gap-6 lg:grid-cols-2 xl:order-2 xl:grid-cols-2'>
                  {/* Work Process Item */}
                  <div className='col-span-1 flex flex-col gap-y-8 rounded-[10px] bg-[#121212] p-[30px] text-white transition-all duration-300 hover:bg-[#381FD1]'>
                    <div className='h-10 w-auto xxl:h-[60px]'>
                      <img
                        src='assets/img/th-3/icon-black-work-process-4.svg'
                        alt='working-process-icon'
                        width={65}
                        height={60}
                        className='h-full'
                      />
                    </div>
                    <div className='font-raleway text-2xl font-bold leading-[1.33] lg:text-3xl'>
                      Cost Savings
                    </div>
                    <p className='text-xl leading-[1.33] lg:text-2xl'>
                      By automating tasks and optimizing processes, AI can lead
                      to significant cost savings over time
                    </p>
                    <Link
                      rel='noopener noreferrer'
                      to='/service-details'
                      className='h-[30px] w-[30px]'
                    >
                      <img
                        src='assets/img/th-3/icon-white-arrow-right.svg'
                        alt='icon-white-arrow-right'
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                  {/* Work Process Item */}
                  {/* Work Process Item */}
                  <div className='col-span-1 flex flex-col gap-y-8 rounded-[10px] bg-[#121212] p-[30px] text-white transition-all duration-300 hover:bg-[#381FD1]'>
                    <div className='h-10 w-auto xxl:h-[60px]'>
                      <img
                        src='assets/img/th-3/icon-black-work-process-5.svg'
                        alt='working-process-icon'
                        width={40}
                        height={60}
                        className='h-full'
                      />
                    </div>
                    <div className='font-raleway text-2xl font-bold leading-[1.33] lg:text-3xl'>
                      Risk Management
                    </div>
                    <p className='text-xl leading-[1.33] lg:text-2xl'>
                      AI can assess &amp; mitigate risks more accurately by
                      analyzing vast amounts of data &amp; reduce risks
                    </p>
                    <Link
                      rel='noopener noreferrer'
                      to='/service-details'
                      className='h-[30px] w-[30px]'
                    >
                      <img
                        src='assets/img/th-3/icon-white-arrow-right.svg'
                        alt='icon-white-arrow-right'
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                  {/* Work Process Item */}
                </div>
              </div>
              {/* Work Process List */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
          {/* Vertical Line */}
          <div className='absolute left-0 top-0 -z-[1] flex h-full w-full justify-evenly'>
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
            <div className='h-full w-[1px] bg-[#121212]' />
          </div>
          {/* Vertical Line */}
        </div>
      </div>
    </section>
  );
};

export default Working;
