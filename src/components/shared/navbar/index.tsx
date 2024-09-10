"use client";

import React, { useContext, useState } from "react";
import "./styles.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../../../convex/_generated/api";

const Navbar = () => {
  const { signOut } = useAuthActions();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const user = useQuery(api.user.getUser);

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
            <Unauthenticated>
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
            </Unauthenticated>
            <Authenticated>
              <div className="dropdown">
                <div>
                  <div className="d-flex align-items-center gap-3 click">
                    <Image
                      src={user?.image || "/avatar.svg"}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-circle"
                    />
                    {user?.first_name ?? "Anonymous"}
                    <Icon icon="mingcute:down-fill" width="20" height="20" />
                  </div>
                  <div className="dropdown-content">
                    <Link
                      href={"/dashboard"}
                      className="text-sm text-decoration-none text-black-000 hover-link click"
                    >
                      <p>Dashboard</p>
                    </Link>
                    <Link
                      href={"/home/group-savings"}
                      className="text-sm text-decoration-none text-black-000  click"
                    ></Link>

                    <div
                      className=" click hover-link sign-out"
                      role="button"
                      onClick={signOut}
                    >
                      <p className="d-flex align-items-center gap-2">
                        <Icon
                          icon="solar:logout-2-outline"
                          className="icons"
                          color="red"
                          rotate={2}
                        />
                        Sign Out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Authenticated>
            <Authenticated>
              <button
                className="btn p-lg-3 btn-primary"
                onClick={() => setShowModal("createGroup")}
              >
                <span className="text-base"> Create New Group</span>
              </button>
            </Authenticated>
            <Unauthenticated>
              <button
                className="btn p-lg-3 btn-primary"
                onClick={handleShowLogin}
              >
                <span className="text-base"> Create New Group</span>
              </button>
            </Unauthenticated>
          </div>
          <div className="mobile-menu">
            <div className="d-flex align-items-center border border-black-000 rounded-01 p-2">
              <Icon
                icon="quill:hamburger-sidebar"
                width="3rem"
                height="3rem"
                onClick={() => setIsSideBarOpen(true)}
              />
            </div>
            <Authenticated>
              <div className="dropdown">
                <div>
                  <div className="d-flex align-items-center click border border-black-000 rounded-01 p-2">
                    <Image
                      src={"/avatar.svg"}
                      alt="profile"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="dropdown-content right">
                    <Link
                      href={"/dashboard"}
                      className="text-sm text-decoration-none text-black-000 hover-link click"
                    >
                      <p>Dashboard</p>
                    </Link>
                    <Link
                      href={"/home/group-savings"}
                      className="text-sm text-decoration-none text-black-000  click"
                    ></Link>

                    <div
                      className=" click hover-link sign-out"
                      role="button"
                      onClick={signOut}
                    >
                      <p className="d-flex align-items-center gap-2">
                        <Icon
                          icon="solar:logout-2-outline"
                          className="icons"
                          color="red"
                          rotate={2}
                        />
                        Sign Out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Authenticated>
          </div>
        </div>
      </nav>
      {isSideBarOpen && (
        <Sidebar
          closeSidebar={() => setIsSideBarOpen(false)}
          openSidebar={isSideBarOpen}
        />
      )}
    </>
  );
};

export default Navbar;

const Sidebar = ({
  closeSidebar,
  openSidebar,
}: {
  closeSidebar: () => void;
  openSidebar: boolean;
}) => {
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
  const [openAccordion, setOpenAccordion] = useState<number | null>(-2);

  const accordionList = [
    {
      id: 1,
      title: "Sign In",
      link: "Sign In",
      link2: "Sign Up",
    },
    {
      id: 2,
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
                <span className="text-base"> Join a Group</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="container mt-5">
          {accordionList.map((item, index) => (
            <div key={index}>
              <div>
                {item.id === 1 ? (
                  <Unauthenticated>
                    <div
                      className="border border-white-000 border-top-0 border-start-0 border-end-0 d-flex align-items-center text-white-000 justify-content-between py-5 px-sm-5_6 px-4"
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
                  </Unauthenticated>
                ) : (
                  <div
                    className="border border-white-000 border-top-0 border-start-0 border-end-0 d-flex align-items-center text-white-000 justify-content-between py-5 px-sm-5_6 px-4"
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
                )}

                {openAccordion === index && (
                  <div className="overlay">
                    <div className="bg-white-000 p-4_5 px-sm-5_6 px-4">
                      {item.link === "Sign In" ? (
                        <p
                          className="text-sm fw-small mb-0"
                          role="button"
                          onClick={handleShowLogin}
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
                          onClick={handleShowRegister}
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
