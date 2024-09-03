import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Social from "../../contact/Social";

const Content_03 = () => {
  // To open the lightbox, change the value of the "toggler" prop.
  const [toggler, setToggler] = useState(false);

  return (
    <section id="content-section-3">
      {/* Section Spacer */}
      <div className="py-20 xl:pb-[150px] xl:pt-[130px]">
        {/* Section Container */}
        <div className="global-container">
          {/* Section Content Block */}

          {/* Section Content Block */}
          <div
            className="jso relative overflow-hidden rounded-[10px] bg-[#363535A6] h-[40rem] flex justify-center  flex-col w-full"
            data-jos_animation="zoom"
          >
            {/* Video Play Button */}
            <button className="relative flex w-full items-center justify-center z-[1] mt-32 ">
              <div
                className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-colorBlue bg-black text-lg font-bold backdrop-blur-[2px] transition-all duration-300"
                onClick={() => setToggler(!toggler)}
              >
                Play
                <div className="absolute -z-[1] h-[110%] w-[110%] animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-colorBlue opacity-30"></div>
              </div>
            </button>
            {/* Video Play Button */}
            <div className="jos mt-10  px-10">
              <h2 className="text-colorBlue text-2xl">Crown Bankers</h2>
              <h2 className="font-spaceGrotesk text-4xl font-medium leading-[1.06] -tracking-[2px] text-white sm:text-[44px] lg:text-[56px] xl:text-[70px] align-start flex w-full">
                An Alternative <br /> Energy Source
              </h2>
            </div>
          </div>

          {/* Lightbox with Video File */}
          <FsLightbox
            toggler={toggler}
            sources={["/assets/img/home.mp4"]}
            type="video"
          />

          <div className="flex w-full justify-end mt-4">
            <Social />
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_03;
