import Image from "next/image";
import React from "react";

export const ChooseUs = () => {
  const cardList = [
    {
      img: "/security.svg",
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
    {
      img: "/management.svg",
      title: "Queue Management",
      desc: "Organizing and Managing Groups Contributing through initial agreements by Team Members",
      alt: "management",
    },
    {
      img: "/growing-saving.svg",
      title: "Growing Savings",
      desc: "We help You Maximizes your Savings Plans through thorough regulations.",
      alt: " growing-saving",
    },
    {
      img: "/payment-gateway.svg",
      title: "Secure Payments",
      desc: "We Provided Secured Payments Gateways in Partnership with Various Banks",
      alt: " payment-gateway",
    },
    {
      img: "/clipboard.svg",
      title: "Progress Tracking",
      desc: "We will help you Monitor Your savings in real time while you reach your potentials and goals",
      alt: "clipboard",
    },
  ];
  return (
    <div className="py-6 bg-primary-300 text-center">
      <div className="container">
        <h2 className="sub-title  mb-5_6 fw-bold">
          Why You Should <span className="text-primary-500">Choose Us</span>
        </h2>
        <div className="row px-6">
          {cardList.map((item, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-4" key={index}>
              <div className="default-card">
                <Image src={item.img} alt={item.alt} width={100} height={120} />
                <p className="text-xl fw-bold"> {item.title}</p>
                <p className="text-sm px-md-4">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
