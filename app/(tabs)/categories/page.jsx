"use client";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  campusRider,
  books,
  fashion,
  restuarant,
  beauty,
  phonesAndTablets,
  foodAndGroceries,
} from "@/constants/images";
import Image from "next/image";

const categoriesPage = () => {
  const { startAuth, setStartAuth, device } = useGlobalContext();
  const router = useRouter();

  const services = [
    {
      title: "Campus Rider",
      image: campusRider,
    },
    {
      title: "Restuarants",
      image: restuarant,
    },
    {
      title: "Fashion",
      image: fashion,
    },
    {
      title: "Books & Stationary",
      image: books,
    },
    {
      title: "Beauty & Cosmetics",
      image: beauty,
    },
    {
      title: "Phone & Tablets",
      image: phonesAndTablets,
    },
    {
      title: "Food & Groceries",
      image: foodAndGroceries,
    },
  ];

  return (
    <div className={`relative h-full overflow-auto`}>
      <nav
        className={`flex items-center sticky z-30 top-0 justify-center px-3 py-3 space-x-2 w-full border-b bg-white border-gray-300`}
      >
        <div className="flex bg-[#f0f5f7] rounded-full aspect-square items-center justify-center text-center w-1/10">
          o
        </div>

        <div className="w-full py-2 rounded-3xl  bg-[#f0f5f7] flex items-center">
          <input
            className={`w-full  px-3 focus-within:outline-0 placeholder-gray-700 ${
              device === "phone" ? "text-[12px]" : "text-base"
            }`}
            placeholder={"Explore categories"}
            type="text"
            name="search"
            id="search"
          />
          <div className="py-1 cursor-pointer px-4">
            <CiSearch size={24} />
          </div>
        </div>
      </nav>

      <div
        className={`w-full h-full overflow-auto flex flex-col gap-5 px-3 bg-gray-100 py-7 ${
          device === "desktop" && "px-20 py-10"
        }`}
      >
        <div>All Categories</div>
        <div className={`w-full grid grid-cols-2 ${
                device === "desktop" ? "gap-y-6 gap-x-24" : "gap-y-3 gap-x-3"
              }`}>
          {services.map((item, i) => (
            <div key={i} className={`w-full flex items-center space-x-2 bg-white p-2 py-3 rounded-lg`}>
              <div className={`flex items-center justify-center aspect-square overflow-hidden bg-gray-100 w-1/3 rounded-full`}>
                <Image
                  src={item?.image}
                  alt="Campus Rider"
                  width={200}
                  className={`w-2/3 object-contain`}
                />
              </div>
              <div className={`font-medium w-full text-start text-nowrap text-sm text-gray-500 ${
                  device === "phone" ? "text-[12px]" : "text-sm"
                }`}>{item?.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default categoriesPage;
