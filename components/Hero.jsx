import { banner1 } from "@/constants/images";
import Image from "next/image";
import React from "react";

const Hero = ({ device }) => {
  return (
    <div className=" ">
      <div
        className={`flex items-center relative justify-center w-full rounded-2xl bg-white ${
          device !== "desktop" && "col-span-3"
        }`}
      >
        <Image
          src={banner1}
          className="w-full max-h-[55dvh] object-fill rounded-2xl"
          width={1000}
          height={1000}
          priority
          alt={"banner1"}
        />
      </div>
    </div>
  );
};

export default Hero;
