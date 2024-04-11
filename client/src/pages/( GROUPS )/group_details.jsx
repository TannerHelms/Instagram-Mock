import { useLocation } from "react-router-dom";
import useGroups from "../../api/use_groups";
import GroupDetailsContainer from "../../componets/group_details_c";
import { IoMdArrowRoundBack } from "react-icons/io";
import useInit from "../../hooks/use_init";
import SendMessage from "../../componets/ui/send_message";

const GroupDetails = ({ params }) => {
  const id = useLocation().pathname.split("/")[2];
  const { navigate } = useInit();
  const { group } = useGroups(parseInt(id));

  const handleBack = () => {
    navigate("/groups");
  };

  if (group.isLoading) return <div>Loading...</div>;

  if (group.error) return <div>Error: {group.error.message}</div>;

  return (
    <>
      <div className="pt-4">
        {/* BACK BUTTON */}
        <div className="flex gap-3 items-center fixed bg-white w-full left-0 top-0 h-14 z-10 p-2">
          <IoMdArrowRoundBack
            size={"30px"}
            onClick={handleBack}
            className="cursor-pointer hover:bg-blue-300 rounded-lg"
          />
          <p>Back</p>
        </div>
        {/* MESSAGES */}
        <GroupDetailsContainer group={group.data} />
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white h-20 z-10">
        <div className="flex justify-between m-auto w-full center max-w-96">
          <SendMessage group={group} />
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
