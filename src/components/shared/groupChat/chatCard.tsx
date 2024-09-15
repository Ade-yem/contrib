import React from 'react';
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

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

const ChatCard: React.FC<ChatCardProps> = ({ message, author, _id, _creationTime, time, image, groupId, userId,  }) => {
  const user = useQuery(api.user.getUser);
  let dateString = "";
  const date = new Date(_creationTime);
  const today = new Date();
  if (today.getFullYear === date.getFullYear ) {
    dateString = `${date.getMinutes()}:${date.getHours()} - ${date.getDate()}/${date.getMonth()}`

  } else {
    dateString = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
  }

  if (user?._id === userId) return (
    <div className="mt-5 w-75 ms-auto" key={_id}>
      <p className="text-sm text-white my-0 d-block mb-1 text-end">
        You
      </p>
      <div className="message-content-wrapper  p-3 mb-3 right">
        <p className="mb-2">
          {message}
        </p>
        <span className=''>{dateString}</span>
      </div>
    </div>
  )
  return (
    <div className="mt-5 w-75 ms-auto" key={_id}>
      <p className="text-sm text-black-50 my-0 d-block mb-1 text-start">
        {author}
      </p>
      <div className="message-content-wrapper  p-3 mb-3 left">
        <p className="mb-2">
          {message}
        </p>
        <span className=''>{dateString}</span>
      </div>
    </div>
  );
};

export default ChatCard;