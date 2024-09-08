const SolarDoc = ({}) => {
  return (
    <main className="main-wrapper relative overflow-hidden pt-32 bg-black text-white">
      <section id="team-section">
        <div className="pb-40 xl:pb-[220px]">
          <div className="global-container">
            <div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
              <div className="mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[746px]">
                <h2>Solar Purchase Invoice</h2>
              </div>
            </div>
            <li
              className="jos flex flex-col items-center justify-center rounded-[20px] bg-colorLinenRuffle p-[20px] w-full"
              data-jos_animation="flip"
              data-jos_delay="0.1"
            >
              <div className="mt-5 text-center text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi quas voluptate ex unde odit tempora explicabo tenetur
                voluptatem facilis minima quis iusto repudiandae quia, ipsa
                quae, hic consequatur facere qui veritatis quam? Iste cum sint
                odit accusantium aperiam quam blanditiis iusto officia? Corrupti
                ab, dignissimos officia praesentium ipsam quia facilis.
              </div>
              <div className="rounded-lg bg-colorBlue text-white w-24 mt-6 text-center">
                <a
                  href="/assets/img/th-1/Solar Plant Purchase Invoice.pdf"
                  download
                  className="w-full"
                >
                  View
                </a>
              </div>
            </li>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SolarDoc;
