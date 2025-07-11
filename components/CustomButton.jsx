import React from "react";

const CustomButton = ({ func, title, containerStyles}) => {
  return (
    <div
      onClick={func}
      className={`px-12 cursor-pointer capitalize py-2 font-medium bg-[#ffa70f] rounded-md ${containerStyles}`}
    >
      {title}
    </div>
  );
};

export default CustomButton;
