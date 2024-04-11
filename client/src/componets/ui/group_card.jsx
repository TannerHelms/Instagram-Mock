import React from "react";
import { Card, Avatar, Button } from "@mantine/core";
import useInit from "../../hooks/use_init";
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
            <Avatar.Group spacing={"sm"}>
              {group.profiles.slice(0, 2).map((profile) => (
                <Avatar
                  src={profile.backgroundImage}
                  size="lg"
                  key={profile.id}
                />
              ))}
              <Avatar size={"lg"}>+{group.profiles.length}</Avatar>
            </Avatar.Group>
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
