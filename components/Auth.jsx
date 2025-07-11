import React from "react";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import Link from "next/link";
import VerifyAccount from "./VerifyAccount";
import Login from "./Login";

const Auth = ({
  startAuth,
  setStartAuth,
  user,
  device,
  stage,
  setStage,
  validatorRef,
  code,
  setCode,
}) => {
  // const { startAuth, setStartAuth, user, device } = useGlobalContext();
  // const [stage, setStage] = useState("1st");
  const signInOptions = [
    {
      title: "facebook",
      Icon: FaFacebook,
      styles: "text-white bg-blue-500 font-semibold text-sm",
      func: () => {},
    },
    {
      title: "google",
      Icon: FcGoogle,
      styles: "text-gray-500 text-sm font-semibold",
      func: () => {},
    },
    {
      title: "apple",
      Icon: FaApple,
      styles: "bg-black text-white text-sm font-semibold",
      func: () => {},
    },
  ];
  // const validatorRef = useRef(null);

  const StartAuth = () => {
    return (
      <div
        className={`w-1/2 flex flex-col items-center rounded-3xl z-50 bg-white px-10 py-5`}
      >
        <div
          className={`flex w-full items-center justify-end text-2xl font-medium text-gray-600`}
        >
          <div
            onClick={() => setStartAuth(!startAuth)}
            className="px-3 py-1 cursor-pointer"
          >
            <FaTimes />
          </div>
        </div>

        <div className={`uppercase text-2xl font-bold text-gray-800`}>cpmk</div>

        {stage === "1st" && (
          <Login
            setStage={setStage}
            validatorRef={validatorRef}
            signInOptions={signInOptions}
            device={device}
          />
        )}

        {stage === "2nd" && (
          <VerifyAccount
            validaitor={validatorRef.current}
            setStage={setStage}
            device={device}
            code={code}
            setCode={setCode}
          />
        )}
      </div>
    );
  };

  return (
    <div className="absolute z-40 inset-0 flex items-center justify-center">
      <div
        onClick={() => setStartAuth(!startAuth)}
        className={`absolute inset-0 bg-black/40`}
      ></div>
      <StartAuth />
    </div>
  );
};

export default Auth;
