import React, { useState, useRef } from "react";

const VerifyCodeInput = ({ length = 6, onChange, containerStyles, code, setCode }) => {
  // Refs for each input to focus programmatically
  const inputsRef = useRef([]);

  // Helper to focus input at index
  const focusInput = (index) => {
    if (index >= 0 && index < length) {
      inputsRef.current[index]?.focus();
    }
  };

  const handleChange = (e, idx) => {
    const val = e.target.value;

    // Only allow digits (or empty)
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);
      onChange?.(newCode.join(""));

      // Move focus to next input if digit was entered
      if (val && idx < length - 1) {
        focusInput(idx + 1);
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (code[idx]) {
        // If current box has a digit, clear it
        const newCode = [...code];
        newCode[idx] = "";
        setCode(newCode);
        onChange?.(newCode.join(""));
      } else {
        // Current box empty, move to previous and clear it
        if (idx > 0) {
          focusInput(idx - 1);
          const newCode = [...code];
          newCode[idx - 1] = "";
          setCode(newCode);
          onChange?.(newCode.join(""));
          e.preventDefault(); // prevent default backspace on previous input
        }
      }
    } else if (e.key === "ArrowLeft") {
      // Optional: left arrow to go to previous
      focusInput(idx - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      // Optional: right arrow to go to next
      focusInput(idx + 1);
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, length);
    if (/^\d+$/.test(paste)) {
      const pasteArray = paste.split("");
      const newCode = [...code];
      for (let i = 0; i < length; i++) {
        newCode[i] = pasteArray[i] || "";
      }
      setCode(newCode);
      onChange?.(newCode.join(""));
      // Focus the last filled input
      const lastFilledIndex = pasteArray.length - 1;
      focusInput(lastFilledIndex >= 0 ? lastFilledIndex : 0);
    }
  };

  return (
    <div className={`flex space-x-4 ${containerStyles}`}>
      {code.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[idx] = el)}
          className="w-[50px] h-[45px] px-2 text-center font-semibold text-2xl rounded-lg border border-gray-300 outline-0 focus:border-3 focus:border-[#ffa70f]"
        />
      ))}
    </div>
  );
};

export default VerifyCodeInput;
