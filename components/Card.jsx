import Image from "next/image";
import React from "react";

const Card = ({ item, type, device }) => {
  return (
    <div
      className={`flex flex-col w-full border-[0.5px] col-span-1  border-gray-400 rounded-xl ${
        type !== "column" && "min-w-[220px]"
      } ${device === "phone" && "max-w-[180px]"}`}
    >
      <div className="flex items-center relative justify-center rounded-t-xl max-w-full">
        <Image
          src={item?.image}
          className="w-full h-full  object-contain rounded-t-xl"
          width={550}
          height={550}
          priority
          alt={item?.title}
        />

        <div className="absolute top-0 rounded-tl-xl left-0 px-2 py-1 text-[12px] font-bold bg-red-700 text-white">
          New
        </div>
      </div>

      <div
        className={`p-2 font-medium ${
          device === "phone" ? "text-[10px]" : "text-[13px]"
        }`}
      >
        <div className={`text-nowrap line-clamp-1 text-ellipsis`}>
          {item?.title}
        </div>
        <div className="text-[12.4px] text-[#ffa70f] font-bold">
          ${item?.price}
        </div>
        <div className="text-[10px]">3.5/5.0</div>
        <div className="text-[10px] mt-2 text-gray-600">{item?.location}</div>
      </div>
    </div>
  );
};

export default Card;
