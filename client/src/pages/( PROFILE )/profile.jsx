import useUsers from "../../api/use_users";

const Profile = () => {
  const { me } = useUsers();

  return (
    <div className="flex gap-2 w-fit m-auto">
      <h1>Welcome</h1>
      <p>{me.data.firstName}</p>
      <p>{me.data.lastName}</p>
    </div>
  );
};

export default Profile;
