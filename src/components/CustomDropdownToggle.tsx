import React from "react";

export const CustomDropdownToggle = React.forwardRef(
  ({ children, className, onClick }: any, ref: any) => {
    return (
      <div
        ref={ref}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </div>
    );
  }
);

// Explicitly set the display name for debugging purposes
CustomDropdownToggle.displayName = "CustomDropdownToggle";
