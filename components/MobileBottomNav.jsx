"use client";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { TbCopyPlus } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { PiChats } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { shop, shopYellow } from "@/constants/images";

const MobileBottomNav = ({ device, user }) => {
  const router = useRouter();
  const [paid, setPaid] = useState(true);
  const pathName = usePathname();
  const routes = [
    {
      title: "home",
      route: "/",
      icon: IoHome,
    },
    {
      title: "categories",
      route: "/categories",
      icon: BiCategoryAlt,
    },
    {
      title: "sell",
      route: "/sell",
      icon: TbCopyPlus,
    },
    {
      title: "inbox",
      route: "/inbox",
      icon: PiChats,
    },
    {
      title: paid ? "eshop" : "profile",
      route: paid ? "/eshop" : "/profile",
      icon: FaRegUser,
    },
  ];
  const noTabs = ["/inbox/"]
  const showTabs = noTabs.find(item => pathName.includes(item)) || null;

  if (device !== "phone") return <></>;

  if (showTabs) return <></>;
  return (
    <div className="fixed bottom-0 inset-x-0 flex flex-col items-end justify-end">
      <div className="w-full h-[10dvh] bg-white flex items-center border-t border-gray-300">
        {routes.map((route, i) => {
          
          return (
          <div
            key={i}
            onClick={() => router.push(route?.route || "#")}
            className={`flex flex-col cursor-pointer items-center gap-1 justify-center w-full ${
              pathName === route?.route
                ? "text-[#ffa70f] font-medium text-sm"
                : "text-gray-600 font-normal text-[12.5px]"
            }`}
          >
            {route?.title === "eshop" ? (
              <div className="flex cursor-pointer items-center min-w-5 min-h-5  max-w-5 max-h-5">
                <Image
                  src={pathName === route?.route ? shopYellow : shop}
                  className="w-hull object-contain h-full"
                  width={500}
                  height={500}
                  alt="My Shop"
                />
              </div>
            ) : (
              <route.icon size={pathName === route?.route ? 21 : 19} />
            )}
            <span className={`capitalize`}>{route?.title}</span>
          </div>
        )})}
      </div>
    </div>
  );
};

export default MobileBottomNav;
