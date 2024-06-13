import React, { useEffect, useRef, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { io } from "socket.io-client";
import notificationService from "../../services/notificationService";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const notificationType = [
  {
    type: "fund_management",
    title: "Fund Report",
    redirect: "/dashboard",
  },
  {
    type: "powerleg",
    title: "Powerleg",
    redirect: "/dashboard/investments/package-activation",
  },
  {
    type: "free",
    title: "Free",
    redirect: "/dashboard/investments/package-activation",
  },
  {
    type: "coinpayment",
    title: "Coinpayment Report",
    redirect: "/dashboard/investments/package-activation",
  },
  {
    type: "investment",
    title: "Investment Report",
    redirect: "/dashboard/investments/package-activation",
  },
  {
    type: "rb_withdrawal",
    title: "R&B Withdrawal",
    redirect: "/dashboard/reports/withdrawal",
  },
  {
    type: "roi_withdrawal",
    title: "ROI Withdrawal",
    redirect: "/dashboard/reports/withdrawal",
  },
  {
    type: "interest_withdrawal",
    title: "Interest Withdrawal",
    redirect: "/dashboard/reports/withdrawal",
  },
  {
    type: "token",
    title: "Token Report",
    redirect: "/dashboard/vouchers/all",
  },
  {
    type: "kyc",
    title: "KYC",
    redirect: "/dashboard/settings/kyc",
  },
  {
    type: "ticket",
    title: "Ticket",
    redirect: "/dashboard/tickets/all",
  },
  {
    type: "binary",
    title: "Binary Report",
    redirect: "/dashboard/reports/bi",
  },
  {
    type: "referral",
    title: "Referral Report",
    redirect: "/dashboard/reports/ri",
  },
  {
    type: "career",
    title: "Extra Income Report",
    redirect: "/dashboard/reports/extra-income",
  },
  {
    type: "roi",
    title: "ROI Report",
    redirect: "/dashboard/reports/roi",
  },
];
const Notifications = () => {
  const { user } = useAuth();

  const notificationRef = useRef(null);
  const notificationBtnRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [render, setRender] = useState(false);
  //'misc','ticket','fund_management','powerleg','free','coinpayment','investment','rb_withdrawal','roi_withdrawal','interest_withdrawal','token','kyc','binary','referral','roi'
  useEffect(() => {
    // const socket = io("http://localhost:5000");
    const socket = io("https://crownbankers.com");
    // Emit user ID to the server
    socket.emit("userId", user?.user?.userId);
    socket.on("newUserNotification", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationService.getAllNotifications(user);
        console.log(res);
        if (res?.data?.success) {
          setAllNotifications(res?.data?.notifications);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })();
  }, [render]);
  const markNotification = async (id) => {
    try {
      const response = await notificationService.markNotificationAsSeen(
        {
          ids: [id],
          status: 1,
        },
        user
      );
      console.log(response);
      if ((response.status = 200)) {
        setRender((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const markAllNotificationsAsRead = async () => {
    try {
      setIsNotificationOpen(false);

      if (allNotifications?.length === 0) {
        return;
      }

      const notificationIds = allNotifications.map(
        (notification) => notification.id
      );
      const response = await notificationService.markNotificationAsSeen(
        {
          ids: notificationIds,
          status: 1,
        },
        user
      );
      if ((response.status = 200)) {
        setRender((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "notification-btn") {
        if (
          notificationBtnRef.current &&
          !notificationBtnRef.current.contains(event.target) &&
          notificationRef.current &&
          !notificationRef.current.contains(event.target)
        ) {
          // console.log(event.target);
          setIsNotificationOpen(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="w-10 h-10 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
        ref={notificationBtnRef}
        onClick={() => setIsNotificationOpen((prev) => !prev)}
      >
        <GrNotification size={16} color="#6B7280" />
      </button>
      {isNotificationOpen && (
        <div
          ref={notificationRef}
          className="absolute right-5 z-50 top-10 font-normal bg-white rounded shadow-sm mt-2 py-2 w-64 md:w-80 text-sm"
        >
          <div className="flex items-center justify-between px-3">
            <h2 className="text-base sm:text-lg">Notifications</h2>
            <p
              className="text-xs cursor-pointer hover:underline"
              onClick={markAllNotificationsAsRead}
            >
              MARK ALL AS READ
            </p>
          </div>

          <div className="mt-1 md:mt-4">
            {allNotifications.length > 0 ? (
              allNotifications.map((el, index) => (
                <Link
                  to={
                    notificationType.filter((ele) => ele.type === el.type)[0]
                      ?.redirect
                  }
                  onClick={() => {
                    markNotification(el?.id);
                    setRender((prev) => !prev);

                    setIsNotificationOpen(false);
                  }}
                >
                  <div
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200 flex items-start gap-4"
                    key={index}
                  >
                    {!el?.is_seen && (
                      <div className="bg-green-500 w-2 h-2 rounded-full" />
                    )}
                    <div className="w-full">
                      <p className="text-black">{el?.message}</p>
                      <p className="text-xs mt-1">{el?.created_date}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-3">No Notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
