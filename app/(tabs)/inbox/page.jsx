"use client"
import ChatsPage from "@/components/ChatsPage";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import React from "react";

const page = () => {
  const { device, user, myContacts, setMyContacts } = useGlobalContext();

  if (device === "desktop")
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
        Select a chat to start messaging
      </div>
    );

  return (
    <div
      className={`w-full overflow-hidden h-full border-r border-gray-200`}
    >
      <ChatsPage />
    </div>
  );
};

export default page;
