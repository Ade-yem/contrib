import Image from "next/image";
import React from "react";

export const OustandingGroup = () => {
  const cardList = [
    {
      img: "/friends.svg",
      alt: "a beautiful lady",
      title: "Encryptions and Security",
      desc: "Your savings and data are protected with top-tier encryption",
    },
    {
      img: "/notification-settings.svg",
      title: "Automated Reminders",
      desc: "You will never miss a contribution schedules through our Automated Reminder",
      alt: "notification-settings",
    },
    {
      img: "/alternative-dispute-resolution 1.svg",
      title: "Disputes Resolution",
      desc: "We Resolve any Contribution and Group issues fairly and considerably.",
      alt: "alternative-dispute-resolution",
    },
    {
      img: "/customer-service.svg",
      title: "Support & Help",
      desc: "Get Assistance with any help you need from us 24/7 through our trusted representatives.",
      alt: "customer-service",
    },
  ];
  return (
    <div className="container text-center py-6">
      <h2 className="sub-title  mb-5_6 fw-bold">
        Our <span className="text-primary-500">Outstanding</span> August Groups
      </h2>
      <div className="row px-6">
        {cardList.map((item, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-4" key={index}>
            <div className="default-card outstanding-group-card">
              <div className="group-image-wrapper">
                <Image src={item.img} alt={item.alt} width={120} height={100} />
              </div>
              <div className="d-flex justify-content-center align-items-center gap-3 my-4">
                <span>xxxxx</span>
                <span>(5.0)</span>
              </div>
              <p className="text-lg fw-bold"> {item.title}</p>
              <p className="text-sm px-md-4">{item.desc}</p>
            </div>
            {/* <button className="btn btn-md btn-primary rounded mx-auto">
              Public Team
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
