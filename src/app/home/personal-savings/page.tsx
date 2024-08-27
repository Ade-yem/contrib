import { SubPageBanner } from "@/components/shared/subPageBanner";
import Image from "next/image";

import React from "react";

export default function PersonalSavingsPage() {
  return (
    <div className="text-center">
      <SubPageBanner
        title="Personal Savings"
        subtitle="Save For Something Special , Effortlessly !"
      />
      <div className="container my-6">
        <h2 className="sub-title  fw-bold">
          Save with <span className="text-primary-500">Purpose</span>, Reach
          Your <span className="text-primary-500">Dreams</span>
        </h2>
        <p className="text-xl">You Can Personally Save Towards Your Goals.</p>
        {/* <h2 className="sub-title  fw-bold">
          You Can <span className="text-primary-500">Personally Save</span>{" "}
          Towards Your Goals Why You Should
        </h2>
        <p className="text-xl">Save with Purpose, Reach Your Dreams</p> */}
      </div>
      <div className="py-5_6 bg-primary-300">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Set Up Your <br /> Account
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Pick A Saving <br /> Plan & Amount
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Schedule <br /> Withdrawal Time
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Fund Your <br /> Account with Your Bank Card
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5_6 py-2  text-white-000">
          <div className="bg-primary-500 py-6">
            <div className="container">
              <h2 className="sub-title  mb-4 fw-bold">
                Pick Your Saving Plans
              </h2>
              <p className="text-xl">
                Your Personal Savings revolves around distinctive financial
                goals,
                <br className="d-none d-md-block" /> You can save periodically.
              </p>
              <div className="d-flex align-items-center justify-content-center">
                <button className="btn btn-md btn-black">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="py-6">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12 my-3 ">
              <div className="default-card default-shadow mx-5 d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">Daily</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 ">
              <div className="default-card default-shadow mx-5 d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">Weekly</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 ">
              <div className="default-card default-shadow mx-5 d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">Monthly</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 ">
              <div className="default-card default-shadow mx-5 d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">Annually</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-300 py-6">
        <div className="container">
          <h2 className="sub-title  mb-5_6 fw-bold">
            Personal Savers of The Month
          </h2>
          <div className="row">
            <div className="col-md-6 col-12 my-3">
              <Image
                src={"/friends.svg"}
                width={100}
                height={100}
                alt="four beatiful ladies"
                className="w-100 h-100"
              />
            </div>
            <div className="col-md-6 col-12 my-3">
              <Image
                src={"/friends.svg"}
                width={100}
                height={100}
                alt="four beatiful ladies"
                className="w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
