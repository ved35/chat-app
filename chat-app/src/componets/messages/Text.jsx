import React from "react";
import { extractLinks } from "../../utils/extractLinks";
import MicroLink from "@microlink/react";
import { Check, Checks } from "@phosphor-icons/react";

function Text({ 
  incoming,
  author, 
  timeStamp, 
  read_receipt,  // 'read' | 'delivered | 'sent'
  content 
}) {
  const { links, originalString } = extractLinks(content);

  return incoming ? (
    <div className="max-w-125">
      <p className="mb-2.5 text-sm font-medium capitalize">{author}</p>
      <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 space-y-2">
        <p dangerouslySetInnerHTML={{ __html: originalString }} />
        {links?.length > 0 && (
          <MicroLink style={{ width: "100%" }} url={links[0]}></MicroLink>
        )}
      </div>
      <p className="text-xs">{timeStamp}</p>
    </div>
  ) : (
    <div className="max-w-125 ml-auto">
      <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 space-y-2">
        <p className="text-white" dangerouslySetInnerHTML={{ __html: originalString }} />
        {links.length > 0 && (
          <MicroLink style={{ width: "100%" }} url={links[0]}></MicroLink>
        )}
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
        <p className="text-xs">{timeStamp}</p>
      </div>
    </div>
  );
}

export default Text;
