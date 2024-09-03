import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import data from "./data.json";
import Member from "../../../components/widget/team/Member";

const Team = () => {
  return (
    <>
      <main className="main-wrapper relative overflow-hidden pt-32 bg-black text-white">
        <section id="team-section">
          <div className="pb-40 xl:pb-[220px]">
            <div className="global-container">
              <div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
                <div className="mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[746px]">
                  <h2>About Our CEO</h2>
                </div>
              </div>
              <ul className="flex items-center justify-center w-full  gap-6 ">
                {data.map((member, index) => (
                  <Member key={index} {...member} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Team;
