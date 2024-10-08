import Image from "next/image";
import React from "react";
import "./styles.scss";

export const SavingsCard = ({
  title,
  desc,
  img,
  alt,
  index,
}: {
  title: string;
  desc: string;
  img: string;
  alt: string;
  index?: number;
}) => {
  return (
    <div className="saving-card">
      <div className="image-container">
        <Image src={img} alt={alt} layout="fill" objectFit="cover" />
      </div>
      <div
        className={`card-content ${index === 0 ? "one" : index === 1 ? "two" : index === 2 ? "three" : index === 3 ? "four" : index === 4 ? "five" : index === 5 ? "six" : index === 6 ? "one" : " two"}`}
      >
        <p className="text-lg fw-semi-bold">{title}</p>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
};
