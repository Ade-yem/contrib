"use client";

import { ModalTypes } from "@/services/_schema";
import { useQuery } from "convex/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
export const LayoutContext = createContext<any>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const user = useQuery(api.user.getUser);
  const [showModal, setShowModal] = useState<ModalTypes>();
  const [countdown, setCountdown] = useState<null | number>(null);
  const [registerCountdown, setRegisterCountdown] = useState<null | number>(
    null
  );
  const [timer, setTimer] = useState<any>(null);
  const [registertimer, setRegisterTimer] = useState<any>(null);

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
  const triggerRegisterCountdown = () => {
    clearTimeout(registertimer);
    const newTimer = setTimeout(() => {
      setRegisterCountdown((prevCountdown) => {
        if (prevCountdown === null) {
          return 5;
        } else {
          if (prevCountdown === 1) setShowModal(null);
          return prevCountdown - 1;
        }
      });
    }, 1000);
    setRegisterTimer(newTimer);
  };

  useEffect(() => {
    showModal === "success" ? triggerCountdown() : setCountdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, countdown]);

  useEffect(() => {
    showModal === "registerSuccess"
      ? triggerRegisterCountdown()
      : setRegisterCountdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, registerCountdown]);

  return (
    <LayoutContext.Provider
      value={{
        showModal,
        setShowModal,
        countdown,
        setCountdown,
        registerCountdown,
        setRegisterCountdown,
        user,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
