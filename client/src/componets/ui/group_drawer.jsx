import { Avatar, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const GroupDrawer = ({ group, opened, close }) => {
  console.log(group.profiles);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="">
        <div>
          {group.profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex gap-3 items-center hover:bg-blue-300 p-4 rounded-lg cursor-pointer"
            >
              <Avatar src={profile.backgroundImage} size="lg" />
              <p>
                {profile.user.firstName} {profile.user.lastName}
              </p>
            </div>
          ))}
        </div>
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
};

export default GroupDrawer;
