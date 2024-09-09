import React from "react";
import "./styles.scss";
import Link from "next/link";
export const Homebanner = () => {
  return (
    <div className="home-banner text-white-000">
      <h2 className="title text-white-000 mb-4">
        Best Platform for Digital <br className="d-none d-md-block" /> Group
        Savings
      </h2>
      <h2 className="sub-title mb-5">
        Building Financial Futures together while you{" "}
        <br className="d-none d-md-block" /> unlock unlimited potentials.
      </h2>
      <div className="d-flex align-items-center justify-content-center gap-4">
        <Link href={"/home/personal-savings"} className="text-decoration-none">
          <button className="btn btn-md btn-black">Personal</button>
        </Link>
        <Link href={"/home/group-savings"} className="text-decoration-none">
          <button className="btn btn-md btn-black">Group</button>
        </Link>
      </div>
    </div>
  );
};
