import ProtectedRoute from "@/middleware/ProtectedRoute";
import React from "react";

const TabsLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="h-[100dvh] flex w-full">
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default TabsLayout;
