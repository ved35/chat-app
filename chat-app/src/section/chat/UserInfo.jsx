import { Chat, Clock, DotsThreeVertical, VideoCamera, X } from "@phosphor-icons/react";
import React from "react";

function UserInfo({ handleToggleUserInfo }) {
  return (
    <div className="border-l flex flex-col h-full border-stroke dark:border-strokedark">
      <div className="sticky border-b border-stroke dark:border-strokedark flex flex-row items-center justify-between w-full px-6 py-7.5">
        <div className="text-black dark:text-white font-semibold text-lg">
          Profile
        </div>

        <button
          onClick={() => {
            handleToggleUserInfo();
          }}
        >
          <X size={24} />
        </button>
      </div>

      <div className="mx-auto my-8">
        <img
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Profile"
          className="w-44 h-34 rounded-lg object-cover object-center "
        />
      </div>

      <div className="px-6 space-y-1">
        <div className="text-black dark:text-white text-xl font-medium">
          Rio patel
        </div>

        <span className="text-body text-md">Web delevloper</span>
      </div>

      <div className="px-6 my-6">
          <div className="flex flex-row space-x-2">
            <Clock size={20} />
            <div>6:50 AM Local time</div>
          </div>
      </div>

      <div className="px-6 flex flex-row space-x-2 ">
          <button className="w-full border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
            <Chat size={20} className="mr-3" />
            Message
          </button>
          <button className="w-full border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
            <VideoCamera size={20} className="mr-3" />
            Huddle
          </button>
          <button className="border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
            <DotsThreeVertical size={20} />
          </button>
      </div>
    </div>
  );
}

export default UserInfo;
