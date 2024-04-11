import { MdOutlineFileUpload } from "react-icons/md";
import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { FiMessageCircle } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

const iconSize = "28px";

const SendMessage = ({ group }) => {
  const theme = useMantineTheme();

  return (
    <div className="flex gap-3 items-center w-full">
      <ActionIcon size={"35px"} radius="xl" variant="transparent">
        <CiCirclePlus size={"35px"} />
      </ActionIcon>

      <TextInput
        radius="xl"
        size="md"
        placeholder="Send a message"
        rightSectionWidth={42}
        rightSection={
          <ActionIcon size={iconSize} radius="xl" variant="transparent">
            <FaArrowRight size={iconSize} />
          </ActionIcon>
        }
      />
    </div>
  );
};
export default SendMessage;
