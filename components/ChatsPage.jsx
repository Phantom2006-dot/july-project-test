"use client";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useRouter } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";
import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { userImage } from "@/constants/images";
import Image from "next/image";
import { chatServer } from "@/constants/server";
import { getAllRooms, getUserById } from "@/utils/userActions";

const ChatsPage = () => {
  const { device, user, myContacts, setMyContacts } = useGlobalContext();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [unreadRooms, setUnreadRooms] = useState([]);
  const [allUserDetails, setAllUserDetails] = useState({});
  const [unreadCounts, setUnreadCounts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [chatAcct, setChatAcct] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [focusField, setFocusField] = useState("");
  const emailRef = useRef(null);

  let testString = ``;

  testString =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, voluptatibus!";

  const labels = [
    {
      title: "all",
      func: () => {},
    },
    {
      title: "unread",
      func: () => {},
    },
    {
      title: "favorites",
      func: () => {},
    },
  ];

  const getSender = (room) => {
    const roomId = room["roomId"];

    if (!roomId || !roomId.includes("_")) return null;

    const [code1, code2] = roomId.split("_");

    // Return the one that is not the current user's code
    if (code1 === user?.code) return code2;
    return code1;
  };

  // Fetch chat account
  const fetchChatAcct = async () => {
    const authUrl = `${chatServer}/api/chat/get/${user?.code}`;

    try {
      const response = await fetch(authUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      const res = await response.json();

      // Check if the request was successful (response.ok)
      if (!response.ok) {
        throw new Error(res.error || "Failed to fetch chat account");
      }

      setChatAcct(res);

      const { contacts } = res;

      if (contacts) {
        const userPromises = contacts.map((id) => getUserById(id));
        const users = await Promise.all(userPromises);
        const userMap = users.map((item) => {
          const id = item?.code;
          return item;
        });

        setMyContacts(userMap);
      }
    } catch (error) {
      console.error("Error getting chat account:", error.message);
      throw error;
    }
  };

  // Fetch rooms with latest message and sort them by timestamp (latest first)
  const fetchRooms = async () => {
    setRefreshing(true);
    try {
      const response = await getAllRooms(user?.code);

      const userIds = response.map((room) => {
        if (room.type === "single") return getSender(room);
      });

      const uniqueUserIds = [...new Set(userIds)];

      const userPromises = uniqueUserIds.map((id) => getUserById(id));

      const users = await Promise.all(userPromises);

      const userMap = {};
      users.forEach((item) => {
        userMap[item?.code] = item;
      });
      setAllUserDetails(userMap);

      setData(response);
      fetchUnReadRooms();
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch unread rooms
  const fetchUnReadRooms = async () => {
    try {
      const response = await fetch(
        `${chatServer}/api/chat/unread/${user?.code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }
      );

      const res = await response.json();

      setUnreadCounts(res);
    } catch (error) {
      console.error("Error unread chat rooms:", error);
    }
  };

  const getUnreadRooms = () => {
    const newData = data.filter(
      (room) =>
        !((room.latestMessage && room?.latestMessage.readBy) || []).includes(
          user?.code
        ) &&
        room.latestMessage &&
        room?.latestMessage.sender !== user?.code
    );
    setUnreadRooms(newData);
  };

  const Header = () => {
    return (
      <div className="w-full p-3">
        <div className="w-full flex justify-between items-center">
          <div className={`font-semibold text-2xl`}>Chats</div>

          <div>
            <LuMessageSquarePlus size={27} color="#ff5511f0" />
          </div>
        </div>

        <div className="w-full mt-4 py-2 rounded-3xl  bg-[#f0f5f7] flex items-center">
          <input
            className={`w-full  px-3 focus-within:outline-0 pklaceholder-gray-300 ${
              device === "phone" ? "text-[12px]" : "text-base"
            }`}
            placeholder={"Search or start a new conversation"}
            type="text"
            name="search"
            id="search"
          />
          <div className="py-1 cursor-pointer px-4">
            <CiSearch size={24} />
          </div>
        </div>

        <div className={`mt-1.5 flex items-center space-x-3 overflow-auto`}>
          {labels?.map((label, i) => (
            <div
              key={i}
              onClick={() => setFilterBy(label?.title)}
              className={`border text-gray-600 text-nowrap px-3 py-1 rounded-[20px] text-sm capitalize cursor-pointer ${
                label?.title === filterBy
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              {label?.title}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RenderRooms = ({ item }) => {
    // const { latestMessage, roomDetails } = item;

    // const sender = allUserDetails[getSender(item)];
    // const isFavorite = favorites.includes(item.roomId);
    return (
      <div className={`w-full h-full flex flex-col mt-2 p-3 scrollbar-hiide`}>
        <div
          onClick={() => router.push(`/inbox/rrer`)}
          className={`w-full hover:bg-gray-100 p-2 rounded-lg flex cursor-pointer items-center`}
        >
          <div
            className={`flex items-center justify-center aspect-square bg-gray-200 max-w-[16.5%] min-w-[16.5%] rounded-full`}
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

          <div className={`w-[85%] pl-3 flex text-[12px] gap-1 flex-col`}>
            <div
              className={`w-full flex items-center justify-between text-[10px]`}
            >
              <div
                className={`w-3/4 max-w-3/4 capitalize text-nowrap text-sm overflow-hidden text-ellipsis ${
                  !testString?.trim() ? "bg-gray-200 rounded-2xl p-1" : ""
                }`}
              >
                {testString}
              </div>

              <div className={`w-[21%] capitalize text-end text-gray-700`}>
                wednesday
              </div>
            </div>

            <div className={`w-full flex items-center justify-between`}>
              <div
                className={`w-[87%] max-w-[87%] text-nowrap text-[12px] overflow-hidden text-ellipsis ${
                  !testString?.trim() ? "bg-gray-200 rounded-2xl p-1" : ""
                }`}
              >
                {testString}
              </div>

              <div
                className={`w-fit min-w-1/10 flex justify-end text-base text-gray-600`}
              >
                {testString ? (
                  <MdFavorite color="#ff5511f0" />
                ) : (
                  <MdFavoriteBorder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RenderUnreadCount = ({ id }) => {
    if (!unreadCounts) return;
    const room = unreadCounts.find((item) => item?.roomId === id);

    if (!room) return <></>;
    if (room?.unreadCount < 1) return <></>;
    return (
      <div className="bg-yellow justify-center items-center rounded-full px-2">
        <div className="text-[10px] text-[#fff] font-pbold">
          {room?.unreadCount}
        </div>
      </div>
    );
  };

  const filteredData =
    filterBy === "all"
      ? data
      : filterBy === "unread"
      ? unreadRooms
      : data.filter((room) => favorites.includes(room?.roomId));

  return (
    <>
      <Header />
      <RenderRooms />
    </>
  );
};

export default ChatsPage;
