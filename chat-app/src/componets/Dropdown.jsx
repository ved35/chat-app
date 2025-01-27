import { DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";

function Dropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
        console.log("dropDown-->",!dropdown, dropdown.current.contains(target), trigger.current.contains(target));
        console.log("trigger-->",trigger.current);
        
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

  useEffect(()=>{
    const keyHandler = ({keyCode}) => {
        if(!dropdownOpen || keyCode !== 27) return;

        setDropdownOpen(false);
    }

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="relative flex">
      <button
        ref={trigger}
        className="text-[#98A6AD] hover:text-body"
        onClick={() => {
          setDropdownOpen((pre) => !pre);
        }}
      >
        <DotsThree weight="bold" size={24} />
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
          <PencilSimple size={20} />
          Edit
        </button>
        <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
          <Trash size={20} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
