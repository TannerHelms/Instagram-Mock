import useGroups from "../../api/use_groups";
import GroupCard from "../../componets/ui/group_card";

const Groups = () => {
  const { groups } = useGroups();

  if (groups.isLoading) return <div>Loading...</div>;
  if (groups.error) return <div>Error: {groups.error.message}</div>;

  return (
    <div className="flex flex-col gap-4 pt-5">
      <p className="">Below are your chats</p>
      {groups.data.map((group, idx) => (
        <GroupCard key={idx} group={group} />
      ))}
    </div>
  );
};
export default Groups;
