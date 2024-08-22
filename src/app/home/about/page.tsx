import { ChooseUs } from "@/components/home/whyChooseUs";
import { OurTeam } from "@/components/shared/ourTeam";
import { SubPageBanner } from "@/components/shared/subPageBanner";
import Image from "next/image";
import React from "react";

export default function Aboutpage() {
  return (
    <div>
      <SubPageBanner
        title="We are More Than Just a <br/> Group Saving Platform"
        subtitle="Saving Smarter, for a life with more possibilities, We <br/> have the best tools to make it easier"
      />
      <div className="container">
        <div className="row my-6">
          <div className="col-md-6 col-12 my-md-auto mb-3_5">
            <h2 className="text-3xl d-none d-lg-block">
              Financial Independence Through Collaboration
            </h2>
            <h2 className="sub-title d-block d-lg-none">
              Financial Independence Through Collaboration
            </h2>
            <p className="text-sm text-grey-400 fw-small">
              At Jekajodawo, Our Mission is to empower individuals to achieve{" "}
              <br className="d-none d-lg-block" />
              financial well-being through hassle free collaboration and
              <br className="d-none d-lg-block" />
              personalized financial solutions.
            </p>
          </div>
          <div className="col-md-6 col-12">
            <Image
              src={"/about-image.svg"}
              width={100}
              height={100}
              alt="four beatiful ladies"
              className="w-100 h-100"
            />
          </div>
        </div>
      </div>
      <ChooseUs />
      <OurTeam />
    </div>
  );
}
