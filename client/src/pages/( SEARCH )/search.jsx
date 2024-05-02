import useUsers from "../../api/use_users";
import { Avatar, Button, Card, LoadingOverlay } from "@mantine/core";

const Search = () => {
  const { users } = useUsers();

  if (users.isLoading)
    return (
      <LoadingOverlay
        visible={users.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
    );

  if (users.error) return <div>Error: {users.error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-3">
      {users.data.map((user) => (
        <Card
          key={user.id}
          className="bg-white p-4 rounded-lg flex flex-col gap-3"
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <div className="flex justify-between items-center">
            {/* PICTURE AND USER INFO */}
            <div className="flex gap-4 items-center">
              <Avatar src={user.backgroundImage} size="lg" />
              <div>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </div>
            </div>
            {/* FOLLOW USER */}
            <Button>Follow</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Search;
