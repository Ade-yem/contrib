import { thousandFormatter } from "@/components/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

export const GroupCard = ({
  img,
  alt,
  title,
  savings_per_interval,
  desc,
  key,
  privateGroup,
  color,
}: {
  img?: string;
  alt?: string;
  title: string;
  savings_per_interval: number;
  desc?: string;
  key: number;
  color: number;
  privateGroup?: boolean;
}) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-5_6" key={key}>
      <div
        className={`default-card outstanding-group-card ${color === 1 ? "one" : color === 2 ? "two" : color === 3 ? "three" : "four"}`}
      >
        <div
          className={`group-image-wrapper ${color === 1 ? "one" : color === 2 ? "two" : color === 3 ? "three" : "four"}`}
        >
          <Image
            className="obj-cover"
            // src={img}
            // alt={alt}
            src={"/friends.svg"}
            alt={"alt"}
            width={100}
            height={100}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center px-5 mb-4 padlock-price">
          <span>
            <Icon
              icon="uil:padlock"
              width="3rem"
              height="3rem"
              className={`text-white-000 ${privateGroup ? "" : "invisible"}`}
            />
          </span>
          <span className="price d-non">
            <span>₦{thousandFormatter(savings_per_interval)}</span>
          </span>
          {/* <span className="price">
            <span>₦100</span>
          </span> */}
        </div>
        <div className="d-flex justify-content-center align-items-center gap-3 my-4">
          <span>xxxxx</span>
          <span>(5.0)</span>
        </div>
        <p className="text-lg fw-bold"> {title}</p>
        <p className="text-sm px-md-4">{desc}</p>
      </div>
      {/* <br />
      <button className="btn btn-md btn-primary  mx-auto">Public Team</button> */}
    </div>
  );
};
