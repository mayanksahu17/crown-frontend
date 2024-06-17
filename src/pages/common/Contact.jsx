import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Contact_Section from "../../components/sections/inner-pages/contact/contact_section/Contact_Section";
import Map from "../../components/sections/inner-pages/contact/Map";

const Contact = () => {
  return (
    <>
      <main className="main-wrapper relative overflow-hidden">
        <Breadcrumb title="Contact Us" link="Contact" />
        <Contact_Section />
        {/* <Map /> */}
      </main>
    </>
  );
};

export default Contact;
