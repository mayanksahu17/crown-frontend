import { useState, useEffect } from "react";
import { packages } from "./data";
import "./calci.css";
const Calculator = ({ navigate, isCalculator = false }) => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [selectedPackage, setSelectedPackage] = useState(2);

  useEffect(() => {
    const selectedPackage = packages.find(
      (pkg) =>
        investmentAmount >= pkg.min_amount && investmentAmount <= pkg.max_amount
    );
    setSelectedPackage(selectedPackage || packages[0]); // Default to the first package if no matching package found
  }, [investmentAmount]);

  return (
    <div className="w-full mt-33 pt-10 text-center">
      {isCalculator && (
        <>
          <h1 className="px-6 text-5xl font-medium mb-4 ">
            Calculate Your Earning
          </h1>
          <h3 className="px-6 text-xl font-medium ">
            Select a Package, amount and duration
            <br /> to calculate your earning
          </h3>
        </>
      )}

      <div className="mx-auto max-w-5xl p-4 font-Montserrat ">
        <div className="flex flex-col max-w-4xl mx-auto px-6 borderOuter py-6">
          <h1 className="flex space-x-4 pl-3 my-2 text-left text-[#000] font-semibold leading-relaxed text-2xl font-Montserrat ">
            <span>Profit calculator</span>
            <span className="text-textred">
              {selectedPackage?.package_name}
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-2 justify-center items-center py-2 z-[1]">
            <div className="flex flex-col w-full md:w-1/2 text-left gap-4">
              <div className="customeBorder flex justify-between">
                <p className="ml-3 text-[#C5C3C3]">Daily Returns</p>
                <span className="mr-3 text-white text-lg">
                  {(selectedPackage && selectedPackage?.roi?.toFixed(2)) || "-"}
                  %
                </span>
              </div>
              <div className="customeBorder flex justify-between">
                <span className="ml-3 text-[#C5C3C3]">Capping</span>
                <span className="mr-3 text-white text-lg">
                  ${(selectedPackage && selectedPackage?.capping_limit) || "-"}
                </span>
              </div>
              <div className="customeBorder flex justify-between">
                <span className="ml-3 text-[#C5C3C3]">Duration</span>
                <span className="mr-3 text-white text-lg">
                  {(selectedPackage && selectedPackage?.duration) || "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 text-left gap-4">
              <div className="customeBorder2 flex justify-between">
                <p className="ml-3 text-[#C5C3C3]">Referral</p>
                <span className="mr-3 text-white text-lg">
                  {(selectedPackage && selectedPackage?.level_one_referral) ||
                    "-"}
                  %
                </span>
              </div>
              <div className="customeBorder2 flex justify-between">
                <span className="ml-3 text-[#C5C3C3]">Binary</span>
                <span className="mr-3 text-white text-lg">10%</span>
              </div>
              <div className="customeBorder2 flex justify-between">
                <span className="ml-3 text-[#C5C3C3]">Principal returns</span>
                <span className="mr-3 text-white text-lg">
                  {(selectedPackage && selectedPackage?.principle_return) ||
                    "-"}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 py-1 pb-2">
            <div
              className="w-full border-image flex justify-between p-4 bg-[#0E0E0E] rounded-3xl"
              style={{ borderRadius: "30px" }}
            >
              <span className="text-left w-1/4 text-[#C5C3C3]">
                Total Earning
              </span>
              <span className="text-xl font-bold text-themeColor">
                $
                {(
                  selectedPackage &&
                  parseFloat(investmentAmount) +
                    parseFloat(
                      ((parseFloat(investmentAmount) *
                        parseFloat(selectedPackage?.roi)) /
                        100) *
                        parseFloat(selectedPackage?.duration)
                    )
                ).toFixed(4) || "-"}
              </span>
            </div>
            <div
              className=" border-image flex justify-between p-4 bg-[#0E0E0E] rounded-3xl"
              style={{ borderRadius: "30px" }}
            >
              <span
                className="text-left  w-full text-[#C5C3C3] flex align justify-center"
                style={{ alignItems: "center" }}
              >
                Enter amount (USD)
              </span>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 25) e.target.value = 25;
                  if (parseFloat(e.target.value) > 50000)
                    e.target.value = 50000;
                  setInvestmentAmount(e.target.value);
                }}
                className="w-full text-black border-1 rounded-md text-center"
              />
            </div>
            <div
              className="cursor-pointer p-4 rounded-full"
              onClick={() => navigate("/signup")}
            >
              <span className="uppercase text-black underline text-[700]">
                Invest Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
