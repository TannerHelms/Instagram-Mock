import useUsers from "../../api/use_users";
import useLogout from "../../hooks/use_logout";
import { Button } from "@mantine/core";

const Profile = () => {
  const { me } = useUsers();
  const { logout } = useLogout();

  return (
    <div className="center flex flex-col gap-2 items-center">
      <div className="flex gap-2">
        <h1>Welcome</h1>
        <p>{me.data.firstName}</p>
        <p>{me.data.lastName}</p>
      </div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Profile;
