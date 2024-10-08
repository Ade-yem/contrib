import { LayoutContext } from "@/context/layoutContext";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { ModalTypes } from "@/services/_schema";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import "./styles.scss";

interface NavBarProps {
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setIsSideBarOpen }: NavBarProps) => {
  const { setShowModal }: { setShowModal: (value: ModalTypes) => void } =
    useContext(LayoutContext);
  const user = useQuery(api.user.getUser);
  const { signOut } = useAuthActions();
  const router = useRouter();
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/profile": "Profile",
    "/dashboard/groups": "My Groups",
    "/dashboard/linked-accounts": "Linked Accounts",
  };

  const currentDashboardPageTitle = pageTitles[pathname] || "Dashboard";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

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
        <p className="text-2xl fw-semibold mb-0">{currentDashboardPageTitle}</p>
      </div>

      <div className="">
        <div className="align-items-center gap-4 d-flex">
          <div
            className="btn btn-md d-sm-inline d-none border border-black-000 py-3 fs-4"
            onClick={() => setShowModal("createGroup")}
            role="button"
          >
            Create New Group
            <Icon className="ms-3_5" icon="bi:arrow-up-right" width="2rem" />
          </div>

          <div className="dropdown">
            <div>
              <div className="d-flex align-items-center gap-3 click">
                <Image
                  src={user?.image || "/avatar.svg"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                {user?.first_name ?? "Anonymous"}
                <Icon icon="mingcute:down-fill" width="20" height="20" />
              </div>
              <div className="dropdown-content">
                <Link
                  href={"/"}
                  className="text-sm text-decoration-none text-black-000 hover-link click"
                >
                  <p>Home</p>
                </Link>
                <Link
                  href={"/dashboard"}
                  className="text-sm text-decoration-none text-black-000 hover-link click"
                >
                  <p>Dashboard</p>
                </Link>
                <div
                  className=" click hover-link sign-out"
                  role="button"
                  onClick={handleSignOut}
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
