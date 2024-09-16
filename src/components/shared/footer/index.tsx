import React from "react";
import "./styles.scss";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Socials = () => {
  return (
    <>
      <div className="d-flex mb-5">
        <a
          href="https://www.facebook.com/profile.php?id=100066902119688&mibextid=ZbWKwL"
          target="_blank"
          className="text-decoration-none text-white"
          rel="noreferrer"
        >
          <Icon
            className="text-2xl me-5 mobile- icon-resize"
            icon="eva:facebook-outline"
          />
        </a>
        <a
          href="https://instagram.com/quickstay.co.uk?igshid=NjIwNzIyMDk2Mg=="
          target="_blank"
          className="text-decoration-none text-white "
          rel="noreferrer"
        >
          <Icon
            className="text-2xl me-5 mobile- icon-resize"
            icon="akar-icons:instagram-fill"
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          className="text-decoration-none text-white "
          rel="noreferrer"
        >
          <Icon
            className="text-2xl me-5 mobile- icon-resize"
            icon="fa6-brands:x-twitter"
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          className="text-decoration-none text-white mb-3"
          rel="noreferrer"
        >
          <Icon className="text-2xl icon-resize" icon="ri:youtube-line" />
        </a>
      </div>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="container">
        <div className="row gy-5_6 mt-2">
          <div className="col-lg-6 col-md-4 col-12 mx-auto ">
            <div className="d-md-block d-flex justify-content-center flex-column align-items-center">
              <Image
                src={"/JEKAJODAWO LOGO-BLACK.svg"}
                alt="logo"
                width={120}
                height={70}
                className="logo-img mb-5"
              />
              <div className="d-md-flex d-none">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="text-decoration-none text-white"
                  rel="noreferrer"
                >
                  <Icon
                    className="text-2xl me-5 mobile- icon-resize"
                    icon="eva:facebook-outline"
                  />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="text-decoration-none text-white "
                  rel="noreferrer"
                >
                  <Icon
                    className="text-2xl me-5 mobile- icon-resize"
                    icon="akar-icons:instagram-fill"
                  />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  className="text-decoration-none text-white "
                  rel="noreferrer"
                >
                  <Icon
                    className="text-2xl me-5 mobile- icon-resize"
                    icon="fa6-brands:x-twitter"
                  />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="text-decoration-none text-white mb-3"
                  rel="noreferrer"
                >
                  <Icon
                    className="text-2xl icon-resize"
                    icon="ri:youtube-line"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mt-md-5_6 mt-1 px-lee-0">
            <div className="d-lg-block d-flex justify-content-center">
              <ul className=" list-unstyled">
                <li className="mb-2 text-lg fw-bold text-white">Pages</li>

                <li className="mb-2">
                  <Link
                    href="/"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/about"
                    className="text-decoration-none text-xsm text-white "
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/contact"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/contact"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Support & Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mx-auto mt-md-5_6 mt-1">
            <div className="d-flex justify-content-center">
              <ul className=" list-unstyled">
                <li className="mb-2 text-lg fw-bold text-white">Company</li>
                <li className="mb-2">
                  <Link
                    href="#"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="#"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="#"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Dispute Resolution
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="#"
                    className="text-decoration-none text-xsm text-white "
                  >
                    Partnership
                  </Link>
                </li>
                <li className="mb-4 gap-4 mt-5 d-md-flex d-none"></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-12 d-md-none d-block mt-5_5">
            <div className="d-flex justify-content-center">
              <div>
                <Socials />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xsm text-center text-white mt-4 mb-md-5_5 mb-7">
          © {new Date().getFullYear()} JEKAJODAWO, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
