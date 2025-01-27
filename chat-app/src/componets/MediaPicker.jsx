import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMediaModal } from "../redux/Slices/app";
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import FileDropZone from "./FileDropZone";

function MediaPicker() {
  const dispatch = useDispatch();

  const modelRef = useRef(null);

  const { media } = useSelector((state) => state.app.modal);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!media || keyCode !== 27) return;

      dispatch(updateMediaModal(false));
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        media ? "block" : "hidden"
      }`}
    >
      <div
        className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12"
        ref={modelRef}
      >
        <div className="flex flex-row items-center justify-between mb-8 space-x-2">
          <div className="text-md font-medium text-black dark:text-white">
            Choose media files to send
          </div>

          <button
            onClick={() => {
              dispatch(updateMediaModal(false));
            }}
          >
            <X size={24} />
          </button>
        </div>

        <FileDropZone />

        <div className="flex flex-row items-center space-x-2 justify-between mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="border rounded-lg hover:border-primary outline-none w-full p-2 border-stroke dark:border-strokedark bg-transparent dark:bg-form-input"
          />
          <button className="p-2.5 border border-primary flex items-center justify-center bg-primary rounded-lg hover:opacity-90 text-white">
            <PaperPlaneTilt size={20} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaPicker;
