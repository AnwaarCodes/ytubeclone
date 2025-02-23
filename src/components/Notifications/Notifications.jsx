import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegCommentDots, FaGift } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";

const Notifications = () => {
  const notifications = [
    { message: "Your subscription will expire in 3 days.", type: "alert" },
    { message: "New video uploaded by 'Tech Guru'.", type: "info" },
    { message: "Complete your profile for better recommendations.", type: "task" },
    { message: "You have 5 unread comments.", type: "comment" },
    { message: "Exclusive offer: Get premium for 30% off!", type: "offer" },
  ];

  const typeStyles = {
    alert: "border-red-500",
    info: "border-blue-500",
    task: "border-green-500",
    comment: "border-purple-500",
    offer: "border-yellow-500",
  };

  const typeIcons = {
    alert: <AiOutlineClockCircle size="20px" className="text-red-500" />,
    info: <MdOutlineNotificationsActive size="20px" className="text-blue-500" />,
    task: <AiOutlineClockCircle size="20px" className="text-green-500" />,
    comment: <FaRegCommentDots size="20px" className="text-purple-500" />,
    offer: <FaGift size="20px" className="text-yellow-500" />,
  };

  return (
    <div className="fixed top-16 right-5 w-[350px] h-[470px] bg-gray-800 shadow-lg rounded-lg overflow-y-auto border border-gray-700">
      {/* Header */}
      <div className="pt-2 pb-2 pl-4 border-b border-gray-700 bg-gray-900 rounded-t-lg">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 bg-gray-900 border-l-4 rounded-md ${typeStyles[notification.type]}`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
              {typeIcons[notification.type]}
            </div>
            {/* Message */}
            <p className="text-gray-300 text-sm font-medium">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
