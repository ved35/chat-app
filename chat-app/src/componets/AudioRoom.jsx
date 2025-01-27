import {
  Microphone,
  MicrophoneSlash,
  PhoneDisconnect,
} from "@phosphor-icons/react";
import React, { useRef, useState } from "react";

import UserO1 from "../images/user/user-01.png";
import UserO2 from "../images/user/user-02.png";

function AudioRoom({ open, handleClose }) {
  const [muteAudio, setMuteAudio] = useState(false);

  const modelRef = useRef(null);

  const handleToggleAudio = () => {
    setMuteAudio((pre) => !pre);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12"
        ref={modelRef}
      >
        <div className="flex flex-col space-y-6">
          {/* audio feed Grid */}
          <div className="flex flex-row space-x-4 w-full h-50 mb-4">
            <div className="relative h-full w-full bg-gray dark:bg-boxdark-2 rounded-md flex items-center justify-center">
              <div className="space-y-2">
                <img
                  src={UserO1}
                  alt="profile img..."
                  className="h-20 w-20 rounded-full object-center object-cover"
                />
                <div className="font-medium text-sm text-center">You</div>
              </div>
              <div className="absolute top-3 right-4">
                {muteAudio && (
                  <MicrophoneSlash size={20} className="text-primary" />
                )}
              </div>
            </div>
            <div className="relative h-full w-full bg-gray dark:bg-boxdark-2 rounded-md flex items-center justify-center">
              <div className="space-y-2">
                <img
                  src={UserO2}
                  alt="profile img..."
                  className="h-20 w-20 rounded-full object-center object-cover"
                />
                <div className="font-medium text-sm text-center">You</div>
              </div>
              <div className="absolute top-3 right-4">
                {<MicrophoneSlash size={20} className="text-primary" />}
              </div>
            </div>
          </div>
          {/* Call Controll */}
          <div className="flex flex-row items-center justify-center space-x-4">
            {/* Microphone button */}
            <button
              className="p-2 rounded-md bg-gray dark:bg-boxdark text-black dark:text-white hover:bg-opacity-80 flex items-center justify-center"
              onClick={handleToggleAudio}
            >
              {muteAudio ? (
                <MicrophoneSlash size={20} />
              ) : (
                <Microphone size={20} />
              )}
            </button>
            {/* Dissconnect button */}
            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-red text-white hover:bg-opacity-90"
            >
              <PhoneDisconnect size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioRoom;
