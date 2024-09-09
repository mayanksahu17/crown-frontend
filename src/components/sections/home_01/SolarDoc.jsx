const SolarDoc = ({}) => {
  return (
    <main className="main-wrapper relative overflow-hidden pt-32 bg-black text-white">
      <section id="team-section">
        <div className="pb-40 xl:pb-[220px]">
          <div className="global-container">
            <div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
              <div className="mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[746px]">
                <h2>Solar Equipment Purchase Agreement</h2>
              </div>
            </div>
            <li
              className="jos flex flex-col items-center justify-center rounded-[20px] bg-colorLinenRuffle p-[20px] w-full"
              data-jos_animation="flip"
              data-jos_delay="0.1"
            >
              <div className="mt-5 text-black">
                <span className="font-bold">
                  Crown Bankers’ Commitment to Renewable Energy
                </span>
                <br /> At Crown Bankers, our mission is to integrate sustainable
                energy solutions with financial innovation. As part of our
                ongoing efforts to expand our solar energy infrastructure, we
                are proud to share details of a recent purchase agreement with
                Wuxi Sunket New Energy Technology Co., Ltd. This acquisition
                strengthens our goal of advancing solar energy adoption
                globally.
                <br />
                <br />
                <span className="font-bold">Agreement Summary</span>
                <br />
                This agreement marks the procurement of key equipment required
                for the expansion of our solar power plants. The purchase
                includes:
                <li>
                  50,000 mono solar panels (400W capacity each) to enhance
                  energy production capacity.
                </li>{" "}
                <li>
                  {" "}
                  Inverters, DC cables, batteries, and other necessary
                  components for efficient energy storage and distribution.
                </li>{" "}
                <li>
                  {" "}
                  Shipment and delivery arrangements to ensure the timely
                  completion of the solar plant's expansion.
                </li>
                <br />
                <br />
                <span className="font-bold">Impact on Our Solar Projects </span>
                <br />
                The acquired equipment will contribute significantly to Crown
                Bankers’ solar energy projects, including those that will power
                thousands of households and industries globally. This
                procurement is part of our long-term plan to foster green energy
                initiatives and reduce our carbon footprint.
                <br />
                <br />
                <span className="font-bold">
                  Supporting a Sustainable Future
                </span>
                <br />
                By investing in cutting-edge solar technologies, Crown Bankers
                is driving the shift towards renewable energy. This purchase
                will help us build more efficient solar plants, ensuring
                sustainable energy supply to our growing network of partners and
                clients.
                <br />
                <br />
                <div className="text-center">
                  You can view the detailed purchase document below:
                </div>
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
