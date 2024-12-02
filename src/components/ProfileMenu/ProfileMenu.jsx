import React from "react";

const ProfileMenu = () => {
  return (
    <div className="absolute w-[280px] h-[450px] right-[5%] top-[35%] bg-gray-900 text-white rounded-lg p-4 shadow-lg overflow-y-auto">
      <h3 className="text-lg font-bold">Usman Ghazi</h3>
      <p className="text-sm text-gray-400">@randomuser251</p>
      <a href="#" className="text-blue-500 text-sm hover:underline">
        View your channel
      </a>
      <hr className="border-gray-700 my-2" />
      <ul className="space-y-2 text-sm">
        <li className="hover:text-blue-500 cursor-pointer">Google Account</li>
        <li className="hover:text-blue-500 cursor-pointer">Switch account</li>
        <li className="hover:text-blue-500 cursor-pointer">Sign out</li>
        <hr className="border-gray-700" />
        <li className="hover:text-blue-500 cursor-pointer">YouTube Studio</li>
        <li className="hover:text-blue-500 cursor-pointer">Purchases and memberships</li>
        <hr className="border-gray-700" />
        <li className="hover:text-blue-500 cursor-pointer">Your data in YouTube</li>
        <li className="hover:text-blue-500 cursor-pointer">Appearance: Device theme</li>
        <li className="hover:text-blue-500 cursor-pointer">Language: Turkish</li>
        <li className="hover:text-blue-500 cursor-pointer">Restricted Mode: Off</li>
        <li className="hover:text-blue-500 cursor-pointer">Location: Turkey</li>
        <li className="hover:text-blue-500 cursor-pointer">Keyboard shortcuts</li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
