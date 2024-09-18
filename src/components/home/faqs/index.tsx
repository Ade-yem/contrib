"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const Faqs = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(-2);

  const accordionList = [
    {
      title: " How does Jekajodawo savings works?",
      answer:
        "Jekajodawo Group savings works like a collective or shared savings also known as *Thrift* which involves two or more individuals like Friends, Lovers, Family, Co-workers etc contribute certain amount of  money at the fixed time agreed to by the members of the group, Each Members of the group are paid in *Turns* according to the assigned number that was given to them during the the process of joining or being added to a Group.",
    },
    {
      title: "What Supports is available for Me?",
      answer:
        "We have Our Reliable and Dedicated Support and Customer Relations Team that handles queries, issues and concern that revolves around your personal Savings, Group Savings, Payment issues , etc and we Operate 24/7 with fast response time.",
    },
    {
      title: "How do Disputes get Resolved?",
      answer:
        " We understand that Groups have different members known or unknown to one another which different perspectives and experiences, but we have Our Disputes Resolution Team that handles matters that concerns Groups Savings, Order or Collection, Theft etc. <br/> <br/> Also, we have a Chat page provided for members of each group to communicate among themselves, trying to resolve issues at their best among themselves, just Incase the issue is persistent, You can reach out to Our Disputes Resolution Team.",
    },
    {
      title: "Can I Create Multiple Accounts?",
      answer:
        "No, You won't be able to do that, You will be required to verify the details you provided being it KYC, Identity Cards or Your Face before you can be allow to join any Group. Jekajodawo's. team frowns against compromising your personal details in order to affect other users of the platforms. <br/> <br/> However, Your sole account can be use as much as you want for your desired purpose.",
    },
  ];
  const handleToggle = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <div className="faqs-wrapper bg-primary-300 py-6">
      <div className="container">
        <h2 className="sub-title  mb-5_6 fw-bold text-center">
          Frequently Asked Questions
        </h2>
        {accordionList.map((item, index) => (
          <div key={index}>
            <div
              className="bg-white-000 d-flex align-items-center justify-content-between p-4_5 px-sm-5_6 px-4 rounded-10 mt-4 click"
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-xl fw-bold mb-0">{item.title}</h2>
              <Icon
                icon={
                  openAccordion === index
                    ? "simple-line-icons:minus"
                    : "simple-line-icons:plus"
                }
                width="3rem"
                height="3rem"
                className="text-black-00"
                role="button"
              />
            </div>
            {openAccordion === index && (
              <div className="bg-white-000 mt-4 p-4_5 px-5_6 rounded-10">
                <p
                  className="text-sm fw-small lh-lg mb-0"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
