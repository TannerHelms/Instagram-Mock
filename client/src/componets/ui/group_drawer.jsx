import { Avatar, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useInit from "../../hooks/use_init";

const GroupDrawer = ({ group, opened, close }) => {
  const { navigate } = useInit();

  return (
    <>
      <Drawer opened={opened} onClose={close} title="">
        <div>
          {group.profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex gap-3 items-center hover:bg-blue-300 p-4 rounded-lg cursor-pointer"
              onClick={() => navigate(`/otherprofile/${profile.id}`)}
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
