import React, { useState } from "react";
import VerifyCodeInput from "./VerifyCodeInput";
import CustomButton from "./CustomButton";

const VerifyAccount = ({ validaitor, setStage, device, code, setCode }) => {
  return (
    <>
      <div className={`text-base mt-1 font-semibold text-gray-800`}>
        Enter verification code
      </div>

      <div className={`text-[13px] text-gray-500 text-center font-medium mt-2`}>
        We've sent a code to{" "}
        <span className="text-black">{validaitor?.value}</span>
      </div>

      <VerifyCodeInput length={6} onChange={setCode} containerStyles={"mt-8"} code={code} setCode={setCode} />

      <div className={`text-[13px] text-gray-500 text-center font-medium mt-6`}>
        Didn't get a code?{" "}
        <span onClick={() => {}} className="text-[#ffa70f]">
          Click to resend.
        </span>
      </div>

      <div className="border-t w-full border-gray-300 mt-4"></div>

      <div className="flex w-full items-center mt-4 justify-between">
        <CustomButton
          title={"Previous"}
          func={() => {
            setStage("1st");
          }}
          containerStyles={`w-[40%] py-3 text-center text-gray-500 bg-white border border-gray-200 font-medium ${
            device !== "desktop" ? "text-sm" : "text-base"
          }`}
          
        />

        <CustomButton
          title={"Verify"}
          func={() => {
            setStage("1st");
          }}
          containerStyles={`w-[40%] py-3 text-white text-center font-medium ${
            device !== "desktop" ? "text-sm" : "text-base"
          }`}
        />
      </div>
    </>
  );
};

export default VerifyAccount;
