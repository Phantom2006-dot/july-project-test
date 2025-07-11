"use client";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalProvider";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { device, user, isLogged, loading } =
    useGlobalContext();
  const router = useRouter();

  useEffect(() => {
  if (!loading && !user) return router.replace(`/`);
  }, [user]);

  return children;
};

export default ProtectedRoute;
