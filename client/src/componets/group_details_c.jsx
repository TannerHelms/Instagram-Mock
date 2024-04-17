import MessageTile from "./ui/message_tile";

const GroupDetailsContainer = ({ group }) => {
  return (
    <div className="w-full p-3" style={{ maxWidth: "600px" }}>
      {group.messages.map((message) => (
        <MessageTile key={message.id} message={message} group={group} />
      ))}
    </div>
  );
};

export default GroupDetailsContainer;
