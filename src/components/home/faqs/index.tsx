"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const Faqs = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(-2);

  const accordionList = [
    {
      title: " How does group savings works?",
      answer:
        "  How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works? How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?",
    },
    {
      title: "What Supports is available for Me?",
      answer:
        "  How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works? How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?",
    },
    {
      title: "How do Disputes get Resolved?",
      answer:
        "  How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works? How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?",
    },
    {
      title: "Can I Create Multiple Accounts?",
      answer:
        "  How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works? How does group savings works?How does group savings works?How does group savings  works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?How does group savings works?",
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
                <p className="text-sm fw-small lh-lg mb-0">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
