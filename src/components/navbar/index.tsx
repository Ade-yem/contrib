import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { Icon } from "@iconify/react";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import Link from "next/link";
import Image from "next/image";
import { CustomDropdownToggle } from "../CustomDropdownToggle";

const Navbar = () => {
  // const [user, setUser] = useState(getStorageData(StorageKeys.user));
  // const [showLogin, setShowLogin] = useState(false);

  // const {
  //   setShowModal,
  // }: {
  //   setShowModal: (value: ModalTypes) => void;
  // } = useContext(LayoutContext);

  // const handleShowLogin = () => {
  //   setShowModal("login");
  // };
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

        <div className="navbar-items dark ms-auto">
          {/* <Dropdown className="desktop-item">
            <Dropdown.Toggle
              as={CustomDropdownToggle}
              className="nav-item"
              id="dropdown-toggle no_w_translate"
            >
              Stay Options
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-grey-30">
              <NavDropdown.Item
                as={Link}
                href="/stay-options/weekly"
                className="click"
              >
                Weekly Stays
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/stay-options/monthly"
                className="click"
              >
                Monthly Stays
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/stay-options/corporate"
                className="click"
              >
                Corporate Stays
              </NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="desktop-item">
            <Dropdown.Toggle
              as={CustomDropdownToggle}
              className="nav-item"
              id="dropdown-toggle no_w_translate"
            >
              Sign In
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-grey-30">
              <NavDropdown.Item
                as={Link}
                href="#"
                className="click"
                // onClick={() => handleShowLogin()}
              >
                Sign In
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="#" className="click">
                Sign Up
              </NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <div>
            {/* {!user ? (
          ) : (
            <Dropdown className="desktop-item">
              <Dropdown.Toggle
                as={CustomDropdownToggle}
                className="nav-item"
                id="dropdown-toggle no_w_translate"
              >
                <Icon icon="bx:user-circle" className="me-2 text-sm" />
                {user.firstName}
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-grey-30">
                <NavDropdown.Item
                  as={Link}
                  href="/dashboard/profile"
                  className="click"
                >
                  <Icon icon="bx:user-circle" className="me-3" />
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/my-bookings"
                  className="click"
                >
                  <Icon icon="emojione-monotone:fax-machine" className="me-3" />
                  Bookings
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/hospitality"
                  className="click"
                >
                  <Icon
                    icon="material-symbols:shield-with-house-outline"
                    className="me-3"
                  />
                  Hospitality
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/messages"
                  className="click"
                >
                  <Icon icon="eva:message-square-outline" className="me-3" />
                  Messages
                </NavDropdown.Item>

                <div className="dropdown-item">
                  <Dropdown className="desktop-item">
                    <Dropdown.Toggle
                      as={CustomDropdownToggle}
                      className="nav-item text-black-500 no-toggle"
                      id="dropdown-toggle no_w_translate"
                    >
                      <Icon icon="uil:house-user" className="me-3" />
                      Property Owner
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-grey-30">
                      <NavDropdown.Item
                        as={Link}
                        to="/dashboard/listings"
                        className="click"
                      >
                        <Icon icon="clarity:house-line" className="me-3" />
                        My Property listings
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/dashboard/payout"
                        className="click"
                      >
                        <Icon
                          icon="icon-park-outline:bank-card-one"
                          className="me-3"
                        />
                        Payment & Payouts
                      </NavDropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <NavDropdown.Item as={Link} to="/wishlist" className="click">
                  <Icon icon="el:heart-empty" className="me-3" />
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/support"
                  className="click"
                >
                  <Icon icon="ic:outline-contact-support" className="me-3" />
                  Chat with an agent
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="click text-error"
                  onClick={() => logoutService(true)}
                >
                  <Icon icon="bx:power-off" className="me-3" />
                  Logout
                </NavDropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )} */}
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
