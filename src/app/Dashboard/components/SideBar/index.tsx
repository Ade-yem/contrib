import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
// import CustomLink from "./CustomLink";
import Image from "next/image";
import "./styles.scss";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="dashboard-sidebar bg-white">
      <div className="d-flex align-items-end my-5 px-4_5">
        <Link href="/home">
          <Image
            src={"/JEKAJODAWO-LOGO.svg"}
            alt="logo"
            width={120}
            height={20}
            className="nav-logo"
          />
        </Link>
      </div>
      <hr className="divider" />
      <div className="py-3 px-5">
        {/* <CustomLink name="Dashboard" icon="radix-icons:dashboard" path="" /> */}
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="streamline:dashboard-3-solid"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          <span>Dashboard</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="py-3 px-5">
        {/* <CustomLink name="Profile" icon="solar:user-outline" path="/profile" /> */}
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="iconamoon:profile-fill"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          <span>Profile</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="py-3 px-5">
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="fluent:people-team-24-filled"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          {/* <Icon
            icon="fluent:people-audience-24-filled"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          /> */}
          <span>Groups</span>
        </div>
      </div>
      <hr className="divider" />
      {/* <CustomLink name="Message" icon="iconoir:mail" path="/messages" /> */}
      <div className="py-3 px-5">
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="jam:messages-f"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          <span>Message</span>
        </div>
      </div>
      <hr className="divider" />
      {/* <CustomLink
        name="Subscriptions"
        icon="uil:refresh"
        path="/subscriptions"
      /> */}
      <div className="py-3 px-5">
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="material-symbols:reminder"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          <span>Reminder</span>
        </div>
      </div>

      <hr className="divider" />
      <div className="py-3 px-5">
        <div className="d-flex align-items-center gap-3">
          <Icon
            icon="clarity:calendar-solid"
            width="1.5rem"
            height="1.5rem"
            style={{ color: "black" }}
          />
          <span>Calendar</span>
        </div>
      </div>

      <hr className="divider" />
      <div className="py-3 px-5">
        <div
          className="d-flex align-items-center click gap-3"
          role="button"
          // onClick={() => logoutService(true)}
        >
          <div className="bg-primary-40 rounded-5 text-white">
            <Icon
              icon="solar:logout-2-outline"
              className="icons"
              color="red"
              rotate={2}
            />
          </div>

          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
