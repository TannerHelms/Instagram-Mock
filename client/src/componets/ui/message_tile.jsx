import { Avatar } from "@mantine/core";

const MessageTile = ({ message, group }) => {
  const sender = message.sender.id == group.id;
  const css = sender
    ? "bg-blue-700 text-white rounded-tl-lg"
    : "bg-white rounded-tr-lg";
  return (
    <div
      className={`flex flex-col gap-3 p-3 ${sender && " text-right ml-auto"}`}
    >
      {/* Continer for time and user */}
      <div className="flex justify-between gap-3">
        <div className="flex gap-2">
          <Avatar size="sm" src={message.sender.backgroundImage} />
          <p>
            {message.sender.user.firstName} {message.sender.user.lastName}
          </p>
        </div>
        <p className="label">{message.createdAt}</p>
      </div>
      {/* Container for message */}
      <div className={`w-fit max-w-80 p-3 ${css} rounded-b`}>
        {message.body}
      </div>
    </div>
  );
};

export default MessageTile;
