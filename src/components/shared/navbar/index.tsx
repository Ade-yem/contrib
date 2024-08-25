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
  };
  const handleShowRegister = () => {
    setShowModal("register");
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
                  <p
                    className="hover-link"
                    role="button"
                    onClick={handleShowRegister}
                  >
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
      {isSideBarOpen && (
        <Sidebar
          closeSidebar={() => setIsSideBarOpen(false)}
          openSidebar={isSideBarOpen}
          // handleShowLogin={handleShowLogin}
        />
      )}
    </>
  );
};

export default Navbar;

const Sidebar = ({
  closeSidebar,
  openSidebar,
  // handleShowLogin,
}: {
  closeSidebar: () => void;
  openSidebar: boolean;
  // handleShowLogin: () => void;
}) => {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);

  const handleShowLogin = () => {
    setShowModal("login");
    console.log("first");
  };
  const [openAccordion, setOpenAccordion] = useState<number | null>(-2);

  const accordionList = [
    {
      title: "Sign In",
      link: "Sign In",
      link2: "Sign Up",
    },
    {
      title: "Savings",
      link: "Personal Savings",
      link2: "Group Savings",
    },
  ];
  const handleToggle = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <div className={`sidebar ${openSidebar && "animate-open"}`}>
      <div className="sidebar-content bg-primary-500 pb-7">
        <div className="bg-white-000">
          <div className="container d-flex justify-content-between align-items-center py-4">
            <div>
              <Icon
                icon="mdi:hamburger-open"
                width="3rem"
                height="3rem"
                onClick={closeSidebar}
                rotate={180}
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
        <div className="container mt-5">
          {accordionList.map((item, index) => (
            <div key={index}>
              <div className="border border-white-000 border-top-0 border-start-0 border-end-0">
                <div
                  className=" d-flex align-items-center text-white-000 justify-content-between p-4_5 px-sm-5_6 px-4 my-3"
                  onClick={() => handleToggle(index)}
                >
                  <h2 className="text-xl fw-bold mb-0">{item.title}</h2>
                  <Icon
                    icon={
                      openAccordion === index
                        ? "mingcute:arrows-up-line"
                        : "mingcute:arrows-down-line"
                    }
                    width="3rem"
                    height="3rem"
                    className="text-black-00"
                    role="button"
                  />
                </div>
                {openAccordion === index && (
                  <div className="overlay">
                    <div className="bg-white-000 p-4_5 px-sm-5_6 px-4">
                      {item.link === "Sign In" ? (
                        <p
                          className="text-sm fw-small mb-0"
                          role="button"
                          onClick={() => {
                            handleShowLogin;
                            // closeSidebar;
                          }}
                        >
                          {item.link}
                        </p>
                      ) : (
                        <p className="text-sm fw-small mb-0">
                          <Link
                            href={"/home/personal-savings"}
                            className="text-decoration-none text-black-000"
                            onClick={closeSidebar}
                          >
                            {item.link}
                          </Link>
                        </p>
                      )}
                    </div>
                    <hr className="my-0" />
                    <div className="bg-white-000 p-4_5 px-sm-5_6 px-4">
                      {item.link2 === "Sign Up" ? (
                        <p
                          className="text-sm fw-small mb-0"
                          role="button"
                          onClick={() => {
                            handleShowLogin;
                          }}
                        >
                          {item.link2}
                        </p>
                      ) : (
                        <p className="text-sm fw-small mb-0">
                          <Link
                            href={"/home/group-savings"}
                            className="text-decoration-none text-black-000"
                            onClick={closeSidebar}
                          >
                            {item.link2}
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="border border-white-000 border-top-0 border-start-0 border-end-0">
            {/* <NavLink
              className={({ isActive }) =>
                isActive ? "active border-none" : "border-none"
              }
              to="/home"
              onClick={closeSidebar}
            >
              <div className="for">Careers</div>
            </NavLink> */}
            <div className="text-xl fw-bold p-4_5 px-sm-5_6 px-4 my-3">
              <Link
                href={"/home/about"}
                className="text-decoration-none text-white-000"
                onClick={closeSidebar}
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="border border-white-000 border-top-0 border-start-0 border-end-0">
            <div className="text-xl fw-bold p-4_5 px-sm-5_6 px-4 my-3">
              <Link
                href={"/home/contact"}
                className="text-decoration-none text-white-000"
                onClick={closeSidebar}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
