import { LayoutContext } from "@/context/layoutContext";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useContext } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";

interface NavBarProps {
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setIsSideBarOpen }: NavBarProps) => {
  const { currentDashboardPageTitle } = useContext(LayoutContext);
  const { signOut } = useAuthActions();

  return (
    <div className="w-100 d-flex justify-content-between align-items-center dashboard-navbar">
      <div className="fs-3 d-flex gap-2 align-items-center">
        <Icon
          icon="fluent:list-16-filled"
          width="3rem"
          role="button"
          onClick={() => setIsSideBarOpen(true)}
          className="d-md-none d-block"
        />
        {currentDashboardPageTitle}
      </div>

      <div className="">
        <div className="align-items-center gap-3 d-flex">
          {/* <Notifications /> */}
          <div className="desktop-item">
            <div className="dropdown">
              <div>
                <div className="d-flex align-items-center gap-3 click">
                  <Image
                    src={"/avatar.svg"}
                    alt="logo"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  Adelana
                  <Icon icon="mingcute:down-fill" width="20" height="20" />
                </div>
                <div className="dropdown-content">
                  <Link
                    href={"/Dashboard"}
                    className="text-sm text-decoration-none text-black-000 hover-link click"
                  >
                    <p>Dashboard</p>
                  </Link>
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
            {/* <div className="btn btn-md d-md-inline d-none btn-outline py-3 fs-4">
              Adelana
              <Icon className="ms-3_5" icon="bi:arrow-up-right" width="2rem" />
            </div>
            <div className="btn btn-md d-md-inline d-none btn-outline py-3 fs-4">
              Adeyemi
              <Icon className="ms-3_5" icon="bi:arrow-up-right" width="2rem" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
