// import React from "react";
import { Icon } from "@iconify/react";
import { ReactElement } from "react";

export const SliderPrevArrow = (props: {
  className?: string;
  style?: object;
  onClick?: any;
  icon?: ReactElement;
}) => {
  const { className, style, onClick, icon } = props;
  return (
    <button
      className={` btn-prev ${className}`}
      style={style}
      onClick={onClick}
    >
      {icon || <Icon icon="ooui:previous-ltr" />}
    </button>
  );
};

export const SliderNextArrow = (props: {
  className?: string;
  style?: object;
  onClick?: any;
  icon?: ReactElement;
}) => {
  const { className, style, onClick, icon } = props;
  return (
    <button
      className={` btn-next ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {icon || <Icon icon="ooui:next-ltr" />}
    </button>
  );
};
