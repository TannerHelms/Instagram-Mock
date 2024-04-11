import { useLocation } from "react-router-dom";
import useGroups from "../../api/use_groups";
import GroupDetailsContainer from "../../componets/group_details_c";
import { IoMdArrowRoundBack } from "react-icons/io";
import useInit from "../../hooks/use_init";
import SendMessage from "../../componets/ui/send_message";
import { useEffect, useRef } from "react";
import { Avatar } from "@mantine/core";

const GroupDetails = ({ params }) => {
  const id = useLocation().pathname.split("/")[2];
  const { navigate } = useInit();
  const { group } = useGroups(parseInt(id));
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [divRef, group]);

  const handleBack = () => {
    navigate("/groups");
  };

  if (group.isLoading) return <div>Loading...</div>;

  if (group.error) return <div>Error: {group.error.message}</div>;

  return (
    <>
      <div className="pt-4 w-600">
        {/* BACK BUTTON */}
        <div className="flex gap-3 items-center fixed bg-white w-full left-0 top-0 h-32 z-10 p-2">
          <IoMdArrowRoundBack
            size={"30px"}
            onClick={handleBack}
            className="cursor-pointer hover:bg-blue-300 rounded-lg"
          />
          <p>Back</p>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 w-600 overflow-y-auto">
            {group.data.profiles.map((profile) => (
              <div>
                <Avatar
                  src={profile.backgroundImage}
                  size="lg"
                  key={profile.id}
                  className="cursor-pointer hover:border-2 border-blue-300 m-auto"
                />
                <div className="flex gap-2">
                  <p>{profile.user.firstName}</p>
                  <p>{profile.user.lastName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MESSAGES */}
        <div>
          <GroupDetailsContainer group={group.data} />
          <div ref={divRef} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white h-20 z-10">
        <SendMessage group={group} />
      </div>
    </>
  );
};

export default GroupDetails;
