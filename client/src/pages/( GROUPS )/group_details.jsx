import { useLocation } from "react-router-dom";
import useGroups from "../../api/use_groups";
import GroupDetailsContainer from "../../componets/group_details_c";
import { IoMdArrowRoundBack } from "react-icons/io";
import useInit from "../../hooks/use_init";
import SendMessage from "../../componets/ui/send_message";
import { useEffect, useRef } from "react";
import { Avatar } from "@mantine/core";
import UsersAvatars from "../../componets/ui/users_avatars";
import GroupDrawer from "../../componets/ui/group_drawer";
import { useDisclosure } from "@mantine/hooks";

const GroupDetails = ({ params }) => {
  const id = useLocation().pathname.split("/")[2];
  const { navigate } = useInit();
  const { group } = useGroups(parseInt(id));
  const divRef = useRef(null);
  const [opened, { open, close }] = useDisclosure(false);

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
      <GroupDrawer group={group.data} opened={opened} close={close} />
      <div className="w-full pt-10">
        {/* HEADER */}
        <div className="flex gap-3 items-center fixed bg-white w-full left-0 top-0 h-24 z-10 p-2">
          {/* BACK BUTTON */}
          <IoMdArrowRoundBack
            size={"30px"}
            onClick={handleBack}
            className="cursor-pointer hover:bg-blue-300 rounded-lg"
          />
          <p>Back</p>
          {/* USERS DRAWER */}
          <div
            onClick={open}
            className="absolute left-1/2 -translate-x-1/2 text-center hover:bg-blue-300 cursor-pointer p-1 rounded-lg"
          >
            <UsersAvatars group={group.data} />
            <div>
              <p>{group.data.profiles.length} people </p>
            </div>
          </div>
        </div>
        {/* MESSAGES */}
        <GroupDetailsContainer group={group.data} />
        <div ref={divRef} />
      </div>
      {/* SEND MESSAGE */}
      <div className="fixed bottom-0 left-0 w-full bg-white h-20 z-10">
        <SendMessage group={group} />
      </div>
    </>
  );
};

export default GroupDetails;
