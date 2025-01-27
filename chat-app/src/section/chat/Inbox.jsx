import React, { useState } from "react";
import user01 from "../../images/user/user-01.png";
import {
  Gif,
  LinkSimple,
  Microphone,
  PaperPlaneTilt,
  Phone,
  VideoCamera,
} from "@phosphor-icons/react";
import Dropdown from "../../componets/Dropdown";
import EmojiPicker from "../../componets/EmojiPicker";
import UserInfo from "./UserInfo";
import Giphy from "../../componets/Giphy";
import { useDispatch } from "react-redux";
import { updateAudioModal } from "../../redux/Slices/app";
import Attachment from "../../componets/Attachment";
import MsgSeparator from "../../componets/MsgSeparator";
import TypingIndicator from "../../componets/TypingIndicator";
import {
  DocumentMessage,
  MediaMessage,
  TextMessage,
  VoiceMessage,
} from "../../componets/messages";
import VideoRoom from "../../componets/VideoRoom";
import AudioRoom from "../../componets/AudioRoom";

function Inbox() {
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const [gifOpen, setGifOpen] = useState(false);
  const [videoCall, setVideoCall] = useState(false)
  const [audioCall, setAudioCall] = useState(false)

  const dispatch = useDispatch();

  const handleToggleGifs = (e) => {
    e.preventDefault();
    setGifOpen((pre) => !pre);
  };

  const handleToggleVideoCall = (e) => {
    e.preventDefault();
    setVideoCall((pre) => !pre);
  };
  
  const handleToggleAudioCall = (e) => {
    e.preventDefault();
    setAudioCall((pre) => !pre);
  };

  const handleToggleAudio = (e) => {
    e.preventDefault();
    dispatch(updateAudioModal(true));
  };

  const handleToggleUserInfo = () => {
    setUserInfoOpen((pre) => !pre);
  };

  return (
    <>
      <div
        className={`flex h-full flex-col border-1 border-stroke dark:border-strokedark  ${
          userInfoOpen ? "xl:w-1/2" : "xl:w-3/4"
        }`}
      >
        <div className="sticky flex items-center flex-row justify-between border-b border-stroke dark:border-strokedark px-6 py-4.5">
          <div
            className="flex items-center"
            onClick={() => {
              handleToggleUserInfo();
            }}
          >
            <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
              <img
                src={user01}
                alt="avatar"
                className="h-full w-fill object-cover object-center"
              />
            </div>

            <div>
              <h5 className="font-medium text-black dark:text-white">
                Henry dholi
              </h5>
              <p className="text-sm">Reply to message</p>
            </div>
          </div>

          <div className="flex flex-row items-center space-x-8">
            <button onClick={handleToggleVideoCall}>
              <VideoCamera size={24} />
            </button>
            <button onClick={handleToggleAudioCall}>
              <Phone size={24} />
            </button>
            <Dropdown />
          </div>
        </div>

        <div className="max-h-full space-y-3.5 overflow-auto no-scrollbar px-6 py-7.5 grow">
          <TextMessage
            author="Andri thomas"
            content="hello, how are you"
            timeStamp="1:15pm"
            read_receipt="sent"
            incoming={true}
          />

          <TextMessage
            author="Ved"
            content="hello, i am fine!"
            timeStamp="1:17pm"
            read_receipt="read"
            incoming={false}
          />

          <MsgSeparator />

          <TextMessage
            author="Andri thomas"
            content="Have you visit this web https://chatgpt.com?"
            timeStamp="1:18pm"
            read_receipt="sent"
            incoming={true}
          />

          <TextMessage
            author="Ved"
            content="Yes"
            timeStamp="1:19pm"
            read_receipt="delivered"
            incoming={false}
          />

          <VoiceMessage
            author="Andri thomas"
            timeStamp="1:23pm"
            read_receipt="delivered"
            incoming={false}
          />

          <MediaMessage
            author="Andri thomas"
            timeStamp="1:24pm"
            read_receipt="delivered"
            incoming={true}
            assets={[]}
            caption="This is beautifull car"
          />

          <DocumentMessage
            author="Andri thomas"
            timeStamp="1:25pm"
            read_receipt="delivered"
            incoming={true}
          />

          <DocumentMessage
            author="Andri thomas"
            timeStamp="1:30pm"
            read_receipt="delivered"
            incoming={false}
          />

          <TextMessage
            author="Ved"
            content="I am checking it"
            timeStamp="1:31pm"
            read_receipt="sent"
            incoming={false}
          />

          <TypingIndicator />
        </div>

        <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
          <form
            action=""
            className="flex items-center justify-between space-x-4.5"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Type somethinmg here..."
                className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none h focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
              />

              <div className="absolute right-5 top-1/2 -translate-y-1/2 items-center justify-center space-x-4">
                <button
                  className="hover:text-primary"
                  onClick={handleToggleAudio}
                >
                  <Microphone size={20} />
                </button>
                <button className="hover:text-primary">
                  <Attachment />
                </button>
                <button
                  className="hover:text-primary"
                  onClick={handleToggleGifs}
                >
                  <Gif size={20} />
                </button>
                <button className="hover:text-primary">
                  <EmojiPicker />
                </button>
              </div>
            </div>
            <button className="flex items-center justify-center bg-primary h-13 max-w-13 w-full rounded-md text-white hover:bg-opacity-90">
              <PaperPlaneTilt size={24} weight="bold" />
            </button>
          </form>
          {gifOpen && <Giphy />}
        </div>
      </div>
      {videoCall && <VideoRoom open={videoCall} handleClose={handleToggleVideoCall} />}

      {audioCall && <AudioRoom open={audioCall} handleClose={handleToggleAudioCall} />}
      {userInfoOpen && (
        <div className="w-1/4">
          <UserInfo handleToggleUserInfo={handleToggleUserInfo} />
        </div>
      )}
    </>
  );
}

export default Inbox;
