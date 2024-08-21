"use client";

import React, { useContext } from "react";
import "./styles.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";

const Navbar = () => {
  // const [user, setUser] = useState(getStorageData(StorageKeys.user));

  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);

  const handleShowLogin = () => {
    setShowModal("login");
    console.log("first");
  };
  // const handleShowLogin = () => {
  //   if (!user) {
  //     setShowLogin(true);
  //   }
  // };

  // const updateUser = () => {
  //   setUser(getStorageData(StorageKeys.user));
  // };

  // useEffect(() => {
  //   window.addEventListener("storage", updateUser);
  //   return () => window.removeEventListener("storage", updateUser);
  // }, []);

  return (
    <nav className="nav-fixed">
      <div className="container navbar d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image
            src={"/JEKAJODAWO-LOGO.svg"}
            alt="logo"
            width={120}
            height={20}
            className="nav-logo"
          />
        </Link>

        <div className="navbar-items ms-auto">
          <div className="dropdown">
            <div>
              <div className="d-flex align-items-center">
                Savings
                <Icon
                  className="ms-3"
                  icon="mingcute:down-fill"
                  width="20"
                  height="20"
                />
              </div>
              <div className="dropdown-content">
                <p className="hover-link">Personal Savings</p>
                <p className="hover-link" role="button">
                  Group Savings
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm">About Us</div>
          <div className="text-sm">Contact Us</div>
          <div className="dropdown">
            <div>
              <div className="d-flex align-items-center ">
                Sign In
                <Icon
                  className="ms-3"
                  icon="mingcute:down-fill"
                  width="20"
                  height="20"
                />
              </div>
              <div className="dropdown-content">
                <p
                  className="hover-link"
                  role="button"
                  onClick={handleShowLogin}
                >
                  Sign In
                </p>
                <p className="hover-link" role="button">
                  Sign Up
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/get-approved"
            className="text-decoration-none desktop-item"
          >
            <button className="btn p-lg-3 btn-primary" type="button">
              <span className="text-base"> Join a Team</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
