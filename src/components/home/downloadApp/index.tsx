import React from "react";
import "../styles.scss";
export const DownloadApp = () => {
  return (
    <div className="download-app-wrapper text-white-000">
      <div className="container">
        <h2 className="text-3xl fw-bold mb-5">
          Save Effortlessly & Watch <br className="d-none d-sm-block" /> Your
          Savings Grow
        </h2>
        <div className="d-flex align-items-center justify-content-center gap-4">
          <button className="btn btn-md btn-primary">Download App</button>
        </div>
      </div>
    </div>
  );
};
