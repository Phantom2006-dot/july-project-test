"use client";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import {userImage} from "@/constants/images";
import { IoCall } from "react-icons/io5";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { GrSend } from "react-icons/gr";
import ChatBubble from "@/components/ChatBubble";

const page = ({ params }) => {
  const { device, user, myContacts, setMyContacts } = useGlobalContext();
  const { roomId } = use(params);
  const [messages, setMessages] = useState([
    {
      messageId: "ywcujvcuwccvc",
      sender: "ekwdgovt",
      receiver: "cvcuvcwb",
      stat: "sent",
      message: "hello",
      timestamp: Date.now(),
      readBy: ["cvcuvcwb"],
    },
    {
      messageId: "ywcujvcuwccvc",
      sender: "cvcuvcwb",
      receiver: "ekwdgovt",
      stat: "sent",
      message: "How are you?",
      timestamp: Date.now(),
      readBy: ["cvcuvcwb"],
    },
  ]);

  let testString = ``;

  testString = "emeka-ugwu kamsy myles";

  const Header = () => {
    return (
      <div
        className={`flex w-full bg-white border-b border-gray-200 border items-center h-fit max-h-[11%] px-3 py-2`}
      >
        <div
          className={`flex items-center justify-center aspect-square bg-gray-200 max-w-[6%] min-w-[6%] rounded-full`}
        >
          {testString && (
            <Image
              src={userImage}
              alt="user"
              width={200}
              className={`w-full object-contain rounded-full`}
            />
          )}
        </div>

        <div className={`w-full pl-3 flex text-[12px] flex-col`}>
          <div
            className={`w-2/3 max-w-2/3 text-nowrap text-sm capitalize overflow-hidden text-ellipsis ${
              !testString?.trim() ? "bg-gray-200 rounded-2xl p-1 mb-1" : ""
            }`}
          >
            {testString}
          </div>

          <div
            className={`w-1/5 max-w-1/5 text-nowrap text-[var(--primary)] text-[12px] overflow-hidden capitalize text-ellipsis ${
              !testString?.trim() ? "bg-gray-200 rounded-2xl p-1" : ""
            }`}
          >
            {testString && "online"}
          </div>
        </div>

        <div
          className={`w-[6%] mr-2 flex items-center bg-gray-100 justify-center aspect-square rounded-full`}
        >
          <IoCall size={24} color="#ff5511f0" />
        </div>
      </div>
    );
  };

  const TextArea = () => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    // Automatically adjust height based on content
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, [message]);

    return (
      <div className="flex w-full bg-transparent border-b border-gray-200 items-center h-fit px-3 pb-3">
        <div className="w-full py-2 rounded-3xl shadow-md bg-white px-4 flex items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            className={`w-full resize-none focus:outline-none bg-white ${
              device === "phone" ? "text-[12px]" : "text-base"
            }`}
            placeholder="Type a message"
            name="message-input"
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                alert("hello world!");
              }
            }}
          />
          <div className="cursor-pointer px-2 text-[var(--primary)]">
            <GrSend size={24} />
          </div>
        </div>
      </div>
    );
  };

  const RenderChats = ({ data }) => {
    return (
      <div className="h-[82%] pt-4 w-full">
        {data?.map((item, i) => {
          return (
            <ChatBubble
              key={i}
              user={item?.sender === "ekwdgovt"}
              text={item?.message}
              time={item?.timestamp}
              messageStatus={"sent"}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col items-center relative w-full overflow-hidden bg-gray-100">
      <Header />
      {/* Render messages, input, etc */}
      <RenderChats data={messages} />
      <TextArea />
    </div>
  );
};

export default page;
