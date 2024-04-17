import { MdOutlineFileUpload } from "react-icons/md";
import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { FiMessageCircle } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import useMessages from "../../api/use_messages";
import { useState } from "react";
import useUsers from "../../api/use_users";
import { useHotkeys } from "@mantine/hooks";

const iconSize = "28px";

const SendMessage = ({ group }) => {
  const { me } = useUsers();
  const { send } = useMessages(group.data.id);
  const [msg, setMsg] = useState("");

  const handleSendMessage = () => {
    if (!msg) return;
    setMsg("");
    send.mutate({
      body: msg,
      image: "",
      senderId: me.data.id,
      groupId: group.data.id,
    });
  };

  useHotkeys([["enter", handleSendMessage]], []);

  return (
    <div
      className="flex gap-3 items-center w-full m-auto center p-3"
      style={{ maxWidth: "600px" }}
    >
      <ActionIcon size={"35px"} radius="xl" variant="transparent">
        <CiCirclePlus size={"35px"} />
      </ActionIcon>

      <TextInput
        classNames={{
          root: "w-full",
          input: "w-full",
        }}
        radius="xl"
        size="md"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Send a message"
        rightSectionWidth={42}
        rightSection={
          <ActionIcon
            size={iconSize}
            radius="xl"
            variant="transparent"
            onClick={handleSendMessage}
          >
            <FaArrowRight size={iconSize} />
          </ActionIcon>
        }
      />
    </div>
  );
};
export default SendMessage;
