import { Smiley } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

function EmojiPicker() {

    const colorMode = JSON.parse(window.localStorage.getItem('color-theme'));
  const [pickerOpen, setPickerOpen] = useState(false);

  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(()=>{
    const handleClickOutSide = (e) => {
        if(pickerRef.current && !pickerRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)){
            setPickerOpen(false)
        }
    }
    document.addEventListener('click',handleClickOutSide)

    return () => {document.removeEventListener('click',handleClickOutSide)}
  })

  const handleTrigger = (e) => {
    e.preventDefault();
    setPickerOpen((pre) => !pre);
  };

  return (
    <div className="relative flex">
      <button
        ref={buttonRef}
        className="text-[#98A6AD] hover:text-body"
        onClick={handleTrigger}
      >
        <Smiley size={20} className="text-body" />
      </button>
      {pickerOpen && (
        <div ref={pickerRef} className="absolute z-40 -top-115 right-0">
          <Picker theme={colorMode} data={data} onEmojiSelect={console.log} />
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
