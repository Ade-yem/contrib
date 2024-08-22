import Image from "next/image";
import React from "react";

import "./styles.scss";

export const SavingsCard = ({
  title,
  desc,
  img,
  alt,
}: {
  title: string;
  desc: string;
  img: string;
  alt: string;
}) => {
  return (
    <div className="saving-card">
      <Image src={img} alt={alt} width={120} height={20} />
      <div className="card-content">
        <p className="text-lg fw-semi-bold">{title}</p>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
};
