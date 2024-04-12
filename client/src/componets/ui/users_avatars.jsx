import { Avatar } from "@mantine/core";
import React from "react";
const UsersAvatars = ({ group }) => {
  return (
    <Avatar.Group spacing={"sm"}>
      {group.profiles.slice(0, 2).map((profile) => (
        <Avatar src={profile.backgroundImage} size="lg" key={profile.id} />
      ))}
      <Avatar size={"lg"}>+{group.profiles.length}</Avatar>
    </Avatar.Group>
  );
};
export default UsersAvatars;
