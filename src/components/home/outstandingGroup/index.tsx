import { GroupCard } from "@/components/shared/groupCard";
import Image from "next/image";
import React from "react";

export const OustandingGroup = () => {
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
    <div className="container text-center py-6">
      <h2 className="sub-title  mb-6 fw-bold">
        Our <span className="text-primary-500">Outstanding</span> August Groups
      </h2>
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
  );
};
