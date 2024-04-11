import MessageTile from "./ui/message_tile";

const GroupDetailsContainer = ({ group }) => {
  return (
    <div className="flex flex-col overflow-y-auto gap-4 pt-12">
      {group.messages.map((message) => (
        <MessageTile key={message.id} message={message} group={group} />
      ))}
    </div>
  );
};

export default GroupDetailsContainer;
