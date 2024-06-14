import React from "react";
import { FiDollarSign } from "react-icons/fi";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { FaCaretDown } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import frontendURL from "../../../constants/frontendURL";
import { useAuth } from "../../../hooks/useAuth";
const HomeTabComponent = ({ allData }) => {
  const { user } = useAuth();

  const leftReferralLink =
    frontendURL +
    "/signup?sponsorId=CROWN-" +
    user?.user?.userId?.split("-")[1] +
    "&position=left";
  const rightReferralLink =
    frontendURL +
    "/signup?sponsorId=CROWN-" +
    user?.user?.userId?.split("-")[1] +
    "&position=right";

  return (
    <>
      <div className="w-full  gap-4">
        <div className="w-full bg-[#fff] p-3 rounded-lg lg:col-span-3">
          <div className="mt-3 w-full ">
            <div className="w-full bg-gray-200 rounded-md p-2">
              <p className="opacity-80 text-[#272727] font-normal text-xs">
                Left link
              </p>
              <div className="flex justify-between w-full space-x-3 mt-2">
                <input
                  type="text"
                  className="w-4/6 text-xs px-2 py-1 text-opacity-80 text-[#272727]"
                  value={leftReferralLink}
                  readOnly
                />
                <button
                  className="text-white bg-[#141414] px-2 py-2 rounded-full w-2/6 text-sm font-normal"
                  onClick={() => {
                    copy(leftReferralLink);
                    toast.success("Link copied");
                  }}
                >
                  Copy link
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-md  p-2">
              <p className="opacity-80 text-[#272727] font-normal text-xs">
                Right link
              </p>
              <div className="flex justify-between w-full space-x-3 mt-2">
                <input
                  type="text"
                  className="w-4/6 text-xs px-2 py-1 text-opacity-80 text-[#272727]"
                  value={rightReferralLink}
                  readOnly
                />
                <button
                  className="text-white bg-[#000000] px-2 py-2 rounded-full w-2/6 text-sm font-normal"
                  onClick={() => {
                    copy(rightReferralLink);
                    toast.success("Link copied");
                  }}
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 w-full mt-4">
        <div className="w-full flex justify-between">
          <h1 className="text-lg lg:text-xl font-semibold text-[#272727]">
            My Career : Level {allData?.binary_career_level}
          </h1>

          <h1 className="text-lg lg:text-xl font-semibold text-themeColor">
            Next Level: {allData?.binary_career_level + 1}
          </h1>
        </div>
        <div className="mt-3 ">
          <div className="w-full">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-row gap-2">
                <div className="h-5 w-5 rounded-full bg-teal-200 flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Left Business</p>
              </div>
              <p className="text-sm font-normal">Target</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.leftBusiness}
              </div>
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.target}
              </div>
            </div>
            <ProgressBar
              completed={allData?.leftWidth}
              height="4px"
              isLabelVisible={false}
              baseBgColor="#cbd5e1"
              borderRadius="10px"
              bgColor="#6ee7b7"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-row gap-2">
                <div className="h-5 w-5 rounded-full bg-teal-200 flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Right Business</p>
              </div>
              <p className="text-sm font-normal">Target</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.rightBusiness}
              </div>
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.target}
              </div>
            </div>
            <ProgressBar
              completed={allData?.rightWidth}
              height="4px"
              isLabelVisible={false}
              baseBgColor="#cbd5e1"
              borderRadius="10px"
              bgColor="#6ee7b7"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTabComponent;
