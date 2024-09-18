"use client";

import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { SavingsCard } from "../../shared/growSavingsCard";
import { SliderNextArrow, SliderPrevArrow } from "../../customSliderArrows";
import Loader from "@/components/shared/Loader";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <Loader height="30vh" />,
});

export const GrowYourSavings = () => {
  const responsive = [
    {
      breakpoint: 1204,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  const cardList = [
    {
      img: "/personal-saving.svg",
      title: "Personal Savings",
      desc: "Achieve your goals independently with our personalized saving plans",
      alt: "a beautiful lady",
    },
    {
      img: "/friends.svg",
      title: "Friends",
      desc: "Collaborate with your friends to make savings fun and effective",
      alt: "group of five friends smiling",
    },
    {
      img: "/family.svg",
      title: "Family",
      desc: "Save with your family to achieve family milestones",
      alt: "family of three smiling while looking at a phone",
    },
    {
      img: "/spouse.svg",
      title: "Spouse",
      desc: "Work together to reach your financial goals as a couple",
      alt: "a lady and a man in a romantic position",
    },
    {
      img: "/co-workers.svg",
      title: "Co-Workers",
      desc: "Team up with your colleagues for shared financial objectives",
      alt: "two men looking at their phones, discussing finances",
    },
    {
      img: "/siblings.svg",
      title: "Siblings",
      desc: "Save with your loving siblings and unlock great achievements effortlessly",
      alt: "two beautiful model ladies",
    },
    {
      img: "/social.svg",
      title: "Social Groups",
      desc: "Save with your groups and see excellent results",
      alt: "two people dancing while wearing sunglasses",
    },
    {
      img: "/neighbours.svg",
      title: "Neighbors",
      desc: "Collaborate with your neighbors to pay rents and bills without hassle.",
      alt: "man and woman sitting together on a swing",
    },
  ];

  return (
    <div className="container my-6">
      <h2 className="sub-title text-center mb-5_6 fw-bold">
        Ways You Can <span className="text-primary-500">Grow Your Savings</span>{" "}
        With Us
      </h2>
      <div className="px-4_5">
        <Slider
          responsive={responsive}
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          initialSlide={0}
          className="general-carousel trip-option-carousel"
          prevArrow={
            <SliderPrevArrow
              icon={
                <Icon icon="uil:angle-right-b" fontSize={"2.3rem"} rotate={2} />
              }
            />
          }
          nextArrow={
            <SliderNextArrow
              icon={<Icon fontSize={"2.3rem"} icon="uil:angle-right-b" />}
            />
          }
        >
          {cardList.map((item, index) => (
            <div key={index}>
              <div className="mx-lg-4 mx-3">
                <SavingsCard
                  index={index}
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  alt={item.alt}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
