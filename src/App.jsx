import { Route, Routes } from "react-router-dom";
import Home_01 from "./pages/home/Home_01";
import About from "./pages/common/About";
import Home_02 from "./pages/home/Home_02";
import Home_03 from "./pages/home/Home_03";
import Home_04 from "./pages/home/Home_04";
import Blog_details from "./pages/common/Blog_details";
import Blog from "./pages/common/Blog";
import Contact from "./pages/common/Contact";
import TermsandCondition from "./pages/common/TermsandCondition";
import Faq_02 from "./pages/common/faq/faq_02/Faq_02";
import Login from "./pages/common/Login";
import Portfolio_details from "./pages/common/Portfolio_details";
import Portfolio from "./pages/common/Portfolio";
import Pricing from "./pages/common/Pricing";
import PrivacyPolicies from "./pages/common/PrivacyPolicies";
import Services_Details from "./pages/common/Service_Details";
import Services from "./pages/common/Services";
import Signup from "./pages/common/Signup";
import Team_details from "./pages/common/Team_details";
import Team from "./pages/common/team/Team";
import useJOSAnimation from "./hooks/useJOSAnimation";
import Layout from "./components/layout/Layout";
import Faq_01 from "./pages/common/faq/faq_01/Faq_01";
import package_01 from "./pages/common/package_01";
// Dashboard Pages
import {
  Home,
  Investment,
  Settings,
  SignUpAs,
  Genealogy,
  Reports,
  Tickets,
  Vouchers,
  VerifyEmail,
  ForgotPassword,
} from "./pages";
import { UserBinaryTree } from "./components";
import DashboardLayout from "./layouts/DashboardLayout";
function App() {
  // Init JOS Animation
  useJOSAnimation();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home_01 />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-details" element={<Blog_details />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio-details" element={<Portfolio_details />} />
          <Route path="faq-1" element={<Faq_01 />} />
          <Route path="faq-2" element={<Faq_02 />} />
          <Route path="team" element={<Team />} />
          <Route path="team-details" element={<Team_details />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="PrivacyPolicies" element={<PrivacyPolicies />} />
          <Route path="services" element={<Services />} />
          <Route path="service-details" element={<Services_Details />} />
          <Route path="TermsandCondition" element={<TermsandCondition />} />
          <Route path="package_01" element={<package_01 />} />
        </Route>
        <Route path="home-2" element={<Home_02 />} />
        <Route path="home-3" element={<Home_03 />} />
        <Route path="home-4" element={<Home_04 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signupas" element={<SignUpAs />} />
        <Route
          exact
          path="signup/:sponsorId/:position"
          element={<SignUpAs />}
        />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="investments/:selectedRoute" element={<Investment />} />
          <Route path="settings/:selectedRoute" element={<Settings />} />
          <Route path="genealogy/:selectedRoute" element={<Genealogy />} />
          <Route path="genealogy/binary/:userId" element={<UserBinaryTree />} />
          <Route path="vouchers/:selectedRoute" element={<Vouchers />} />
          <Route path="reports/:selectedRoute" element={<Reports />} />
          <Route path="tickets/:selectedRoute" element={<Tickets />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
