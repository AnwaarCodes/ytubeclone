import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegCommentDots, FaGift } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";

const Notifications = () => {
  // Random notifications array with types
  const notifications = [
    { message: "Your subscription will expire in 3 days.", type: "alert" },
    { message: "New video uploaded by 'Tech Guru'.", type: "info" },
    { message: "Complete your profile for better recommendations.", type: "task" },
    { message: "You have 5 unread comments.", type: "comment" },
    { message: "Exclusive offer: Get premium for 30% off!", type: "offer" },
  ];

  // Type-specific styling
  const typeStyles = {
    alert: "bg-gradient-to-r from-red-400 to-pink-500",
    info: "bg-gradient-to-r from-blue-400 to-cyan-500",
    task: "bg-gradient-to-r from-green-400 to-teal-500",
    comment: "bg-gradient-to-r from-purple-400 to-indigo-500",
    offer: "bg-gradient-to-r from-yellow-400 to-orange-500",
  };

  const typeIcons = {
    alert: <AiOutlineClockCircle size="20px" className="text-white" />,
    info: <MdOutlineNotificationsActive size="20px" className="text-white" />,
    task: <AiOutlineClockCircle size="20px" className="text-white" />,
    comment: <FaRegCommentDots size="20px" className="text-white" />,
    offer: <FaGift size="20px" className="text-white" />,
  };

  return (
    <div className="fixed top-16 right-5 w-[350px] h-[470px] bg-gray-800 shadow-lg rounded-lg overflow-y-auto border border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 py-3 px-4 shadow-md rounded-md ${typeStyles[notification.type]}`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md">
              {typeIcons[notification.type]}
            </div>
            {/* Message */}
            <p className="text-white text-sm font-medium">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
