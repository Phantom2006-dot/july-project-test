import React from "react";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import Link from "next/link";

const Login = ({ validatorRef, setStage, device, signInOptions }) => {
  return (
    <>
      <div className={`text-sm text-gray-500 text-center font-medium mt-2`}>
        Type your e-mail or phone number to log in or join the NO.1 Campus
        Marketing Platform!
      </div>

      <FormField
        name="validator"
        inputRef={validatorRef}
        label="Email or Phone Number*"
        containerStyles={"mt-5"}
      />

      <CustomButton
        title={"Continue"}
        func={() => {
          if (validatorRef?.current !== "") setStage("2nd");
        }}
        containerStyles={`w-full py-3 text-white text-center mt-8 font-semibold ${
          device !== "desktop" ? "text-sm" : "text-sm"
        }`}
      />

      <div className={`w-full mt-8 flex px-2 items-center`}>
        <div className="border-t w-full border-gray-300"></div>
        <div className="text-[12px] text-nowrap px-3 text-gray-400 text-semibold">
          or continue with
        </div>
        <div className="border-t w-full border-gray-300"></div>
      </div>

      <div className="w-full flex mt-10 items-center space-x-3">
        {signInOptions.map(({ title, Icon, styles, func }, i) => (
          <div
            key={i}
            onClick={func}
            className={`relative w-full py-2.5 cursor-pointer shadow-lg capitalize flex items-center justify-center rounded-sm ${styles}`}
          >
            <span className={`absolute left-4`}>
              <Icon size={24} />
            </span>
            {title}
          </div>
        ))}
      </div>

      <div className={`w-full text-[10px] text-center text-gray-500 mt-7`}>
        By continuing, you have read and agreed to Campus Market{" "}
        <Link href={"#"} className={`text-[#ffa70f]`}>
          Terms and Conditions
        </Link>{" "}
        {" and "}
        <Link href={"#"} className={`text-[#ffa70f]`}>
          Privacy Policy
        </Link>
        . For futher support, contact our customer service team.
      </div>
    </>
  );
};

export default Login;
