import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-12">
          <div className="bg-white-000 rounded-10 p-4 d-flex justify-content-between">
            <div>
              <p className="text-pink text-sm">Personal savings</p>
              <p className="text-sm">2000000</p>
            </div>
            <div className="mt-auto">
              <Icon icon="weui:eyes-on-outlined" width="3rem" height="3rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
