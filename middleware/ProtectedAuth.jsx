"use client"
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedAuth = ({ children }) => {
  const { device, user, isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) return router.replace(`/`);
  }, [user]);

  return children;
};

export default ProtectedAuth;
