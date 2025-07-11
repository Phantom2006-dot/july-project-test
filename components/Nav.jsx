"use client";
import React, { useState } from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { HiChevronDown, HiOutlineMenu } from "react-icons/hi";
import { PiChats, PiChatsLight } from "react-icons/pi";
import { MdPhoneAndroid } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import Image from "next/image";
import { shop } from "@/constants/images";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { startAuth, setStartAuth, device } = useGlobalContext();
    const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const categories = [
    { title: "popular", route: "/#popular" },
    { title: "for you", route: "/#for-you" },
    { title: "fashion", route: "/#for-you" },
    { title: "phones & tablets", route: "/#for-you" },
    { title: "health & beauty", route: "/#for-you" },
    { title: "food & groceries", route: "/#for-you" },
    { title: "electronics", route: "/#for-you" },
    { title: "computers", route: "/#for-you" },
    { title: "baby products", route: "/#for-you" },
    { title: "arts & crafts", route: "/#for-you" },
    { title: "sports & outdoors", route: "/#for-you" },
    { title: "games", route: "/#for-you" },
    { title: "tools", route: "/#for-you" },
  ];

  const RenderCatg = ({ items }) => {
    let visibleCount = items.length; // default: phone shows all

    const [dropDown, setDropDown] = useState("");

    if (device === "tablet") visibleCount = 5;
    else if (device === "desktop") visibleCount = 9;

    const visibleItems = items.slice(0, visibleCount);
    const remainingItems = items.slice(visibleCount);

    const finalItems = [...visibleItems];

    if (remainingItems.length > 0) {
      finalItems.push({
        title: "more",
        route: "/#gruu",
        subcategories: remainingItems, // group remaining under this
      });
    }

    return (
      <div className="flex w-full items-center space-x-7 mt-5 overflow-visible whitespace-nowrap scrollbar-hiide scroll-smooth">
        {finalItems &&
          finalItems.map((catg, i) => {
            const { subcategories } = catg;
            return (
              <div
                key={i}
                onClick={() => {
                  if (dropDown !== catg?.title) {
                    setDropDown(catg?.title);
                    console.log(catg);
                  } else {
                    setDropDown("");
                  }
                }}
                className="relative cursor-pointer group"
              >
                <div className="capitalize text-nowrap hover:text-[#ffa70f] transform-fill transition-all font-medium text-gray-600">
                  {catg?.title}
                </div>

                {dropDown === catg?.title && subcategories && (
                  <div
                    className={`z-[1000] absolute top-full mt-2 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg transition-all`}
                    style={{
                      left: "0",
                      right: "auto",
                    }}
                    ref={(el) => {
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const overflowsRight = rect.right > window.innerWidth;

                        if (overflowsRight) {
                          el.style.left = "auto";
                          el.style.right = "0";
                        }
                      }
                    }}
                  >
                    {subcategories.map((item, i) => (
                      <div
                        key={i}
                        className="capitalize p-2 text-base rounded-md hover:bg-gray-200 whitespace-nowrap font-medium text-gray-600"
                      >
                        {item?.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <nav
      className={`px-4 w-full border-b sticky -top-[2px] z-30 bg-white border-gray-300 py-3 ${
        device && device === "desktop" && "px-12"
      }`}
    >
      <div className="flex space-x-4 justify-between items-center">
        <div
          className={` flex items-center font-bold w-[10%] space-x-1 ${
            device && device !== "phone"
              ? "text-xl space-x-4 w-[13%]"
              : "text-base"
          }`}
        >
          CPMK
        </div>

        <div className="w-1/2 py-2 rounded-3xl  bg-[#f0f5f7] flex items-center">
          <input
            className={`w-full  px-3 focus-within:outline-0 placeholder-gray-700 ${
              device === "phone" ? "text-[12px]" : "text-base"
            }`}
            placeholder={
              device !== "phone" ? "What do you want to find?" : "Quick search"
            }
            type="text"
            name="search"
            id="search"
          />
          <div className="py-1 cursor-pointer px-4">
            <CiSearch size={24} />
          </div>
        </div>

        <div
          className={`flex items-center space-x-7 justify-end w-1/3 ${
            device === "phone" && "text-[12px] w-1/5"
          }`}
        >
          <div
            onClick={() => setShowAuth(!showAuth)}
            className="flex cursor-pointer relative text-[#ffa70f] items-center"
          >
            <div className="mr-2">
              <FaRegUser size={device !== "phone" ? 18 : 14} />
            </div>

            <div
              className={`flex cursor-pointer text-nowrap items-center space-x-1 ${
                device === "phone" ? "text-[12px]" : "text-base"
              }`}
            >
              <span className="w-fit">Sign in</span>
              <div>
                <HiChevronDown />
              </div>
            </div>

            {showAuth && (
              <div
                className={`z-10 absolute top-full mt-2 p-3 w-fit rounded-lg border border-gray-200 bg-white shadow-lg transition-all`}
                style={{
                  left: "0",
                  right: "auto",
                }}
                ref={(el) => {
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const overflowsRight = rect.right > window.innerWidth;

                    if (overflowsRight) {
                      el.style.left = "auto";
                      el.style.right = "0";
                    }
                  }
                }}
              >
                <CustomButton
                  title={"login"}
                  func={() => setStartAuth(!startAuth)}
                  containerStyles={"text-[12px] text-white"}
                />
              </div>
            )}
          </div>

          {device === "desktop" && (
            <>
              <div onClick={() => router.push(`/inbox`)} className="flex cursor-pointer items-center">
                <PiChatsLight size={24} />
              </div>

              <div onClick={() => router.push(`/eshop`)} className="flex cursor-pointer items-center min-w-6 min-h-6  max-w-6 max-h-6">
                <Image
                  src={shop}
                  className="w-hull object-contain h-full"
                  width={500}
                  height={500}
                  alt="My Shop"
                />
              </div>

              <div className="flex cursor-pointer text-nowrap text-sm font-normal text-white py-1 px-2 items-center rounded-3xl space-x-1.5 bg-[#ffa70f]">
                <span>Get app</span>
                <span>
                  <MdPhoneAndroid size={18} />
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {device && device !== "phone" && <RenderCatg items={categories} />}
    </nav>
  );
};

export default Nav;
