import { Button, Card } from "@mantine/core";
import React from "react";
import useInit from "../../hooks/use_init";
import UsersAvatars from "./users_avatars";
const GroupCard = ({ group }) => {
  const { navigate } = useInit();
  const handleViewGroup = () => {
    navigate(`/groups/${group.id}`);
  };

  return (
    <Card
      key={group.id}
      className="bg-white p-4 rounded-lg flex flex-row gap-3"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-3">
          <div className="flex gap-4">
            <UsersAvatars group={group} />
          </div>
          <div className="flex flex-col gap-3">
            <p>{group.lastMessage}</p>
            <p className="label">{group.lastMessageAt}</p>
          </div>
        </div>
        <div>
          <Button onClick={handleViewGroup}>View</Button>
        </div>
      </div>
    </Card>
  );
};
export default GroupCard;
