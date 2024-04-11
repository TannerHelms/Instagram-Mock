import { Avatar } from "@mantine/core";
import useUsers from "../../api/use_users";

const MessageTile = ({ message, group }) => {
  const { me } = useUsers();
  if (!me.data) return null;
  const sender = message.sender.id == me.data.id;
  const css = sender
    ? "bg-blue-700 text-white rounded-tl-lg ml-auto"
    : "bg-white rounded-tr-lg";
  return (
    <div
      className={` w-full flex flex-col gap-3 p-3 ${
        sender && " text-right ml-auto"
      }`}
    >
      {/* Continer for time and user */}
      <div className="flex justify-between gap-3">
        <p className="label absolute left-1/2 -translate-x-1/2">
          {message.createdAt}
        </p>
        <div className={`flex gap-2 mt-7 ${sender && "ml-auto"}`}>
          <Avatar size="sm" src={message.sender.backgroundImage} />
          <p>
            {message.sender.user.firstName} {message.sender.user.lastName}
          </p>
        </div>
      </div>
      {/* Container for message */}
      <div className={`w-fit max-w-80 p-3 ${css} rounded-b`}>
        {message.body}
      </div>
    </div>
  );
};

export default MessageTile;
