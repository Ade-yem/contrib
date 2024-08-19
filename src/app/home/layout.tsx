import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";
// import { Sidebar } from "sharedComponents/sidebar";
// import { Navbar } from "sharedComponents/navbar";
// import "./styles.scss";

// import { Footer } from "sharedComponents/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="layout-wrapper">
      {/* <Sidebar /> */}
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
      <Footer />
    </section>
  );
}
