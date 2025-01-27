import React from "react";

function MsgSeparator() {
  return (
    <div className="flex flex-row items-center space-x-5 w-full py-2">
      <div className="border-b border-stroke dark:border-strokedark grow"></div>
      <div className="p-2 bg-gray dark:bg-graydark rounded-md text-xs text-body font-medium">
        Today
      </div>
      <div className="border-b border-stroke dark:border-strokedark grow"></div>
    </div>
  );
}

export default MsgSeparator;
