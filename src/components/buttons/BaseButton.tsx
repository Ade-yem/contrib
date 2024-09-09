import React from "react";

export default function Button({children, onClick, className, type, disabled}:
  {
    children: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    className?: string; type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
  }) {
  return(
    <button type={type} className={`btn btn-block btn-success ${className ? className : ""}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}