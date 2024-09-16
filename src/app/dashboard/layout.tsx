"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CustomOverlay from "./components/Overlay";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import "./styles.scss";
import { Authenticated } from "convex/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    setIsSideBarOpen(false);
  }, []);

  return (
    <Authenticated>
      <div className="dashboard-layout-wrapper position-relative">
        <CustomOverlay
          className="position-fixed d-md-none"
          isActive={isSideBarOpen}
        />
        <div
          className={`position-fixed d-md-inline slide-in-left transition-all sidebar-container ${
            isSideBarOpen ? "mobile-active" : "mobile-hidden"
          }`}
        >
          <div className="position-relative">
            <SideBar />
            {isSideBarOpen && (
              <div
                className="position-absolute bg-white rounded-circle p-3 d-md-none"
                style={{ top: "45%", right: 0, marginRight: "-60px" }}
                role="button"
                onClick={() => setIsSideBarOpen(false)}
              >
                <Icon icon="lucide:chevron-left" width="3rem" />
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-padding dashboard-layout-wrapper-content container-fluid mx-auto">
          <div className="d-flex flex-column gap-5 px-4 px-md-5 py-4_5 h-100">
            <div>
              <NavBar setIsSideBarOpen={setIsSideBarOpen} />
            </div>

            <div className="container-fluid px-0">{children}</div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
