import { pending, read, sent } from '@/constants/images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ChatBubble = ({ text, time, user, maxWidth = "80%", messageStatus }) => {
  const bgColor = user ? "#ffa37e" : "#d1d5dc";
  const [statusIcon, setStatusIcon] = useState(pending);

  useEffect(() => {
    if (messageStatus === "read") setStatusIcon(read);
    if (messageStatus === "sent") setStatusIcon(sent);
  }, [messageStatus]);

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday =
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const isCurrentWeek = messageDate >= startOfWeek && messageDate <= now;

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isCurrentWeek) {
      return messageDate.toLocaleDateString("en-GB", { weekday: "long" });
    } else {
      return messageDate.toLocaleDateString("en-GB");
    }
  };

  return (
    <div className={`w-full flex px-3 ${user ? "justify-end" : "justify-start"}`}>

    <div
      style={{
        backgroundColor: bgColor,
        lineHeight: "1.4",
      }}
      className={`w-fit relative rounded-lg rounded-bl-none flex-col px-2 py-1.5`}
    >
      {/* Tail */}
      <div
        className={`absolute -bottom-2 w-4 aspect-square bg-transparent z-0 overflow-hidden ${user ? "right-0 rotate-90" : "left-0"}`}
      >
        <div className={`top-half`} style={{background: bgColor}}></div>
      </div>

      {/* Message Content */}
      <div className={`text-sm ${user ? "text-end" : "text-start"}`}>{text}</div>

      {/* Time + Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "4px",
          fontSize: "11px",
          color: "#4d4d4d",
          marginTop: "4px",
        }}
        className={`flex items-center text-[11px] space-x-1 `}
      >
        <span>{time}</span>
        {messageStatus && user && (
          <Image 
          src={statusIcon}
            width={500}
            height={500}
            alt={messageStatus}
            priority
            className={`w-2.5 aspect-square ${messageStatus === "read" && "w-3.5"}`}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default ChatBubble
