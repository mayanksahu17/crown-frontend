import Contact_From from "./section_part/Contact_From";
import Contact_Info from "./section_part/Contact_Info";

const Contact_Section = () => {
  return (
    <div className="pb-20 xl:pb-[150px] pt-32 bg-colorBlack text-white">
      {/* Section Container */}
      <div className="global-container">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 xl:grid-cols-[minmax(0,_1fr)_1.1fr]">
          {/* Contact Left Block */}
          <Contact_Info />
          {/* Contact Left Block */}
          {/* Contact Right Block */}
          <Contact_From />
          {/* Contact Right Block */}
        </div>
      </div>
      {/* Section Container */}
    </div>
  );
};

export default Contact_Section;
