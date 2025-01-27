import { Check, Checks } from "@phosphor-icons/react";
import React from "react";
import WaveForm from "../WaveForm";

function Voice({
  incoming,
  author,
  timeStamp,
  read_receipt, // 'read' | 'delivered | 'sent'
}) {
  return incoming ? (
    <div className="max-w-125">
      <div className="mb-2.5 rounded-2xl rounded-tl-none px-5 py-3 bg-gray dark:bg-boxdark-2">
        {/* waveform */}
        <WaveForm incoming={incoming} />
      </div>
      <p className="text-xs">{timeStamp}</p>
    </div>
  ) : (
    <div className="max-w-125 ml-auto">
      <div className="mb-2.5 rounded-2xl rounded-br-none px-5 py-3">
        {/* waveform */}
        <WaveForm incoming={incoming} />
      </div>
      <div className="flex flex-row items-center justify-end space-x-2">
        <div
          className={`${
            read_receipt !== "read"
              ? "text-body dark:text-white"
              : "text-primary"
          }`}
        >
          {read_receipt !== "sent" ? (
            <Checks size={18} weight="bold" />
          ) : (
            <Check size={18} weight="bold" />
          )}
        </div>
        <p className="text-xs text-right">{timeStamp}</p>
      </div>
    </div>
  );
}

export default Voice;
