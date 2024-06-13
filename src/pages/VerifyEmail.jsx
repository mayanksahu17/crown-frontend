import { useState } from "react";
import { Button } from "../components";
import { Email, Flexible, Image, Support, Wallet } from "../assets";
import toast from "react-hot-toast";
import authService from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const handleNavigate = useNavigate();

  const handleVerifyEmail = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const res = await authService.verifyUserEmail({ token });

        if (res.status === 200) {
          handleNavigate("/login");
          toast.success("Email verified successfully !");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="w-full font-poppins py-20 lg:py-40 min-h-screen">
      <div className="w-full max-w-5xl mx-auto ">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center mb-24 lg:mb-44 gap-4 text-justify">
          <div className="w-full lg:w-1/2 flex flex-col  justify-center px-6">
            <h1 className="text-4xl lg:text-5xl font-medium mb-4 text-white">
              Welcome to a <br /> World Where
              <br /> <span className="text-textred">Dreams</span> Transform{" "}
              <br />
              into{" "}
              <span className="text-textred">
                Investment <br />
                Success
              </span>
            </h1>
            <p className="text-base lg:text-xl mb-4">
              You're just a step away from getting
              <br /> started! Please click the button below to
              <br /> confirm your email. In case of issues, copy
              <br /> and paste the URL into your browser
            </p>
            <Button
              className="!py-3"
              onClick={handleVerifyEmail}
              loading={isLoading}
            >
              Click to Verify
            </Button>
          </div>
          <div className="w-[80%] lg:w-1/2">
            <img alt="Signup Background" src={Email} className="" />
          </div>
        </div>

        <div className="w-full px-6">
          <div className="flex md:flex-row flex-col justify-between w-full">
            {" "}
            <h2 className="text-4xl lg:text-5xl mb-4 text-white">
              Why choose <span className="text-textred">Crown Bankers</span>
            </h2>{" "}
            <Button className="w-36">Invest Now</Button>
          </div>

          <p className="text-base lg:text-xl mt-3">
            Choose Crown Bankers for unparallel investment opportunities, <br />
            exceptional rewards, trust reliability, and dedicated support.
          </p>

          <div className="w-full my-24 flex md:flex-row flex-col gap-3 justify-between ">
            <div className="max-w-[250px] w-full">
              <div className="bg-purple-700 rounded-xl p-2 max-w-[60px] w-full max-h-[60px]  mb-4 flex justify-center items-center">
                <img alt="Signup Background" src={Wallet} className="w-9 h-9" />
              </div>
              <p className="font-semibold text-lg mb-2">Trust</p>
              <p className="text-gray-500">
                {" "}
                Experience a trusted investment platform with a <br /> proven
                track record.
              </p>
            </div>
            <div className="max-w-[250px] w-full">
              <div className="bg-purple-700 rounded-xl p-2 max-w-[60px] w-full max-h-[60px]  mb-4 flex justify-center items-center">
                <img alt="Signup Background" src={Image} className="w-9 h-9" />
              </div>
              <p className="font-semibold text-lg mb-2">Rewards</p>
              <p className="text-gray-500">
                {" "}
                Enjoy attractive
                <br /> rewards and bonuses <br /> for your investments
                <br /> and loyalty.
              </p>
            </div>

            <div className="max-w-[250px] w-full">
              <div className="bg-purple-700 rounded-xl p-2 max-w-[60px] w-full max-h-[60px]  mb-4 flex justify-center items-center">
                <img
                  alt="Signup Background"
                  src={Flexible}
                  className="w-9 h-9"
                />
              </div>
              <p className="font-semibold text-lg mb-2">Flexibility</p>
              <p className="text-gray-500">
                Receive expert guidance <br /> and personalized support <br />{" "}
                throughout to your
                <br /> preferences.
              </p>
            </div>

            <div className="max-w-[250px] w-full">
              <div className="bg-purple-700 rounded-xl p-2 max-w-[60px] w-full max-h-[60px]  mb-4 flex justify-center items-center">
                <img
                  alt="Signup Background"
                  src={Support}
                  className="w-9 h-9"
                />
              </div>
              <p className="font-semibold text-lg mb-2">Support</p>
              <p className="text-gray-500">
                {" "}
                Experience a trusted investment platform with a <br /> proven
                track record.
              </p>
            </div>
          </div>

          <div className="rounded-2xl  w-full ">
            <div className="w-full flex md:flex-row flex-col justify-between items-start mb-8">
              <h1 className="text-4xl lg:text-5xl font-semibold mb-4 text-white">
                Limitless Earning through
                <br />
                Crown Banker's Referral Program
              </h1>
              <Button className="w-36">Refer Now</Button>
            </div>

            <p className="text-base lg:text-xl font-medium">
              {" "}
              Join our referral progra, earn up to 7 levels of bonuses,
              <br /> and unlock limitless income potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
