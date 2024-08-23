import Faqs from "@/components/home/faqs";
import { OurTeam } from "@/components/shared/ourTeam";
import { SubPageBanner } from "@/components/shared/subPageBanner";
import Image from "next/image";
import React from "react";

export default function Contactpage() {
  return (
    <div>
      <SubPageBanner
        title="Reach Out To Us Anytime!"
        subtitle="Reach Out to Us Anytime and Let’s Work Together <br/> To Make Your Savings Journey Smoothly."
      />
      <div className="container">
        <div className="row my-6">
          <div className="col-md-6 col-12 my-md-auto mb-3_5">
            <h2 className="text-3xl d-none d-lg-block">
              Chat with Our Support Team
            </h2>
            <h2 className="sub-title d-block d-lg-none">
              Chat with Our Support Team
            </h2>
            <p className="text-sm text-grey-400 fw-small">
              At Jekajodawo, Our Mission is to empower individuals to achieve{" "}
              <br className="d-none d-lg-block" />
              financial well-being through hassle free collaboration and
              <br className="d-none d-lg-block" />
              personalized financial solutions.
            </p>
            <div className="d-flex gap-4 align-items-center text-grey-400 fw-small">
              <span
                className="bg-primary-500 d-flex justify-content-center align-items-center text-white-000 rounded-circle"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                1
              </span>
              Innovative Solutions
            </div>
            <div className="d-flex gap-4 align-items-center text-grey-400 fw-small my-3_5">
              <span
                className="bg-primary-500 d-flex justify-content-center align-items-center text-white-000 rounded-circle"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                2
              </span>
              Queue Management
            </div>
            <div className="d-flex gap-4 align-items-center text-grey-400 fw-small">
              <span
                className="bg-primary-500 d-flex justify-content-center align-items-center text-white-000 rounded-circle"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                3
              </span>
              24/7
            </div>
          </div>
          <div className="col-md-6 col-12">
            <Image
              src={"/contact-image.svg"}
              width={100}
              height={100}
              alt="four beatiful ladies"
              className="w-100 h-100"
            />
          </div>
        </div>
        <div className="row my-6">
          <div className="col-lg-3 col-md-6 col-12">
            <input
              type="text"
              placeholder="Your Name*"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <input
              type="text"
              placeholder="Email*"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <input
              type="text"
              placeholder="Phone Number*"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <input
              type="text"
              placeholder="Type of Account*"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            />
          </div>
          <div className="col-12 mt-4">
            <textarea
              name="message"
              id=""
              cols={30}
              rows={5}
              placeholder="Send Us A Message*"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-md btn-primary">Send Message</button>
          </div>
        </div>
      </div>
      <Faqs />
      <OurTeam />
    </div>
  );
}
