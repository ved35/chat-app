import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGifModal } from "../redux/Slices/app";

function GifModel() {
  const modelRef = useRef(null);

  const dispatch = useDispatch();
  const { gif } = useSelector((state) => state.app.modal);
  const { selectedGifURL } = useSelector((state) => state.app);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!gif || keyCode !== 27) return;

      dispatch(
        updateGifModal({
          value: false,
          url: null,
        })
      );
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        gif ? "block" : "hidden"
      }`}
    >
      <div
        className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12"
        ref={modelRef}
      >
        <div className="flex flex-row items-center justify-between mb-8 space-x-2">
          <div className="text-md font-medium text-black dark:text-white">
            Send Giphy
          </div>

          <button
            onClick={() => {
              dispatch(
                updateGifModal({
                  value: false,
                  url: null,
                })
              );
            }}
          >
            <X size={24} />
          </button>
        </div>

        <img
          src={selectedGifURL}
          alt="gifs..."
          className="w-full rounded-lg mx-auto max-h-125 object-cover object-center"
        />

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

export default GifModel;
