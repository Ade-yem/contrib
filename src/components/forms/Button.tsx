import React from "react";

const Button = ({
  className,
  icon: IconComponent,
  title,
  loadingTitle,
  loading,
  ...props
}: any) => (
  <button
    type="submit"
    className={`btn ${className || "btn-primary"}`}
    {...props}
  >
    {loading ? (
      <div className="spinner-border spinner-border-sm me-2" />
    ) : IconComponent ? (
      <IconComponent />
    ) : null}
    {loading ? loadingTitle || title : title}
  </button>
);

export default Button;
