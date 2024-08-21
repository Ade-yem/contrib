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
        subtitle="Victoriaaaaaaaaaa Find a Content"
      />
      <div className="container">
        <div className="row my-6">
          <div className="col-md-6 col-12 my-auto">
            <h2 className="text-2xl">
              Financial Independence Through Collaboration
            </h2>
            <p className="text-sm text-grey-400">
              At Jekajodawo, Our Mission is to empower individuals to achieve
              financial well-being through hassle free collaboration and
              personalized financial solutions.
            </p>
          </div>
          <div className="col-md-6 col-12">
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
      <ChooseUs />
      <OurTeam />
    </div>
  );
}
