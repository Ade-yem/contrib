import { GroupCard } from "@/components/shared/groupCard";
import { OurTeam } from "@/components/shared/ourTeam";
import { SubPageBanner } from "@/components/shared/subPageBanner";
import Image from "next/image";

import React from "react";

export default function GroupSavingsPage() {
  const cardList = [
    {
      img: "/friends.svg",
      alt: "a beautiful lady",
      title: "Encryptions and Security",
      desc: "Your savings and data are protected with top-tier encryption",
      privateGroup: true,
    },
    {
      img: "/friends.svg",
      title: "Automated Reminders",
      desc: "You will never miss a contribution schedules through our Automated Reminder",
      alt: "notification-settings",
    },
    {
      img: "/friends.svg",
      title: "Disputes Resolution",
      desc: "We Resolve any Contribution and Group issues fairly and considerably.",
      alt: "alternative-dispute-resolution",
      privateGroup: true,
    },
    {
      img: "/friends.svg",
      title: "Support & Help",
      desc: "Get Assistance with any help you need from us 24/7 through our trusted representatives.",
      alt: "customer-service",
    },
  ];
  return (
    <div className="text-center">
      <SubPageBanner
        title="Group Savings"
        subtitle="Let’s Collaboratively Save while You boost Your Savings"
      />
      <div className="container my-6">
        <h2 className="sub-title  fw-bold">
          Save <span className="text-primary-500">Together</span>, Achieve{" "}
          <span className="text-primary-500">More</span>
        </h2>
        <p className="text-xl">You Can Collaborate With Others to Save</p>
      </div>
      <div className="py-5_6 bg-primary-300">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  {" "}
                  Set Up Your <br /> Account
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Join a Private or <br /> Public Group
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Scratch A Number <br /> to Pick a Turn
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3">
              <div className="default-card default-shadow d-flex align-items-center justify-content-center">
                <p className="text-2xl fw-bold my-6">
                  Maintain Your Reputation as a <br /> Group Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-6">
        <h2 className="sub-title fw-bold">Select Trending Groups</h2>
        <p className="text-xl">
          These are teams known for maintaining good reputation for the past 3
          Months!
        </p>
        <div className="d-flex flex-wrap align-items-center gap-4 justify-content-center mb-6">
          <button className="btn btn-md text-white-000 bg-green">
            Enter Group Code
          </button>
          <button className="btn btn-md btn-primary">Create a New Group</button>
          <button className="btn btn-md btn-black">Join Existing Group</button>
        </div>
        <div className="row px-6">
          {cardList.map((item, index) => (
            <GroupCard
              key={index}
              color={index}
              img={item.img}
              alt={item.alt}
              title={item.title}
              desc={item.desc}
              privateGroup={item.privateGroup}
            />
          ))}
        </div>
      </div>
      <div className="mt-5_6 py-2  text-white-000">
        <div className="bg-primary-500 py-6">
          <div className="container">
            <h2 className="sub-title  mb-4 fw-bold">Join A Group</h2>
            <p className="text-xl">Save Collectively and Collaboratively!</p>
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-md btn-black px-md-5 px-4">
                See More Groups
              </button>
            </div>
          </div>
        </div>
      </div>
      <OurTeam />
    </div>
  );
}
