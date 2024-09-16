import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";

interface ChatCardProps {
  author: string | undefined;
  _id: Id<"chats">;
  _creationTime: number;
  imageId?: Id<"_storage"> | undefined;
  image?: string | undefined;
  groupId: Id<"groups">;
  userId: Id<"users">;
  message: string;
  time: number;
}

const ChatCard: React.FC<ChatCardProps> = ({
  message,
  author,
  _id,
  _creationTime,
  time,
  image,
  groupId,
  userId,
}) => {
  const user = useQuery(api.user.getUser);
  let dateString = "";
  const date = new Date(_creationTime);
  const today = new Date();
  if (today.getFullYear === date.getFullYear) {
    dateString = `${date.getMinutes()}:${date.getHours()} - ${date.getDate()}/${date.getMonth()}`;
  } else {
    dateString = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  }
  console.log(user?._id);

  // userId: "jx78afky7gtxm9yfqtgszs8std7071tv";
  // "mn75rcdp2dka7yc55a2598ck0170wrm1"
  return (
    <>
      {user?._id === userId ? (
        <div className="mt-5 w-75 ms-auto" key={_id}>
          <div className="message-content-wrapper bg-purple text-white-000 p-3 mb-3 right">
            <p className="mb-2">{message}</p>
            {typeof image === "string" && image ? (
              <Image
                className="d-block mb-2"
                src={image}
                width={100}
                height={100}
                alt="image"
              />
            ) : (
              ""
            )}
            <p className="text-2xs text-end mb-0">{dateString}</p>
          </div>
        </div>
      ) : (
        <div key={_id}>
          <p className="text-xs text-purple fw-bold my-0 d-block mb-1 left">
            {author}
          </p>
          <div className="message-content-wrapper  p-3 mb-3 left">
            <p className="mb-2">{message}</p>

            {typeof image === "string" && image ? (
              <Image
                className="d-block mb-2"
                src={image}
                width={100}
                height={100}
                alt="image"
              />
            ) : (
              ""
            )}

            <span className="text-2xs">{dateString}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatCard;
