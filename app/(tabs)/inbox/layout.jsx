"use client";

import ChatsPage from "@/components/ChatsPage";
import { useGlobalContext } from "@/contexts/GlobalProvider";

const ChatLayout = ({ children }) => {
  const { device, user, myContacts, setMyContacts } = useGlobalContext();

  return (
    <div className="h-[100dvh] flex w-full">
      {device === "desktop" && (
        <div
          className={`w-[44dvw] overflow-hidden max-w-[44dvw] h-full border-r border-gray-200`}
        >
          <ChatsPage />
        </div>
      )}
      {children}
    </div>
  );
};

export default ChatLayout;
