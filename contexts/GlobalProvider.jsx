"use client";
import Auth from "@/components/Auth";
import MobileBottomNav from "@/components/MobileBottomNav";
import Nav from "@/components/Nav";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Create the context
const GlobalContext = createContext(null);

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myContacts, setMyContacts] = useState(null);
  const [device, setDevice] = useState("");
  const [startAuth, setStartAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [stage, setStage] = useState("1st");
  const validatorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(Array(6).fill(""));

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function getDeviceType() {
      const ua = navigator.userAgent;

      if (
        /Mobi|Android|iPhone|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(ua)
      ) {
        console.log("p");
        return setDevice("phone");
      }

      if (/Tablet|iPad|Nexus 7|Nexus 10|KFAPWI/i.test(ua)) {
        console.log("t");
        return setDevice("tablet");
      }

      console.log("d");
      return setDevice("desktop");
    }

    getDeviceType();
  }, [width]);

  if (!device) return;

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoading,
        device,
        startAuth,
        setStartAuth,
        myContacts,
        setMyContacts,
        loading,
        setLoading,
      }}
    >
      {startAuth && (
        <Auth
          setStage={setStage}
          setStartAuth={setStartAuth}
          startAuth={startAuth}
          stage={stage}
          user={user}
          device={device}
          validatorRef={validatorRef}
          code={code}
          setCode={setCode}
        />
      )}
      <div className="h-[100dvh]">
        {children}
        <MobileBottomNav device={device} />
      </div>
    </GlobalContext.Provider>
  );
};

// Custom hook for consuming the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
