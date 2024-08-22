import { Footer } from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import React, { ReactNode } from "react";

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
