import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import "./styles.scss";

export const GroupChat = () => {
  return (
    <div className="chat-support-wrapper">
      <div className="chat-support-body">
        <div>
          <p className="text-sm text-black-50 my-0 d-block mb-1 left">
            Nifemi Oladele
          </p>
          <div className="message-content-wrapper me-6 p-3 mb-3 left">
            <p className="mb-0">Hi, Welcome to Jekajodawo...</p>
          </div>
          <div className="message-content-wrapper me-6 p-3 mb-4 left">
            <p className="mb-0"> How can I help you?</p>
          </div>
        </div>
        <div className="mt-5 w-75 ms-auto">
          <p className="text-sm text-black-50 my-0 d-block mb-1 text-end">
            You
          </p>
          <div className="message-content-wrapper  p-3 mb-3 right">
            <p className="mb-0">
              Good day to you, I need your help, mo need owo oh
            </p>
          </div>
        </div>
      </div>
      <div className="comment-footer">
        <textarea
          className="form-control mb-3"
          rows={3}
          placeholder="Type your message..."
        ></textarea>

        <Icon
          icon="material-symbols:send-rounded"
          className="click position-absolute bottom-2 end-1 text-primary-500"
          width="5rem"
          height="5rem"
        />
      </div>
    </div>
  );
};
