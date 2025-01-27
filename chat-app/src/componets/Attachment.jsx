import { File, Image, Paperclip } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDocumentModal, updateMediaModal } from "../redux/Slices/app";

function Attachment() {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      console.log(
        "dropDown-->",
        !dropdown,
        dropdown.current.contains(target),
        trigger.current.contains(target)
      );
      console.log("trigger-->", trigger.current);

      if (!dropdown.current) return;

      if (
        !dropdown ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }

      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;

      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative flex">
      <button
        ref={trigger}
        className="text-[#98A6AD] hover:text-body"
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen((pre) => !pre);
        }}
      >
        <Paperclip weight="bold" size={20} />
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 -top-24 z-40 w-44 space-y-1 rounded-sm border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateMediaModal(true));
          }}
        >
          <Image size={20} />
          Images & Videos
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateDocumentModal(true));
          }}
        >
          <File size={20} />
          Files & Documents
        </button>
      </div>
    </div>
  );
}

export default Attachment;
