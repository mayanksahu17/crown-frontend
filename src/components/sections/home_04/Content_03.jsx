import FsLightbox from "fslightbox-react";
import { useState, useEffect } from "react";
import Social from "../../contact/Social";

const Content_03 = () => {
  // State to control lightbox toggle
  const [toggler, setToggler] = useState(false);

  // Automatically open the video lightbox on component mount
  useEffect(() => {
    setToggler(true); // Open the lightbox on mount
  }, []);

  return (
    <div className="">
      {/* Section Content Block */}
      <div
        className="jso absolute flex justify-center flex-col w-full z-10 top-52 left-16"
        data-jos_animation="zoom"
      >
        <h2 className="text-colorBlue font-bold text-4xl">Crown Bankers</h2>
        <h2 className="text-white font-spaceGrotesk text-4xl font-medium leading-[1.06] -tracking-[2px] sm:text-[44px] lg:text-[56px] xl:text-[70px] align-start flex w-full">
          An Alternative <br /> Energy Source
        </h2>
      </div>

      <video autoPlay loop muted className="relative w-full h-full">
        <source src="/assets/img/home.mp4" type="video/mp4" />
      </video>
      <div className="flex w-full justify-end mt-4">
        <Social />
      </div>
    </div>
  );
};

export default Content_03;
