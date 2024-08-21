import React from "react";
import "./styles.scss";

export const SubPageBanner = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="sub-page-banner text-white-000">
      <h2
        className="title text-white-000 mb-4"
        dangerouslySetInnerHTML={{
          __html: title || " ",
        }}
      />
      <h2
        className="sub-title mb-5"
        dangerouslySetInnerHTML={{
          __html: subtitle || " ",
        }}
      />
    </div>
  );
};
