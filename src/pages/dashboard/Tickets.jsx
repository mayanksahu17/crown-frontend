import { SubmitTicket, AllTicket, Tab } from "../../Components";

export default function Tickets() {
  const data = [
    {
      name: "Submit Ticket",
      route: "/dashboard/tickets/submit-ticket",
      children: <SubmitTicket />,
    },
    {
      name: "All Tickets",
      route: "/dashboard/tickets/all",
      children: <AllTicket />,
    },
  ];

  return (
    <div className="w-full mt-4">
      <div className=" w-full">
        <Tab data={data} />
      </div>
    </div>
  );
}
