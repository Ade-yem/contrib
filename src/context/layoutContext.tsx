"use client";

import { ModalTypes } from "@/services/_schema";
import { createContext, ReactNode, useEffect, useState } from "react";
export const LayoutContext = createContext<any>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<ModalTypes>();
  const [currentDashboardPageTitle, setCurrentDashboardPageTitle] =
    useState("Dashboard");

  return (
    <LayoutContext.Provider
      value={{
        showModal,
        setShowModal,
        currentDashboardPageTitle,
        setCurrentDashboardPageTitle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
