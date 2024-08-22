"use client";

import React, { useContext, useState } from "react";
import "./styles.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";

const Navbar = () => {
  // const [user, setUser] = useState(getStorageData(StorageKeys.user));
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
    <>
      <nav className="nav-fixed">
        <div className="container navbar d-flex justify-content-between align-items-center">
          <Link href="/home">
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
                <div className="d-flex align-items-center click">
                  Savings
                  <Icon
                    className="ms-3"
                    icon="mingcute:down-fill"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="dropdown-content">
                  <Link
                    href={"/home/personal-savings"}
                    className="text-sm text-decoration-none text-black-000 hover-link click"
                  >
                    <p>Personal Savings</p>
                  </Link>
                  <Link
                    href={"/home/group-savings"}
                    className="text-sm text-decoration-none text-black-000 hover-link click"
                  >
                    <p>Group Savings</p>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href={"/home/about"}
              className="text-sm text-decoration-none text-black-000"
            >
              About Us
            </Link>
            <Link
              href={"/home/contact"}
              className="text-sm text-decoration-none text-black-000"
            >
              Contact Us
            </Link>
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
              href="/group-savings"
              className="text-decoration-none desktop-item"
            >
              <button className="btn p-lg-3 btn-primary" type="button">
                <span className="text-base"> Join a Team</span>
              </button>
            </Link>
          </div>
          <div className="mobile-menu">
            <Icon
              icon="quill:hamburger-sidebar"
              width="3rem"
              height="3rem"
              onClick={() => setIsSideBarOpen(true)}
            />
          </div>
        </div>
      </nav>
      {/* {isSideBarOpen && (
        // <Sidebar closeSidebar={() => setIsSideBarOpen(false)} />
      )} */}
    </>
  );
};

export default Navbar;

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(-2);

  const accordionList = [
    {
      title: " How does group savings works?",
      answer: "Personal Savings",
      answer2: "Personal Savings",
    },
    {
      title: " How does group savings works?",
      answer: "Personal Savings",
      answer2: "Personal Savings",
    },
  ];
  const handleToggle = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <div className="sidebar bg-primary-300">
      <div className="bg-pink">
        <div className="container d-flex justify-content-between align-items-center py-4">
          <div>
            <Icon
              icon="quill:hamburger-sidebar"
              width="3rem"
              height="3rem"
              onClick={closeSidebar}
            />
          </div>
          <Link
            href="/group-savings"
            className="text-decoration-none desktop-item"
          >
            <button className="btn p-lg-3 btn-primary" type="button">
              <span className="text-base"> Join a Team</span>
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="container">
        {accordionList.map((item, index) => (
          <div key={index}>
            <div className="bg-white-000 d-flex align-items-center justify-content-between p-4_5 px-sm-5_6 px-4 rounded-10 mt-4">
              <h2 className="text-xl fw-bold mb-0">{item.title}</h2>
              <Icon
                icon={
                  openAccordion === index
                    ? "simple-line-icons:minus"
                    : "simple-line-icons:plus"
                }
                width="3rem"
                height="3rem"
                className="text-black-00"
                role="button"
                onClick={() => handleToggle(index)}
              />
            </div>
            {openAccordion === index && (
              <div className="bg-white-000 mt-4 p-4_5 px-5_6 rounded-10">
                <p className="text-sm fw-small lh-lg mb-0">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
