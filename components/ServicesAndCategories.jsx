import {
  campusRider,
  books,
  fashion,
  restuarant,
  beauty,
  phone,
  phonesAndTablets,
  foodAndGroceries,
} from "@/constants/images";
import Image from "next/image";
import React from "react";

const ServicesAndCategories = ({ device }) => {
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
    <div className={`w-full mt-5 bg-white shadow-sm rounded-lg py-4`}>
      <div className="font-semibold text-md py-1 px-5">
        Services and Categories
        <div className={`font-normal text-sm text-gray-500`}>Explore</div>
      </div>
      <div className={`w-full mt-2 px-6 py-4 flex flex-col gap-6`}>
        {/* <div className="w-full flex items-center justify-between">
          {services.slice(0, device === "desktop" ? 5 : 4).map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center cursor-pointer ${
                device === "desktop" ? "w-[13%]" : "w-[18%]"
              }`}
            >
              <div
                className={`w-full  flex items-center justify-center aspect-square overflow-hidden bg-gray-100 rounded-full ${
                  device === "desktop" ? "p-" : "p-"
                }`}
              >
                <Image
                  src={item?.image}
                  alt="Campus Rider"
                  width={200}
                  className={`w-2/3 object-contain`}
                />
              </div>
              <div
                className={`font-medium text-nowrap mt-2 text-gray-500 ${
                  device === "phone" ? "text-[9px]" : "text-[13px]"
                }`}
              >
                {item?.title}
              </div>
            </div>
          ))}
        </div> */}

        <div className={`w-full grid grid-rows-2 ${
                device === "desktop" ? "grid-cols-5 gap-y-6 gap-x-24" : "grid-cols-4 gap-y-3 gap-x-6"
              }`}>
          {services.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col w-full col-span-1 items-center cursor-pointer`}
            >
              <div
                className={`w-full flex items-center justify-center aspect-square overflow-hidden bg-gray-100 rounded-full ${
                  device === "desktop" ? "p-" : "p-"
                }`}
              >
                <Image
                  src={item?.image}
                  alt="Campus Rider"
                  width={200}
                  className={`w-2/3 object-contain`}
                />
              </div>
              <div
                className={`font-medium w-fit text-nowrap mt-2 text-gray-500 ${
                  device === "phone" ? "text-[8px]" : "text-[13px]"
                }`}
              >
                {item?.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesAndCategories;
