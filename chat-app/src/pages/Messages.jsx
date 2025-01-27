import React from "react";
import { ChatList, MessageInbox } from "../section/chat";
import GifModel from "../componets/GifModel";
import VoiceRecorder from "../componets/VoiceRecorder";
import MediaPicker from "../componets/MediaPicker";
import DocumentPicker from "../componets/DocumentPicker";

function Messages() {
  return (
    <>
      <div className="flex w-full">
        {/* ChatList */}
        <ChatList />

        {/* Inbox */}
        <MessageInbox />
      </div>
      <GifModel />
      <VoiceRecorder />
      <MediaPicker />
      <DocumentPicker />
    </>
  );
}

export default Messages;
