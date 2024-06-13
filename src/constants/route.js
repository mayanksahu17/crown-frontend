import {
  DashboardIcon,
  AnalyticsIcon,
  HomeIcon,
  ChatIcon,
  DebitIcon,
  SettingIcon,
} from "../assets";
import { FiLink } from "react-icons/fi";
import { BiSolidNotepad } from "react-icons/bi";
import { IoTicketSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Investment",
    route: "/dashboard/investment",
    icon: DashboardIcon,
    childNavs: [
      {
        name: "All Plans",
        route: "/dashboard/investments/all-plans",
        icon: IoTicketSharp,
      },
      {
        name: "Package Activation",
        route: "/dashboard/investments/package-activation",
        icon: IoTicketSharp,
      },
      {
        name: "Downline Activation",
        route: "/dashboard/investments/downline-activation",
        icon: IoTicketSharp,
      },
    ],
  },
  {
    name: "Vouchers",
    route: "/dashboard/vouchers",
    icon: ChatIcon,
    childNavs: [
      {
        name: "Create Voucher",
        route: "/dashboard/vouchers/create",
        icon: FaRegCreditCard,
      },
      {
        name: "Vouchers List",
        route: "/dashboard/vouchers/all",
        icon: FaRegCreditCard,
      },
    ],
  },
  {
    name: "Genealogy",
    route: "/dashboard/genealogy",
    icon: AnalyticsIcon,
    childNavs: [
      {
        name: "Referral",
        route: "/dashboard/genealogy/referral",
        icon: FiLink,
      },
      {
        name: "Binary Tree",
        route: "/dashboard/genealogy/binary",
        icon: FiLink,
      },
    ],
  },
  {
    name: "Tickets",
    route: "/dashboard/tickets",
    icon: ChatIcon,
    childNavs: [
      {
        name: "Submit Ticket",
        route: "/dashboard/tickets/submit-ticket",
        icon: IoTicketSharp,
      },
      {
        name: "All Tickets",
        route: "/dashboard/tickets/all",
        icon: IoTicketSharp,
      },
    ],
  },
  {
    name: "Report",
    route: "/dashboard/reports",
    icon: DebitIcon,
    childNavs: [
      {
        name: "ROI Report",
        route: "/dashboard/reports/roi",
        icon: BiSolidNotepad,
      },
      {
        name: "BI Report",
        route: "/dashboard/reports/bi",
        icon: BiSolidNotepad,
      },
      {
        name: "RI Report",
        route: "/dashboard/reports/ri",
        icon: BiSolidNotepad,
      },
      // {
      //   name: "Deposits Report",
      //   route: "/dashboard/reports/deposits",
      //   icon: BiSolidNotepad,
      // },
      {
        name: "Extra Income Report",
        route: "/dashboard/reports/extra-income",
        icon: BiSolidNotepad,
      },
      {
        name: "Tokens Report",
        route: "/dashboard/reports/tokens",
        icon: BiSolidNotepad,
      },
      {
        name: "Withdrawal Report",
        route: "/dashboard/reports/withdrawal",
        icon: BiSolidNotepad,
      },
    ],
  },
  {
    name: "Settings",
    route: "/dashboard/settings",
    icon: SettingIcon,
    childNavs: [
      {
        name: "Profile Settings",
        route: "/dashboard/settings/profile",
        icon: FaUser,
      },
      {
        name: "Security Settings",
        route: "/dashboard/settings/security",
        icon: FaUser,
      },
      {
        name: "Notification Settings",
        route: "/dashboard/settings/notification",
        icon: FaUser,
      },
      {
        name: "KYC Settings",
        route: "/dashboard/settings/kyc",
        icon: FaUser,
      },
    ],
  },
];
export default routes;
