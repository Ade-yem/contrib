import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { usePathname, useRouter } from "next/navigation";
import "./styles.scss";

const SideBar = () => {
  const { signOut } = useAuthActions();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="dashboard-sidebar bg-white">
      <div className="d-flex align-items-end my-5 px-4_5">
        <Link href="/">
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
        <Link
          href="/dashboard"
          className={`text-decoration-none click ${
            isActive("/dashboard") ? "text-primary-500" : "text-black-000"
          }`}
        >
          <div className="d-flex align-items-center gap-3">
            <Icon
              icon="streamline:dashboard-3-solid"
              width="1.5rem"
              height="1.5rem"
              style={{ color: isActive("/dashboard") ? "blue" : "black" }}
            />
            <span>Dashboard</span>
          </div>
        </Link>
      </div>
      <hr className="divider" />

      <div className="py-3 px-5">
        <Link
          href="/dashboard/profile"
          className={`text-decoration-none click ${
            isActive("/dashboard/profile")
              ? "text-primary-500"
              : "text-black-000"
          }`}
        >
          <div className="d-flex align-items-center gap-3">
            <Icon
              icon="iconamoon:profile-fill"
              width="1.5rem"
              height="1.5rem"
            />
            <span>Profile</span>
          </div>
        </Link>
      </div>
      <hr className="divider" />

      <div className="py-3 px-5">
        <Link
          href="/dashboard/groups"
          className={`text-decoration-none click ${
            isActive("/dashboard/groups")
              ? "text-primary-500"
              : "text-black-000"
          }`}
        >
          <div className="d-flex align-items-center gap-3">
            <Icon
              icon="fluent:people-team-24-filled"
              width="1.5rem"
              height="1.5rem"
              style={{
                color: isActive("/dashboard/groups") ? "blue" : "black",
              }}
            />
            <span>Groups</span>
          </div>
        </Link>
      </div>
      <hr className="divider" />

      <div className="py-3 px-5">
        <Link
          href="/dashboard/linked-accounts"
          className={`text-decoration-none click ${
            isActive("/dashboard/linked-accounts")
              ? "text-primary-500"
              : "text-black-000"
          }`}
        >
          <div className="d-flex align-items-center gap-3">
            <Icon
              icon="material-symbols:reminder"
              width="1.5rem"
              height="1.5rem"
              style={{
                color: isActive("/dashboard/linked-accounts")
                  ? "blue"
                  : "black",
              }}
            />
            <span>Linked Accounts</span>
          </div>
        </Link>
      </div>

      <hr className="divider" />
      <div className="py-3 px-5">
        <div
          className="d-flex align-items-center click gap-3"
          role="button"
          onClick={handleSignOut}
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
