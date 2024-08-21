"use client";

import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { SavingsCard } from "../../growSavingsCard";
import { SliderNextArrow, SliderPrevArrow } from "../../customSliderArrows";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

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
      alt: "group of five friends",
    },
    {
      img: "/personal-saving.svg",
      title: "Personal Savings",
      desc: "Achieve your goals independently with our personalized saving plans",
      alt: "a beautiful lady",
    },
    {
      img: "/personal-saving.svg",
      title: "Personal Savings",
      desc: "Achieve your goals independently with our personalized saving plans",
      alt: "a beautiful lady",
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
