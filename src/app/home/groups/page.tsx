"use client";
import { GroupCard } from "@/components/shared/groupCard";
import { OurTeam } from "@/components/shared/ourTeam";
import { SubPageBanner } from "@/components/shared/subPageBanner";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";

export default function GroupsPage() {
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

  const groupList = useQuery(api.group.getAllGroups);
  console.log(groupList);
  return (
    <div className="text-center">
      <SubPageBanner
        title="Groups"
        subtitle="Find yourself a group here and enjoy financial growth."
      />
      <div className="container my-6">
        <h2 className="sub-title  fw-bold">
          Your Can
          <span className="text-primary-500">Find</span> Your
          <span className="text-primary-500"> Financial Besties</span> Here
        </h2>
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
        <div className="row px-8">
          {groupList?.map((item, index) => (
            <GroupCard
              key={index}
              color={index}
              // img={item.img}
              // alt={item.alt}
              savings_per_interval={item.savings_per_interval}
              title={item.name}
              desc={item.description}
              privateGroup={item.private}
            />
          ))}
          {/* {cardList.map((item, index) => (
            <GroupCard
              key={index}
              color={index}
              img={item.img}
              alt={item.alt}
              title={item.title}
              desc={item.desc}
              privateGroup={item.privateGroup}
            />
          ))} */}
        </div>
      </div>
      <div className="mt-5_6 py-2  text-white-000">
        <div className="bg-primary-500 py-6">
          <div className="container">
            <h2 className="sub-title mb-4 fw-bold">Join A Group</h2>
            <p className="text-xl">Save Collectively and Collaboratively!</p>
          </div>
        </div>
      </div>
      <OurTeam />
    </div>
  );
}
