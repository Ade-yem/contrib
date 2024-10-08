import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import "./styles.scss";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatCard from "./chatCard";

export const GroupChat = ({
  groupId,
  userId,
}: {
  groupId: Id<"groups">;
  userId: Id<"users">;
}) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.chat.getChatsInGroup,
    { groupId },
    { initialNumItems: 120 }
  );
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const sendChat = useMutation(api.chat.createChat);
  const inputRef = React.useRef(null);
  const uploadImage = useMutation(api.chat.generateChatUploadUrl);

  const sendMessage = async () => {
    if (image) {
      const url = await uploadImage();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": image?.type,
        },
        body: image,
      });
      const { storageId } = await res.json();
      await sendChat({
        groupId,
        userId,
        message,
        imageId: storageId as Id<"_storage">,
      });
    } else
      await sendChat({
        groupId,
        userId,
        message,
      });
    setImage(null);
    setMessage("");
  };
  return (
    <div className="chat-support-wrapper">
      <div className="chat-support-body">
        {results.map((res) => (
          <ChatCard
            author={res.author}
            _id={res._id}
            _creationTime={res._creationTime}
            image={res.image}
            groupId={groupId}
            userId={res.userId}
            message={res.message}
            time={res.time}
            key={res._id}
          />
        ))}
      </div>
      <div className="comment-footer">
        <textarea
          className="form-control mb-3"
          rows={3}
          style={{ resize: "none" }}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <input
          type="file"
          name="chatFile"
          id="chatFile"
          hidden
          ref={inputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
            }
          }}
        />
        <div className="position-absolute end-1 bottom-2 d-flex justify-content-between gap-3">
          <Icon
            icon={"oi:paperclip"}
            className="click text-black-50 mt-1"
            style={{ transform: "rotate(180deg)" }}
            width="2rem"
            height="2rem"
            onClick={() =>
              (inputRef.current as HTMLInputElement | null)?.click()
            }
          />
          <Icon
            icon="material-symbols:send-rounded"
            className="click text-primary-500"
            width="3rem"
            height="3rem"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};
