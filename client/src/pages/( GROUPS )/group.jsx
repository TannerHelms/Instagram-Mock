import useGroups from "../../api/use_groups";
import { Avatar, Button, Card } from "@mantine/core";

const Groups = () => {
  const { groups } = useGroups();

  if (groups.isLoading) return <div>Loading...</div>;
  if (groups.error) return <div>Error: {groups.error.message}</div>;

  console.log(groups.data);

  return (
    <div className="flex flex-col gap-4 pt-5">
      {groups.data.map((group) => (
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
                <p>{group.lastMessageAt}</p>
              </div>
            </div>
            <div>
              <Button>View</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default Groups;
