import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { SideBarLink } from "../interfaces";

interface CustomLinkProps extends SideBarLink {
  className?: string;
}

const CustomLink = ({ className, name, icon, path }: CustomLinkProps) => {
  const { pathname } = useLocation();
  const linkPath = `/dashboard${path}`;

  const isActiveLink =
    linkPath !== "/dashboard" && linkPath !== "/dashboard/listings"
      ? pathname.includes(linkPath)
      : linkPath === pathname;

  return (
    <div className={`py-2 px-4_5 ${className}`}>
      <Link
        to={linkPath}
        role="button"
        className={`text-decoration-none transition-all d-flex align-items-center gap-3 w-100 role-button p-3 px-3_5 rounded-4 dashboard-sidebar__link ${
          isActiveLink ? "active-link" : "inactive-link"
        }`}
      >
        <Icon icon={icon} className="icons" />

        <span>{name}</span>
      </Link>
    </div>
  );
};

export default CustomLink;
