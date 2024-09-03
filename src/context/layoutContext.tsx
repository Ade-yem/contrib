"use client";

import { ModalTypes } from "@/services/_schema";
import { createContext, ReactNode, useEffect, useState } from "react";
export const LayoutContext = createContext<any>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<ModalTypes>();
  const [currentDashboardPageTitle, setCurrentDashboardPageTitle] =
    useState("Dashboard");
  const [countdown, setCountdown] = useState<null | number>(null);
  const [timer, setTimer] = useState<any>(null);

  const triggerCountdown = () => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === null) {
          return 5;
        } else {
          if (prevCountdown === 1) setShowModal(null);
          return prevCountdown - 1;
        }
      });
    }, 1000);
    setTimer(newTimer);
  };

  useEffect(() => {
    showModal === "success" ? triggerCountdown() : setCountdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, countdown]);

  return (
    <LayoutContext.Provider
      value={{
        showModal,
        setShowModal,
        currentDashboardPageTitle,
        setCurrentDashboardPageTitle,
        countdown,
        setCountdown,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
