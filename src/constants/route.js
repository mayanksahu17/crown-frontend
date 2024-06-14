import {
  DashboardIcon,
  AnalyticsIcon,
  HomeIcon,
  ChatIcon,
  DebitIcon,
} from "../assets";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Investment",
    route: "/dashboard/investments/all-plans",
    icon: DashboardIcon,
  },
  {
    name: "Vouchers",
    route: "/dashboard/vouchers/create",
    icon: ChatIcon,
  },
  {
    name: "Genealogy",
    route: "/dashboard/genealogy/binary",
    icon: AnalyticsIcon,
  },
  {
    name: "Tickets",
    route: "/dashboard/tickets/submit-ticket",
    icon: ChatIcon,
  },
  {
    name: "Report",
    route: "/dashboard/reports/roi",
    icon: DebitIcon,
  },
];
export default routes;
