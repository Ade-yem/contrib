import Image from "next/image";
import React from "react";

export const OurTeam = () => {
  const teamList = [
    {
      img: "/Adeyemi.jpg",
      name: "Adeyemi Adejumo",
      role: "Backend Developer",
    },
    {
      img: "/Adelana_.jpg",
      name: "Adelana Agun",
      role: "Frontend Developer",
    },
    {
      img: "/Victoria.jpg",
      name: "Victoria Iyiade",
      role: "Product Designer",
    },
  ];
  return (
    <div className="container my-6">
      <h2 className="sub-title  mb-5_6 fw-bold text-center">Our Team</h2>
      <div className="row justify-content-center">
        {teamList.map((item, id) => (
          <div className="col-md-4 col-sm-6 col-12 my-2" key={id}>
            <div className="d-flex align-items-center justify-content-center gap-4">
              <div>
                <Image
                  src={item.img}
                  width={70}
                  height={70}
                  alt="Adeyemi"
                  className="rounded-circle obj-cover"
                />
              </div>
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
