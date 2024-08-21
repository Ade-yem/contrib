import Image from "next/image";
import React from "react";

export const OurTeam = () => {
  const teamList = [
    {
      img: "friends.svg",
      name: "Adeyemi Adejumo",
      role: "Backend Developer",
    },
    {
      img: "friends.svg",
      name: "Adelana Agun",
      role: "Frontend Developer",
    },
    {
      img: "friends.svg",
      name: "Victoria Iyiade",
      role: "Product Designer",
    },
  ];
  return (
    <div className="container my-6">
      <h2 className="sub-title  mb-5_6 fw-bold text-center">Our Team</h2>
      <div className="row justify-content-center">
        {teamList.map((item, id) => (
          <div className="col-md-4 col-sm-6 col-12" key={id}>
            <div className="d-flex align-items-center justify-content-center gap-4">
              <Image
                src={item.img}
                width={70}
                height={70}
                alt="Adeyemi"
                className="rounded-circle"
              />
              <div>
                <p className="text-xl fw-bold mb-0">{item.name}</p>
                <p className="text-sm text-grey-400 mb-0">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
