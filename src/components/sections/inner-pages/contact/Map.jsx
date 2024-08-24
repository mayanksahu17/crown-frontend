const Map = () => {
  return (
    <section className="map-section">
      <div className="bg-black pb-40 pt-20 xl:pb-[200px] xl:pt-[130px]">
        <div className="global-container">
          <div className="mb-10 items-start flex lg:mb-16 xl:mb-20 ">
            <div className="mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[950px]">
              <h2 className="text-white">
                Compliance with Legal Standards and Regulation
              </h2>
              <p className="text-white font-light mt-6">
                Crown Bankers has meticulously ensured its legal incorporation
                in the United Kingdom. By adhering strictly to regulations and
                legal provisions, Crown Bankers demonstrates its commitment to
                transparency and integrity.
              </p>
              <img src="/assets/img/th-1/uk.png" alt="uk" className="mt-6" />
              <div className="rounded-lg bg-[#FFEBD8] text-black w-24 mt-6 text-center">
                <a
                  href="/assets/img/th-1/Certificate of Incorporation.pdf"
                  download
                  className="w-full"
                >
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="assets/img/th-1/mapbase.svg"
              alt="mapbase"
              className="h-auto w-full"
            />
            <div className="group absolute hidden sm:flex gap-2 sm:top-[10%] sm:left-[38%]">
              <div className="relative w-[50px] h-[50px]">
                <button className="group flex justify-center items-center w-[50px] h-[50px] relative transition-all duration-300">
                  <img
                    src="assets/img/th-1/icon-gray-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={35}
                    height={35}
                    className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                  />
                  <img
                    src="assets/img/th-1/icon-orange-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={50}
                    height={50}
                    className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  />
                </button>
                <div className="absolute bg-white rounded-[8px] p-4 text-sm w-[170px] bottom-0 right-0 xl:right-[50px] xxl:right-auto xxl:left-[50px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 xl:translate-y-12 group-hover:translate-y-0">
                  <div className="flex gap-1 font-bold pb-3">
                    <img
                      src="assets/img/th-1/icon-black-location-marker.svg"
                      alt="icon-black-location-marker"
                      width={17}
                      height={17}
                    />
                    United Kingdom
                  </div>
                  <address className="not-italic font-semibold">
                    {/* Line 1: House/Flat 208, Venue Street */}
                  </address>
                </div>
              </div>
            </div>
          </div>
          {/* Map Block */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Map;
/*      <div className="group absolute hidden sm:flex gap-2 sm:top-[65%] sm:left-[18%]">
              <div className="relative w-[50px] h-[50px]">
                <button className="group flex justify-center items-center w-[50px] h-[50px] relative transition-all duration-300">
                  <img
                    src="assets/img/th-1/icon-gray-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={35}
                    height={35}
                    className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                  />
                  <img
                    src="assets/img/th-1/icon-orange-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={50}
                    height={50}
                    className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  />
                </button>
                <div className="absolute bg-white rounded-[8px] p-4 text-sm w-[170px] bottom-0 right-0 xl:right-[50px] xxl:right-auto xxl:left-[50px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 xl:translate-y-12 group-hover:translate-y-0">
                  <div className="flex gap-1 font-bold pb-3">
                    <img
                      src="assets/img/th-1/icon-black-location-marker.svg"
                      alt="icon-black-location-marker"
                      width={17}
                      height={17}
                    />
                    Sao Paulo, Brazil
                  </div>
                  <address className="not-italic font-semibold">
                    Line 1: House/Flat 208, Venue Street
                  </address>
                </div>
              </div>
            </div>
            <div className="group absolute hidden sm:flex gap-2 sm:top-[38%] sm:left-[38%]">
              <div className="relative w-[50px] h-[50px]">
                <button className="group flex justify-center items-center w-[50px] h-[50px] relative transition-all duration-300">
                  <img
                    src="assets/img/th-1/icon-gray-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={35}
                    height={35}
                    className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                  />
                  <img
                    src="assets/img/th-1/icon-orange-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={50}
                    height={50}
                    className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  />
                </button>
                <div className="absolute bg-white rounded-[8px] p-4 text-sm w-[170px] bottom-0 right-0 xl:right-[50px] xxl:right-auto xxl:left-[50px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 xl:translate-y-12 group-hover:translate-y-0">
                  <div className="flex gap-1 font-bold pb-3">
                    <img
                      src="assets/img/th-1/icon-black-location-marker.svg"
                      alt="icon-black-location-marker"
                      width={17}
                      height={17}
                    />
                    Bamako, Mali
                  </div>
                  <address className="not-italic font-semibold">
                    Line 1: House/Flat 208, Venue Street
                  </address>
                </div>
              </div>
            </div>
            <div className="group absolute hidden sm:flex gap-2 sm:top-[5%]  sm:left-[61%]">
              <div className="relative w-[50px] h-[50px]">
                <button className="group flex justify-center items-center w-[50px] h-[50px] relative transition-all duration-300">
                  <img
                    src="assets/img/th-1/icon-gray-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={35}
                    height={35}
                    className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                  />
                  <img
                    src="assets/img/th-1/icon-orange-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={50}
                    height={50}
                    className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  />
                </button>
                <div className="absolute bg-white rounded-[8px] p-4 text-sm w-[170px] bottom-0 right-0 xl:right-[50px] xxl:right-auto xxl:left-[50px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 xl:translate-y-12 group-hover:translate-y-0">
                  <div className="flex gap-1 font-bold pb-3">
                    <img
                      src="assets/img/th-1/icon-black-location-marker.svg"
                      alt="icon-black-location-marker"
                      width={17}
                      height={17}
                    />
                    Noril'sk, Russia
                  </div>
                  <address className="not-italic font-semibold">
                    Line 1: House/Flat 208, Venue Street
                  </address>
                </div>
              </div>
            </div>
            <div className="group absolute hidden sm:flex gap-2 sm:top-[72%] sm:left-[88%]">
              <div className="relative w-[50px] h-[50px]">
                <button className="group flex justify-center items-center w-[50px] h-[50px] relative transition-all duration-300">
                  <img
                    src="assets/img/th-1/icon-gray-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={35}
                    height={35}
                    className="opacity-100 group-hover:opacity-0 transition-all duration-300"
                  />
                  <img
                    src="assets/img/th-1/icon-orange-location-marker.svg"
                    alt="icon-gray-location-marker"
                    width={50}
                    height={50}
                    className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  />
                </button>
                <div className="absolute bg-white rounded-[8px] p-4 text-sm w-[170px] bottom-0 right-0 xl:right-[50px] xxl:right-auto xxl:left-[50px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 xl:translate-y-12 group-hover:translate-y-0">
                  <div className="flex gap-1 font-bold pb-3">
                    <img
                      src="assets/img/th-1/icon-black-location-marker.svg"
                      alt="icon-black-location-marker"
                      width={17}
                      height={17}
                    />
                    Lake Eyre, Australia
                  </div>
                  <address className="not-italic font-semibold">
                    Line 1: House/Flat 208, Venue Street
                  </address>
                </div>
              </div>
            </div>*/
