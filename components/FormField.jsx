// FormField.js
import React, { useState, useEffect, useRef } from "react";

const FormField = React.memo(
  ({
    label,
    inputRef,
    onBlurCallback,
    type = "text",
    name,
    containerStyles,
  }) => {
    const [hasText, setHasText] = useState(false);
    const handleInput = () => {
      const value = inputRef.current?.value || "";
      setHasText(value.trim().length > 0);
    };
    return (
      <div
        className={`relative w-full flex items-center pt-5 ${containerStyles}`}
      >
        <input
          id={name}
          name={name}
          type={type}
          onClick={() => {
            console.log("====================================");
            console.log(`${inputRef.current?.value}`);
            console.log("====================================");
          }}
          ref={inputRef}
          onInput={handleInput}
          placeholder=" "
          className={`
          peer w-full border focus:border-2 py-3 text-sm border-gray-400 rounded-md px-3 focus:outline-none focus:border-[#ffa70f]
        `}
        />
        <label
          htmlFor={name}
          className={`
          absolute left-3  text-gray-500 text-sm transition-all duration-200 
     peer-placeholder-shown:py-3
     peer-placeholder-shown:text-sm 
     peer-placeholder-shown:text-gruay-400 
     ${
       hasText ? "top-3 bg-white text-[12px] px-3 py-0 z-50 text-[#ffa70f]" : ""
     }
     peer-focus:top-3 
     peer-focus:text-[12px] 
     peer-focus:bg-white
     peer-focus:px-3
     peer-focus:py-0
     peer-focus:z-50
     peer-focus:text-[#ffa70f]
        `}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default FormField;
