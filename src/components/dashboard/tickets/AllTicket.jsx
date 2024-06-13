import clsx from "clsx";
import { IoTicketSharp } from "react-icons/io5";
import { ticketColumns } from "../../../constants/Column";
import Table from "../global/Table";
import { useAuth } from "../../../hooks/useAuth";
import ticketService from "../../../services/ticketService";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment/moment";

export default function AllTicket() {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    allTickets: [],
  });

  const handleAllDataChange = async (name, value) => {
    setAllData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const res = await ticketService.getAllTicketsByUserId(user);

          if (res.status === 200) {
            handleAllDataChange("allTickets", res?.data?.data);
          }

          console.log(res);
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }
    })();
  }, [user]);

  const { openTicketsCount, closedTicketsCount } = useMemo(() => {
    const openCount = allData.allTickets.filter(
      (ticket) => ticket.status === "Open"
    ).length;
    const closedCount = allData.allTickets.filter(
      (ticket) => ticket.status === "Closed"
    ).length;

    return {
      openTicketsCount: openCount,
      closedTicketsCount: closedCount,
    };
  }, [allData.allTickets]);

  const data = [
    {
      name: "All Tickets",
      amount: allData.allTickets?.length || 0,
      icon: IoTicketSharp,
      color: "#f0932b",
    },
    {
      name: "Open Tickets",
      amount: openTicketsCount || 0,
      icon: IoTicketSharp,
      color: "#be2edd",
    },
    {
      name: "Closed Tickets",
      amount: closedTicketsCount || 0,
      icon: IoTicketSharp,
      color: "#22a6b3",
    },
  ];

  return (
    <div className="w-full mt-4">
      <h4 className="text-xl">All Tickets</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2 text-black w-full">
        {data.map(({ color, amount, name, icon: Icon }, index) => (
          <div
            key={index}
            className={clsx("p-3 rounded-lg ")}
            style={{
              background: color,
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="w-[58px] h-[58px] bg-white rounded-full flex items-center justify-center">
                <Icon size="24" />
              </div>
              <h3 className="text-white font-medium text-2xl">{amount}</h3>
            </div>
            <div className="mt-2 flex items-center justify-between w-full">
              <p className="text-white font-normal">{name}</p>
            </div>
          </div>
        ))}
      </div>
      <Table
        columns={ticketColumns}
        data={allData.allTickets}
        className="mt-6"
      />
    </div>
  );
}
